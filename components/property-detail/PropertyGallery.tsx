"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Grid3X3, X } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { GALLERY_IMAGES, LIGHTBOX_IMAGES } from "@/components/property-detail/mockProperty";

export function PropertyGallery() {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const touchStartXRef = useRef<number | null>(null);

  const close = useCallback(() => setLightboxOpen(false), []);
  const goNext = useCallback(() => setActiveIndex((i) => (i + 1) % LIGHTBOX_IMAGES.length), []);
  const goPrev = useCallback(
    () => setActiveIndex((i) => (i - 1 + LIGHTBOX_IMAGES.length) % LIGHTBOX_IMAGES.length),
    [],
  );

  useEffect(() => {
    if (!lightboxOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") goNext();
      if (e.key === "ArrowLeft") goPrev();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [lightboxOpen, close, goNext, goPrev]);

  const openGallery = () => {
    setActiveIndex(0);
    setLightboxOpen(true);
  };

  const [main, kitchen, bedroom, arch] = GALLERY_IMAGES;

  return (
    <>
      <section className="mb-12 grid h-auto grid-cols-1 gap-4 overflow-hidden rounded-xl md:grid-cols-4 md:grid-rows-2 md:h-[600px]">
        <div className="relative min-h-[240px] overflow-hidden md:col-span-2 md:row-span-2 md:min-h-0 group">
          <Image
            src={main.src}
            alt={main.alt}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, 50vw"
            priority
          />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-primary/40 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
        </div>
        <div className="relative min-h-[200px] overflow-hidden md:col-span-2 md:row-span-1 md:min-h-0 group">
          <Image
            src={kitchen.src}
            alt={kitchen.alt}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-primary/40 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
        </div>
        <div className="relative min-h-[200px] overflow-hidden md:min-h-0 group">
          <Image
            src={bedroom.src}
            alt={bedroom.alt}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, 25vw"
          />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-primary/40 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
        </div>
        <button
          type="button"
          onClick={openGallery}
          className="relative min-h-[200px] overflow-hidden md:min-h-0"
          aria-label="Zobacz wszystkie zdjęcia"
        >
          <Image src={arch.src} alt="" fill className="object-cover" sizes="(max-width: 768px) 100vw, 25vw" />
          <div className="absolute inset-0 z-10 flex cursor-pointer flex-col items-center justify-center bg-primary/60 text-white transition-colors hover:bg-primary/70">
            <Grid3X3 className="mb-2 h-10 w-10" aria-hidden />
            <span className="font-bold">Zobacz 24+ zdjęcia</span>
          </div>
        </button>
      </section>

      <AnimatePresence>
        {lightboxOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[200] flex flex-col bg-black/85 backdrop-blur-sm"
            role="dialog"
            aria-modal="true"
            aria-label="Galeria zdjęć"
          >
            <div className="flex items-center justify-between border-b border-white/10 px-4 py-3 text-white md:px-6">
              <p className="font-headline text-sm font-bold md:text-base">
                Penthouse Obsydian — {LIGHTBOX_IMAGES.length} zdjęć
              </p>
              <button
                type="button"
                onClick={close}
                className="rounded-full p-2 transition hover:bg-white/10"
                aria-label="Zamknij galerię"
              >
                <X className="h-6 w-6" />
              </button>
            </div>
            <div
              className="relative min-h-0 flex-1 p-4 md:p-6"
              onTouchStart={(e) => {
                touchStartXRef.current = e.changedTouches[0]?.clientX ?? null;
              }}
              onTouchEnd={(e) => {
                const startX = touchStartXRef.current;
                const endX = e.changedTouches[0]?.clientX ?? null;
                if (startX == null || endX == null) return;
                const deltaX = endX - startX;
                if (Math.abs(deltaX) < 40) return;
                if (deltaX < 0) goNext();
                else goPrev();
                touchStartXRef.current = null;
              }}
            >
              <button
                type="button"
                onClick={goPrev}
                aria-label="Poprzednie zdjęcie"
                className="absolute left-2 top-1/2 z-20 -translate-y-1/2 rounded-full bg-black/45 p-2 text-white transition hover:bg-black/65 md:left-4"
              >
                <ChevronLeft className="h-5 w-5" aria-hidden />
              </button>
              <button
                type="button"
                onClick={goNext}
                aria-label="Następne zdjęcie"
                className="absolute right-2 top-1/2 z-20 -translate-y-1/2 rounded-full bg-black/45 p-2 text-white transition hover:bg-black/65 md:right-4"
              >
                <ChevronRight className="h-5 w-5" aria-hidden />
              </button>
              <motion.div
                key={activeIndex}
                initial={{ opacity: 0.5 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.2 }}
                className="relative mx-auto h-[40vh] max-w-5xl md:h-[50vh]"
              >
                <Image
                  src={LIGHTBOX_IMAGES[activeIndex]!.src}
                  alt={LIGHTBOX_IMAGES[activeIndex]!.alt}
                  fill
                  className="rounded-lg object-contain"
                  sizes="100vw"
                  priority
                />
              </motion.div>
              <div className="mx-auto mt-4 grid max-h-[28vh] max-w-5xl grid-cols-4 gap-2 overflow-y-auto sm:grid-cols-6 md:grid-cols-8">
                {LIGHTBOX_IMAGES.map((img, i) => (
                  <button
                    key={img.id}
                    type="button"
                    onClick={() => setActiveIndex(i)}
                    className={`relative aspect-square overflow-hidden rounded-md ring-2 ring-offset-2 ring-offset-black transition ${
                      i === activeIndex ? "ring-tertiary-fixed" : "ring-transparent opacity-80 hover:opacity-100"
                    }`}
                  >
                    <Image src={img.src} alt="" fill className="object-cover" sizes="120px" />
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
