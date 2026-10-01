import { Lightbox } from "@/components/Lightbox";
import { galleryPhotos } from "@/lib/gallery";
import { useCallback, useState } from "react";

export function GallerySection() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const openLightbox = useCallback((index: number) => {
    setActiveIndex(index);
  }, []);

  const closeLightbox = useCallback(() => {
    setActiveIndex(null);
  }, []);

  return (
    <section
      id="galeri"
      data-ocid="gallery.section"
      className="border-t border-border bg-muted/40 py-20 md:py-28"
    >
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <div className="max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">
            Galeri
          </p>
          <div className="mt-3 h-0.5 w-16 bg-primary" aria-hidden="true" />
          <h2 className="mt-6 font-display text-3xl font-bold tracking-tight text-foreground md:text-4xl">
            Jejak Kegiatan Kami
          </h2>
          <p className="mt-4 text-base leading-relaxed text-muted-foreground md:text-lg">
            Dokumentasi momen kebersamaan, kaderisasi, dan pengabdian
            Perhimpiunan Mahasiswa Katolik Republik Indonesia. Klik salah satu
            foto untuk melihatnya dalam ukuran penuh.
          </p>
        </div>

        <ul className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {galleryPhotos.map((photo, index) => (
            <li key={photo.id}>
              <button
                type="button"
                onClick={() => openLightbox(index)}
                aria-label={`Buka pratinjau foto: ${photo.title}`}
                data-ocid={`gallery.item.${index + 1}`}
                className="group block w-full overflow-hidden rounded-lg border border-border bg-card text-left shadow-elevated transition-smooth hover:-translate-y-1 hover:border-primary hover:shadow-elevated-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img
                    src={photo.src}
                    alt={photo.alt}
                    loading="lazy"
                    className="size-full object-cover transition-smooth group-hover:scale-105"
                  />
                  <span className="absolute left-3 top-3 rounded-full bg-primary px-3 py-1 text-xs font-semibold uppercase tracking-wider text-primary-foreground">
                    {photo.category}
                  </span>
                </div>
                <div className="border-t border-border px-5 py-4">
                  <p className="font-display text-lg font-semibold text-foreground">
                    {photo.title}
                  </p>
                </div>
              </button>
            </li>
          ))}
        </ul>
      </div>

      {activeIndex !== null && (
        <Lightbox
          photos={galleryPhotos}
          activeIndex={activeIndex}
          onClose={closeLightbox}
          onNavigate={setActiveIndex}
        />
      )}
    </section>
  );
}
