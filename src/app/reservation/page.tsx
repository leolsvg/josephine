"use client";
import { useState, useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import DatePicker from "react-datepicker";
import { fr } from "date-fns/locale";
import "react-datepicker/dist/react-datepicker.css";
import { setHours, setMinutes } from "date-fns";

interface Horaire {
  jour: string;
  heure_debut: string;
  heure_fin: string;
}

function DatePickerReservation({
  date,
  setDate,
}: {
  date: Date | null;
  setDate: (date: Date | null) => void;
}) {
  const [horaires, setHoraires] = useState<Horaire[]>([]);

  useEffect(() => {
    const fetchHoraires = async () => {
      const { data } = await supabase.from("horaires_ouverture").select("*");
      const horairesValides = (data || []).filter(
        (h) => h.jour && h.heure_debut && h.heure_fin
      );
      setHoraires(horairesValides);
    };
    fetchHoraires();
  }, []);

  const isDayAllowed = (dateToCheck: Date) => {
    const dayName = dateToCheck
      .toLocaleDateString("fr-FR", { weekday: "long" })
      .toLowerCase();
    return horaires.some((h) => h.jour?.trim().toLowerCase() === dayName);
  };

  const getIncludedTimes = (date: Date) => {
    const dayName = date
      .toLocaleDateString("fr-FR", { weekday: "long" })
      .toLowerCase();
    const filtered = horaires.filter(
      (h) =>
        h.jour?.trim().toLowerCase() === dayName && h.heure_debut && h.heure_fin
    );

    const times: Date[] = [];
    filtered.forEach((h) => {
      const [startH, startM] = h.heure_debut.split(":").map(Number);
      const [endH, endM] = h.heure_fin.split(":").map(Number);
      let current = setHours(setMinutes(new Date(date), startM), startH);
      const end = setHours(setMinutes(new Date(date), endM), endH);
      while (current < end) {
        times.push(new Date(current));
        current = new Date(current.getTime() + 15 * 60000);
      }
    });

    return times;
  };

  const includedTimes = useMemo(() => {
    if (date && isDayAllowed(date)) {
      return getIncludedTimes(date);
    }
    return [];
  }, [date, horaires]);

  return (
    <div className="space-y-2">
      <DatePicker
        selected={date}
        onChange={(d) => setDate(d)}
        showTimeSelect
        timeIntervals={15}
        timeCaption="Heure"
        dateFormat="Pp"
        locale={fr}
        className="w-full border p-2 rounded"
        placeholderText="Choisissez un créneau"
        filterDate={isDayAllowed}
        includeTimes={includedTimes}
      />

      {date && includedTimes.length === 0 && (
        <p className="text-red-500 text-sm">
          Aucun créneau disponible ce jour-là.
        </p>
      )}
    </div>
  );
}

export default function ReservationPage() {
  const [nom, setNom] = useState("");
  const [email, setEmail] = useState("");
  const [telephone, setTelephone] = useState("");
  const [personnes, setPersonnes] = useState(1);
  const [date, setDate] = useState<Date | null>(null);
  const [notes, setNotes] = useState("");
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess(false);

    if (!date) return setError("Veuillez choisir un créneau valide.");

    const personnesVal = Number(personnes);
    if (isNaN(personnesVal)) return setError("Nombre de personnes invalide.");

    const telTrimmed = telephone.trim();
    if (!telTrimmed)
      return setError("Veuillez renseigner votre numéro de téléphone.");
    if (!/^\d{10,10}$/.test(telTrimmed))
      return setError(
        "Le numéro de téléphone doit contenir au moins 10 chiffres sans espace."
      );

    const { data: paramsData } = await supabase
      .from("parametres_reservation")
      .select("*")
      .single();

    if (!paramsData)
      return setError("Erreur lors du chargement des paramètres.");

    const {
      personnes_min_par_resa,
      personnes_max_par_resa,
      capacite_max_par_creneau,
      capacite_max_par_service,
    } = paramsData;

    if (personnesVal < personnes_min_par_resa)
      return setError(
        `Vous devez réserver pour au moins ${personnes_min_par_resa} personnes.`
      );

    if (personnesVal > personnes_max_par_resa)
      return setError(
        `La limite de réservation pour une table est de ${personnes_max_par_resa} personnes. Merci de votre compréhension.`
      );

    const selectedDate = new Date(date);
    const jourSemaine = selectedDate
      .toLocaleDateString("fr-FR", { weekday: "long" })
      .toLowerCase();
    const heure = selectedDate.toTimeString().slice(0, 5);
    const heureInt = parseInt(heure.split(":")[0]);
    const service = heureInt < 17 ? "midi" : "soir";

    const { data: horaires } = await supabase
      .from("horaires_ouverture")
      .select("*");
    const horaireValide = horaires?.some(
      (h) =>
        h.jour.toLowerCase() === jourSemaine &&
        h.heure_debut <= heure &&
        h.heure_fin > heure
    );

    if (!horaireValide)
      return setError("Ce créneau n’est pas dans les horaires d’ouverture.");

    const { data: dejaPrises } = await supabase
      .from("reservation")
      .select("personnes, date")
      .gte("date", selectedDate.toISOString().slice(0, 16))
      .lt(
        "date",
        new Date(selectedDate.getTime() + 15 * 60000).toISOString().slice(0, 16)
      );

    const totalSurCreneau =
      dejaPrises?.reduce((acc, r) => acc + r.personnes, 0) || 0;

    if (totalSurCreneau + personnesVal > capacite_max_par_creneau)
      return setError("Ce créneau est déjà complet.");

    const debutService = new Date(selectedDate);
    debutService.setHours(service === "midi" ? 10 : 17, 0, 0, 0);
    const finService = new Date(selectedDate);
    finService.setHours(service === "midi" ? 17 : 23, 59, 59, 999);

    const { data: serviceData } = await supabase
      .from("reservation")
      .select("personnes")
      .gte("date", debutService.toISOString())
      .lte("date", finService.toISOString());

    const totalService =
      serviceData?.reduce((acc, r) => acc + r.personnes, 0) || 0;

    if (totalService + personnesVal > capacite_max_par_service)
      return setError("Le service est complet.");

    const { error } = await supabase.from("reservation").insert([
      {
        nom,
        email,
        telephone: telTrimmed,
        personnes: personnesVal,
        date: new Date(
          date.getTime() - date.getTimezoneOffset() * 60000
        ).toISOString(),
        notes,
      },
    ]);

    if (error) {
      console.error(error);
      setError("Une erreur est survenue. Veuillez réessayer.");
    } else {
      setSuccess(true);
      setNom("");
      setEmail("");
      setTelephone("");
      setPersonnes(1);
      setDate(null);
      setNotes("");

      setTimeout(() => {
        router.push("/");
      }, 4000);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded shadow-md w-full max-w-md space-y-4"
      >
        <h1 className="text-2xl font-bold text-center">Réserver une table</h1>

        <input
          type="text"
          placeholder="Nom"
          value={nom}
          onChange={(e) => setNom(e.target.value)}
          className="w-full border p-2 rounded"
          required
        />

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full border p-2 rounded"
          required
        />

        <input
          type="tel"
          placeholder="Téléphone (ex : 0601020304)"
          value={telephone}
          onChange={(e) => setTelephone(e.target.value)}
          className="w-full border p-2 rounded"
          required
        />

        <input
          type="number"
          placeholder="Nombre de personnes"
          value={personnes.toString()}
          onChange={(e) => setPersonnes(parseInt(e.target.value) || 1)}
          min={1}
          className="w-full border p-2 rounded"
          required
        />

        <DatePickerReservation date={date} setDate={setDate} />

        <textarea
          placeholder="Notes (facultatif)"
          value={notes}
          onChange={(e) =>
            e.target.value.length <= 300 && setNotes(e.target.value)
          }
          className="w-full border p-2 rounded"
          maxLength={300}
        />

        {error && <p className="text-red-500">{error}</p>}
        {success && (
          <p className="text-green-600">Réservation envoyée avec succès !</p>
        )}

        <button
          type="submit"
          className="w-full bg-black text-white p-2 rounded hover:bg-gray-800"
        >
          Réserver
        </button>

        <button
          type="button"
          onClick={() => router.push("/")}
          className="w-full border text-black p-2 rounded hover:bg-gray-200"
        >
          Retour à l’accueil
        </button>
      </form>
    </div>
  );
}
