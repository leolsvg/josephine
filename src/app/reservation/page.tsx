"use client";
import { useState, useEffect, useMemo, useCallback } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import DatePicker from "react-datepicker";
import { fr } from "date-fns/locale";
import "react-datepicker/dist/react-datepicker.css";
import { setHours, setMinutes } from "date-fns";

interface Horaire {
	jour: string; // ex: "lundi"
	heure_debut: string; // "12:00:00"
	heure_fin: string; // "14:00:00"
}

/* ---------- Utils ---------- */
const weekdayFr = (d: Date) =>
	d.toLocaleDateString("fr-FR", { weekday: "long" }).toLowerCase();

const strTimeToMinutes = (t: string) => {
	// supporte "HH:MM" et "HH:MM:SS"
	const [h, m] = t.split(":").map(Number);
	return h * 60 + (m || 0);
};

const dateLocalMinutes = (d: Date) => d.getHours() * 60 + d.getMinutes();

const sameWallTimeUTC = (d: Date) =>
	new Date(d.getTime() - d.getTimezoneOffset() * 60000).toISOString();

// frontière midi/soir (17h = 17:00)
const isMidiByMinutes = (minutes: number) => Math.floor(minutes / 60) < 17;

/* ---------- Child: DatePickerReservation (utilise les horaires du parent) ---------- */
function DatePickerReservation({
	date,
	setDate,
	horaires,
}: {
	date: Date | null;
	setDate: (date: Date | null) => void;
	horaires: Horaire[];
}) {
	const isDayAllowed = useCallback(
		(dateToCheck: Date) => {
			const dayName = weekdayFr(dateToCheck);
			return horaires.some((h) => h.jour.trim().toLowerCase() === dayName);
		},
		[horaires],
	);

	const getIncludedTimes = useCallback(
		(d: Date) => {
			const dayName = weekdayFr(d);
			const filtered = horaires.filter(
				(h) => h.jour.trim().toLowerCase() === dayName,
			);

			const times: Date[] = [];
			filtered.forEach((h) => {
				const startM = strTimeToMinutes(h.heure_debut);
				const endM = strTimeToMinutes(h.heure_fin);

				// créneaux toutes les 15 min
				let current = setHours(
					setMinutes(new Date(d), startM % 60),
					Math.floor(startM / 60),
				);
				const end = setHours(
					setMinutes(new Date(d), endM % 60),
					Math.floor(endM / 60),
				);
				while (current < end) {
					times.push(new Date(current));
					current = new Date(current.getTime() + 15 * 60000);
				}
			});

			// === BLOQUER LE SERVICE DU JOUR DÈS QU'IL A COMMENCÉ ===
			const now = new Date();
			const sameDay = now.toDateString() === d.toDateString();
			if (sameDay) {
				// service de la sélection (selon l'heure choisie par l'utilisateur)
				const selectedService: "midi" | "soir" =
					d.getHours() < 17 ? "midi" : "soir";

				// heure de début (en minutes depuis 00:00) du service correspondant pour ce jour
				const starts: number[] = [];
				filtered.forEach((h) => {
					const startM = strTimeToMinutes(h.heure_debut);
					const isMidi = isMidiByMinutes(startM);
					if (
						(selectedService === "midi" && isMidi) ||
						(selectedService === "soir" && !isMidi)
					) {
						starts.push(startM);
					}
				});
				const serviceStartMin = starts.length ? Math.min(...starts) : null;

				if (serviceStartMin !== null) {
					const nowMin = now.getHours() * 60 + now.getMinutes();
					if (nowMin >= serviceStartMin) {
						// service du jour déjà commencé -> aucun créneau proposé
						return [];
					}
				}
			}

			return times;
		},
		[horaires],
	);

	const includedTimes = useMemo(() => {
		if (date && isDayAllowed(date)) return getIncludedTimes(date);
		return [];
	}, [date, isDayAllowed, getIncludedTimes]);

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

/* ---------- Page ---------- */
export default function ReservationPage() {
	const [nom, setNom] = useState("");
	const [email, setEmail] = useState("");
	const [telephone, setTelephone] = useState("");
	// ⬇️ autorise le champ vide pour afficher le placeholder
	const [personnes, setPersonnes] = useState<number | "">("");
	const [date, setDate] = useState<Date | null>(null);
	const [notes, setNotes] = useState("");
	const [success, setSuccess] = useState(false);
	const [error, setError] = useState("");
	const [horaires, setHoraires] = useState<Horaire[]>([]);
	const router = useRouter();

	/* Charge les horaires UNE fois */
	useEffect(() => {
		(async () => {
			const { data, error } = await supabase
				.from("horaires_ouverture")
				.select("*");
			if (error) {
				console.error(error);
				setHoraires([]);
				return;
			}
			const valides = (data || []).filter(
				(h: Horaire) => h.jour && h.heure_debut && h.heure_fin,
			);
			setHoraires(
				valides.map((h: Horaire) => ({
					...h,
					jour: h.jour.trim().toLowerCase(),
				})),
			);
		})();
	}, []);

	/* Vérifie si la date sélectionnée est dans les horaires, en réutilisant la même logique que le DatePicker */
	const isSelectedSlotOpen = useCallback(
		(d: Date) => {
			const day = weekdayFr(d);
			const tMin = dateLocalMinutes(d);
			const intervals = horaires
				.filter((h) => h.jour === day)
				.map((h) => ({
					start: strTimeToMinutes(h.heure_debut),
					end: strTimeToMinutes(h.heure_fin),
				}));

			return intervals.some(({ start, end }) => tMin >= start && tMin < end);
		},
		[horaires],
	);

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setError("");
		setSuccess(false);

		if (!date) return setError("Veuillez choisir un créneau valide.");

		// ⬇️ vérifie la saisie du nombre de personnes
		if (personnes === "") {
			return setError("Veuillez indiquer le nombre de personnes.");
		}
		const personnesVal = Number(personnes);
		if (isNaN(personnesVal) || personnesVal < 1) {
			return setError("Nombre de personnes invalide.");
		}

		const telTrimmed = telephone.trim();
		if (!telTrimmed)
			return setError("Veuillez renseigner votre numéro de téléphone.");
		if (!/^\d{10}$/.test(telTrimmed))
			return setError(
				"Le numéro de téléphone doit contenir 10 chiffres sans espace.",
			);

		// Vérifier ouverture avec la même logique que le picker
		if (!isSelectedSlotOpen(date)) {
			return setError("Ce créneau n’est pas dans les horaires d’ouverture.");
		}

		// ====== BLOQUER LA RÉSA POUR LE SERVICE D'AUJOURD'HUI DÈS QU'IL A COMMENCÉ ======
		const service = date.getHours() < 17 ? "midi" : "soir";
		const selectedDayName = weekdayFr(date);

		const serviceStartForDay = (serviceToCheck: "midi" | "soir") => {
			const starts: number[] = [];
			horaires
				.filter((h) => h.jour === selectedDayName)
				.forEach((h) => {
					const startM = strTimeToMinutes(h.heure_debut);
					const isMidi = isMidiByMinutes(startM);
					if (
						(serviceToCheck === "midi" && isMidi) ||
						(serviceToCheck === "soir" && !isMidi)
					) {
						starts.push(startM);
					}
				});
			if (!starts.length) return null;
			return Math.min(...starts);
		};

		const now = new Date();
		const sameDay = now.toDateString() === date.toDateString();
		if (sameDay) {
			const startMin = serviceStartForDay(service as "midi" | "soir");
			if (startMin !== null) {
				const nowMin = now.getHours() * 60 + now.getMinutes();
				if (nowMin >= startMin) {
					return setError(
						service === "midi"
							? "Les réservations pour le service du midi ont fermé pour aujourd’hui."
							: "Les réservations pour le service du soir ont fermé pour aujourd’hui.",
					);
				}
			}
		}
		// ================================================================================

		// Paramètres globaux
		const { data: paramsData, error: paramsErr } = await supabase
			.from("parametres_reservation")
			.select("*")
			.single();
		if (paramsErr || !paramsData)
			return setError("Erreur lors du chargement des paramètres.");

		const {
			personnes_min_par_resa,
			personnes_max_par_resa,
			capacite_max_par_creneau,
			capacite_max_par_service,
		} = paramsData;

		if (personnesVal < personnes_min_par_resa)
			return setError(
				`Vous devez réserver pour au moins ${personnes_min_par_resa} personnes.`,
			);
		if (personnesVal > personnes_max_par_resa)
			return setError(
				`Pour réserver une table de plus de ${personnes_max_par_resa} personnes, veuillez nous contacter au 02 33 87 31 64.`,
			);

		// Fenêtre UTC "même heure murale" pour cohérence avec l'insert
		const slotStartUTC = sameWallTimeUTC(date);
		const slotEndUTC = sameWallTimeUTC(new Date(date.getTime() + 15 * 60000));

		// Capacité par créneau (15 min)
		const { data: dejaPrises, error: capErr } = await supabase
			.from("reservation")
			.select("personnes, date")
			.gte("date", slotStartUTC)
			.lt("date", slotEndUTC);
		if (capErr) {
			console.error(capErr);
			return setError("Erreur lors du contrôle de capacité du créneau.");
		}

		const totalSurCreneau =
			(dejaPrises || []).reduce(
				(acc: number, r: { personnes: number }) => acc + r.personnes,
				0,
			) || 0;
		if (totalSurCreneau + personnesVal > capacite_max_par_creneau)
			return setError("Ce créneau est déjà complet.");

		// Capacité par service (midi/soir)
		const debutServiceLocal = new Date(date);
		const finServiceLocal = new Date(date);
		if (service === "midi") {
			debutServiceLocal.setHours(10, 0, 0, 0);
			finServiceLocal.setHours(17, 0, 0, 0);
		} else {
			debutServiceLocal.setHours(17, 0, 0, 0);
			finServiceLocal.setHours(23, 59, 59, 999);
		}
		const debutServiceUTC = sameWallTimeUTC(debutServiceLocal);
		const finServiceUTC = sameWallTimeUTC(finServiceLocal);

		const { data: serviceData, error: servErr } = await supabase
			.from("reservation")
			.select("personnes")
			.gte("date", debutServiceUTC)
			.lte("date", finServiceUTC);
		if (servErr) {
			console.error(servErr);
			return setError("Erreur lors du contrôle de capacité du service.");
		}

		const totalService =
			(serviceData || []).reduce(
				(acc: number, r: { personnes: number }) => acc + r.personnes,
				0,
			) || 0;
		if (totalService + personnesVal > capacite_max_par_service)
			return setError("Le service est complet.");

		// ===== Insert (UTC "même heure murale") + récup ID pour l'email =====
		const { data: insertData, error: insertErr } = await supabase
			.from("reservation")
			.insert([
				{
					nom,
					email: email.trim(),
					telephone: telTrimmed,
					personnes: personnesVal,
					date: sameWallTimeUTC(date),
					notes,
				},
			])
			.select("id")
			.single();

		if (insertErr) {
			console.error(insertErr);
			setError("Une erreur est survenue. Veuillez réessayer.");
			return;
		}

		// ========= EMAIL DE CONFIRMATION (Resend) =========
		try {
			// Champs attendus par /api/send_confirmation :
			// to, nomClient, dateISO (YYYY-MM-DD), heure (HH:MM), couverts, telephone, commentaire, numeroReservation, bcc?, fromLabel?
			const dateISO = date.toISOString().slice(0, 10);
			const heure = `${String(date.getHours()).padStart(2, "0")}:${String(
				date.getMinutes(),
			).padStart(2, "0")}`;

			await fetch("/api/send_confirmation", {
				method: "POST",
				body: JSON.stringify({
					email: email,
					date: dateISO,
					time: heure,
					name: nom,
				}),
			});
		} catch (mailErr) {
			console.error("Erreur envoi email de confirmation:", mailErr);
			// on n'empêche pas la réussite de la résa si l'email échoue
		}
		// =========================================

		setSuccess(true);
		setNom("");
		setEmail("");
		setTelephone("");
		// ⬇️ remet le champ vide pour réafficher le placeholder
		setPersonnes("");
		setDate(null);
		setNotes("");

		setTimeout(() => {
			router.push("/");
		}, 4000);
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

				{/* ⬇️ Nombre de personnes avec placeholder réel */}
				<input
					type="number"
					placeholder="Nombre de personnes"
					value={personnes}
					onChange={(e) => {
						const val = e.target.value;
						// autorise la chaîne vide pour laisser le placeholder
						if (val === "") return setPersonnes("");
						const n = parseInt(val, 10);
						setPersonnes(isNaN(n) ? "" : Math.max(1, n));
					}}
					min={1}
					className="w-full border p-2 rounded"
					required
				/>

				<DatePickerReservation
					date={date}
					setDate={setDate}
					horaires={horaires}
				/>

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
