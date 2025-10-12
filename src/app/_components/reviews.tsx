"use client";

import type { EmblaCarouselType } from "embla-carousel";
import Autoplay from "embla-carousel-autoplay";
import { Star, StarHalf } from "lucide-react";
import { motion } from "motion/react";
import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import {
  Carousel,
  type CarouselApi,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import type { Review } from "@/server/routers/places";

function useDots(api: CarouselApi) {
  const [selected, setSelected] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);

  const onInit = useCallback((emblaApi: EmblaCarouselType) => {
    setScrollSnaps(emblaApi.scrollSnapList());
  }, []);

  const onSelect = useCallback((emblaApi: EmblaCarouselType) => {
    setSelected(emblaApi.selectedScrollSnap());
    emblaApi.plugins().autoplay.reset();
  }, []);

  useEffect(() => {
    if (!api) return;
    onInit(api);
    onSelect(api);
    api.on("reInit", onInit).on("select", onSelect);
  }, [api, onInit, onSelect]);
  return {
    selected,
    scrollSnaps,
  };
}

export function Reviews({ reviews }: { reviews: Review[] }) {
  const [api, setApi] = useState<CarouselApi>();
  const { scrollSnaps, selected } = useDots(api);
  return (
    <div className="absolute bottom-0 py-5 w-full">
      <Carousel
        setApi={setApi}
        className="container mx-auto"
        opts={{
          loop: true,
        }}
        plugins={[Autoplay({ delay: 7000 })]}
      >
        <CarouselContent>
          {reviews.map((r) => (
            <CarouselItem key={r.googleMapsUri}>
              <Testimonial r={r} />
            </CarouselItem>
          ))}
        </CarouselContent>
        <div className="flex justify-center mt-6 gap-2">
          {scrollSnaps.map((k, i) => (
            <motion.button
              key={k}
              onClick={() => api?.scrollTo(i)}
              className="h-2 rounded-full bg-white/40 relative overflow-hidden cursor-pointer"
              animate={{
                width: i === selected ? 24 : 8,
                backgroundColor:
                  i === selected
                    ? "rgba(255,255,255,1)"
                    : "rgba(255,255,255,0.4)",
              }}
              transition={{
                type: "spring",
                stiffness: 300,
                damping: 25,
              }}
            ></motion.button>
          ))}
        </div>
      </Carousel>
    </div>
  );
}

export function Testimonial({ r }: { r: Review }) {
  return (
    <a
      href={r.googleMapsUri}
      rel="noopener noreferrer"
      target="_blank"
      className="flex flex-col items-center text-center text-white opacity-90 h-full justify-end"
    >
      <p className="mb-4 max-w-4xl px-8 font-medium text-sm sm:text-base line-clamp-3">
        &ldquo;{r.originalText.text}&rdquo;
      </p>
      <div className="flex items-center gap-2 lg:gap-4">
        <Image
          className="size-8 sm:size-10 lg:size-12"
          src={r.authorAttribution.photoUri}
          alt={r.authorAttribution.displayName}
          width={128}
          height={128}
        />
        <div className="text-left">
          <div className="text-sm font-medium md:text-base">
            {r.authorAttribution.displayName}
          </div>
          <div className="flex">
            <StarRating rating={r.rating} />
          </div>
          <div className="text-xs">{r.relativePublishTimeDescription}</div>
        </div>
      </div>
    </a>
  );
}

export function StarRating({ rating }: { rating: number }) {
  const fullStars = Math.floor(rating);
  const hasHalf = rating % 1 >= 0.5;
  const totalStars = 5;

  return (
    <div className="flex items-center">
      {Array.from({ length: totalStars }).map((_, i) => {
        const key = crypto.randomUUID();
        if (i < fullStars)
          return <Star key={key} className="size-4 fill-amber-400 stroke-0" />;
        if (i === fullStars && hasHalf)
          return (
            <StarHalf key={key} className="size-4 fill-amber-400 stroke-0" />
          );
        return (
          <Star
            key={key}
            className="size-4 fill-none stroke-amber-400 opacity-40"
          />
        );
      })}
    </div>
  );
}
