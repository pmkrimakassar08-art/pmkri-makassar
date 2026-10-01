import type { GalleryPhoto } from "@/lib/gallery";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { useCallback, useEffect, useRef } from "react";

interface LightboxProps {
  photos: GalleryPhoto[];
  activeIndex: number;
  onClose: () => void;
  onNavigate: (index: number) => void;
}

export function Lightbox({
  photos,
  activeIndex,
  onClose,
  onNavigate,
}: LightboxProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const previouslyFocused = useRef<HTMLElement | null>(null);

  const photo = photos[activeIndex];
  const total = photos.length;

  const goPrev = useCallback(() => {
    onNavigate((activeIndex - 1 + total) % total);
  }, [activeIndex, total, onNavigate]);

  const goNext = useCallback(() => {
    onNavigate((activeIndex + 1) % total);
  }, [activeIndex, total, onNavigate]);

  // Simpan elemen fokus sebelumnya dan pulihkan saat lightbox ditutup.
  useEffect(() => {
    previouslyFocused.current = document.activeElement as HTMLElement | null;
    closeButtonRef.current?.focus();
    return () => {
      previouslyFocused.current?.focus();
    };
  }, []);

  // Kunci scroll halaman di belakang lightbox.
  useEffect(() => {
    const original = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = original;
    };
  }, []);

  // Navigasi papan tombol: Escape, panah kiri/kanan, dan jebakan fokus.
  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        event.preventDefault();
        onClose();
        return;
      }
      if (event.key === "ArrowLeft") {
        event.preventDefault();
        goPrev();
        return;
      }
      if (event.key === "ArrowRight") {
        event.preventDefault();
        goNext();
        return;
      }
      if (event.key === "Tab") {
        const focusables = dialogRef.current?.querySelectorAll<HTMLElement>(
          'button:not([disabled]), [href], [tabindex]:not([tabindex="-1"])',
        );
        if (!focusables || focusables.length === 0) return;
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first.focus();
        }
      }
    }

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [onClose, goPrev, goNext]);

  if (!photo) return null;

  return (
    <dialog
      ref={dialogRef}
      open
      aria-modal="true"
      aria-label={`Pratinjau foto: ${photo.title}`}
      data-ocid="gallery.lightbox"
      className="fixed inset-0 z-50 m-0 flex h-full max-h-none w-full max-w-none flex-col bg-background/95 p-0 backdrop-blur-sm"
    >
      <div className="flex items-center justify-between gap-4 border-b border-border px-4 py-3 md:px-6">
        <div className="min-w-0">
          <p className="truncate font-display text-base font-semibold text-foreground md:text-lg">
            {photo.title}
          </p>
          <p className="text-xs uppercase tracking-[0.2em] text-primary">
            {photo.category} · {activeIndex + 1} / {total}
          </p>
        </div>
        <button
          ref={closeButtonRef}
          type="button"
          onClick={onClose}
          aria-label="Tutup pratinjau foto"
          data-ocid="gallery.lightbox.close_button"
          className="inline-flex size-11 shrink-0 items-center justify-center rounded-md border border-border bg-card text-foreground transition-smooth hover:border-primary hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          <X className="size-5" aria-hidden="true" />
        </button>
      </div>

      <div className="relative flex min-h-0 flex-1 items-center justify-center px-2 py-4 md:px-16">
        <button
          type="button"
          onClick={goPrev}
          aria-label="Foto sebelumnya"
          data-ocid="gallery.lightbox.prev_button"
          className="absolute left-2 z-10 inline-flex size-11 items-center justify-center rounded-full border border-border bg-card/90 text-foreground transition-smooth hover:border-primary hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring md:left-4"
        >
          <ChevronLeft className="size-6" aria-hidden="true" />
        </button>

        <img
          src={photo.src}
          alt={photo.alt}
          className="max-h-full max-w-full rounded-lg border border-border object-contain shadow-elevated"
        />

        <button
          type="button"
          onClick={goNext}
          aria-label="Foto berikutnya"
          data-ocid="gallery.lightbox.next_button"
          className="absolute right-2 z-10 inline-flex size-11 items-center justify-center rounded-full border border-border bg-card/90 text-foreground transition-smooth hover:border-primary hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring md:right-4"
        >
          <ChevronRight className="size-6" aria-hidden="true" />
        </button>
      </div>

      <div className="border-t border-border px-4 py-3">
        <div className="mx-auto flex max-w-3xl items-center justify-center gap-2 overflow-x-auto">
          {photos.map((item, index) => (
            <button
              key={item.id}
              type="button"
              onClick={() => onNavigate(index)}
              aria-label={`Lihat foto ${index + 1}: ${item.title}`}
              aria-current={index === activeIndex}
              data-ocid={`gallery.lightbox.thumb.${index + 1}`}
              className={`size-12 shrink-0 overflow-hidden rounded-md border transition-smooth focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${
                index === activeIndex
                  ? "border-primary opacity-100"
                  : "border-border opacity-60 hover:opacity-100"
              }`}
            >
              <img
                src={item.src}
                alt=""
                className="size-full object-cover"
                loading="lazy"
              />
            </button>
          ))}
        </div>
      </div>
    </dialog>
  );
}
