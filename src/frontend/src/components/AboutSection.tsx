import {
  BookOpen,
  Compass,
  Flag,
  HandHeart,
  Landmark,
  Scale,
  ShieldCheck,
  Users,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

interface ValueItem {
  id: string;
  title: string;
  description: string;
  icon: LucideIcon;
}

interface Officer {
  id: string;
  name: string;
  role: string;
  field: string;
}

const values: ValueItem[] = [
  {
    id: "iman",
    title: "Iman Katolik",
    description:
      "Menghidupi nilai Injil dan ajaran Gereja sebagai landasan setiap gerak pelayanan.",
    icon: BookOpen,
  },
  {
    id: "intelektual",
    title: "Kecendekiawanan",
    description:
      "Menumbuhkan budaya berpikir kritis, membaca, dan berdialog demi kemajuan bersama.",
    icon: Compass,
  },
  {
    id: "solidaritas",
    title: "Solidaritas",
    description:
      "Berpihak pada yang lemah dan hadir nyata bagi masyarakat melalui karya pengabdian.",
    icon: HandHeart,
  },
  {
    id: "kebangsaan",
    title: "Kebangsaan",
    description:
      "Menjunjung Pancasila dan merawat keberagaman Indonesia dalam semangat persaudaraan.",
    icon: Flag,
  },
  {
    id: "integritas",
    title: "Integritas",
    description:
      "Menjaga kejujuran, tanggung jawab, dan keteladanan dalam berorganisasi.",
    icon: ShieldCheck,
  },
  {
    id: "keadilan",
    title: "Keadilan",
    description:
      "Memperjuangkan keadilan sosial dan kesetaraan bagi seluruh lapisan masyarakat.",
    icon: Scale,
  },
];

const officers: Officer[] = [
  {
    id: "ketua",
    name: "Yohanes Baptista",
    role: "Ketua Presidium",
    field: "Presidium Harian",
  },
  {
    id: "sekretaris",
    name: "Maria Angelica",
    role: "Sekretaris Jenderal",
    field: "Presidium Harian",
  },
  {
    id: "bendahara",
    name: "Petrus Adrian",
    role: "Bendahara Umum",
    field: "Presidium Harian",
  },
  {
    id: "kaderisasi",
    name: "Theresia Natalia",
    role: "Koordinator Bidang",
    field: "Bidang Kaderisasi",
  },
  {
    id: "sosial",
    name: "Andreas Setiawan",
    role: "Koordinator Bidang",
    field: "Bidang Sosial & Pengabdian",
  },
  {
    id: "media",
    name: "Clara Bernadette",
    role: "Koordinator Bidang",
    field: "Bidang Media & Informasi",
  },
];

export function AboutSection() {
  return (
    <section
      id="tentang-kami"
      data-ocid="about.section"
      className="border-t border-border bg-background py-20 md:py-28"
    >
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        {/* Profil organisasi */}
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">
              Tentang Kami
            </p>
            <div className="mt-3 h-0.5 w-16 bg-primary" aria-hidden="true" />
            <h2 className="mt-6 font-display text-3xl font-bold tracking-tight text-foreground md:text-4xl">
              Perhimpiunan Mahasiswa Katolik Republik Indonesia, Sanctus
              Albertus Magnus
            </h2>
            <p className="mt-6 text-base leading-relaxed text-muted-foreground md:text-lg">
              Perhimpiunan Mahasiswa Katolik Republik Indonesia (PMKRI) Cabang
              Makassar adalah organisasi kemahasiswaan Katolik yang berdiri
              sebagai ruang pembinaan, perjuangan, dan pengabdian mahasiswa
              Katolik di Sulawesi Selatan. Berdiri sejak pertengahan abad ke-20,
              cabang Makassar hadir untuk membentuk kader yang beriman, berilmu,
              dan berpihak pada kepentingan rakyat.
            </p>
            <p className="mt-4 text-base leading-relaxed text-muted-foreground md:text-lg">
              Melalui kaderisasi, kajian, dan karya sosial, kami merawat
              semangat <em>Sanctus Albertus Magnus</em> — iman yang berpadu
              dengan ilmu pengetahuan dan pelayanan.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2">
            <article
              data-ocid="about.vision.card"
              className="rounded-lg border border-border bg-card p-6 shadow-elevated"
            >
              <span className="inline-flex size-11 items-center justify-center rounded-md bg-primary/15 text-primary">
                <Compass className="size-5" aria-hidden="true" />
              </span>
              <h3 className="mt-4 font-display text-xl font-semibold text-foreground">
                Visi
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                Terwujudnya mahasiswa Katolik yang beriman, cerdas, mandiri, dan
                berdaya juang demi terciptanya masyarakat Indonesia yang adil,
                makmur, dan bermartabat.
              </p>
            </article>

            <article
              data-ocid="about.mission.card"
              className="rounded-lg border border-border bg-card p-6 shadow-elevated"
            >
              <span className="inline-flex size-11 items-center justify-center rounded-md bg-accent/15 text-accent">
                <Landmark className="size-5" aria-hidden="true" />
              </span>
              <h3 className="mt-4 font-display text-xl font-semibold text-foreground">
                Misi
              </h3>
              <ul className="mt-3 space-y-2 text-sm leading-relaxed text-muted-foreground">
                <li>Membina iman dan karakter mahasiswa Katolik.</li>
                <li>Mengembangkan tradisi intelektual dan kajian kritis.</li>
                <li>
                  Mengabdi kepada masyarakat secara nyata dan berkelanjutan.
                </li>
                <li>Memperjuangkan keadilan sosial dan kebangsaan.</li>
              </ul>
            </article>
          </div>
        </div>

        {/* Nilai-nilai organisasi */}
        <div className="mt-20">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">
            Nilai-Nilai Kami
          </p>
          <div className="mt-3 h-0.5 w-16 bg-primary" aria-hidden="true" />
          <h3 className="mt-6 font-display text-2xl font-bold tracking-tight text-foreground md:text-3xl">
            Prinsip yang Menuntun Langkah
          </h3>

          <ul className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {values.map((value) => {
              const Icon = value.icon;
              return (
                <li
                  key={value.id}
                  data-ocid={`about.value.card.${value.id}`}
                  className="rounded-lg border border-border bg-card p-6 shadow-elevated transition-smooth hover:-translate-y-1 hover:border-accent hover:shadow-elevated-hover"
                >
                  <span className="inline-flex size-11 items-center justify-center rounded-md bg-accent/15 text-accent">
                    <Icon className="size-5" aria-hidden="true" />
                  </span>
                  <h4 className="mt-4 font-display text-lg font-semibold text-foreground">
                    {value.title}
                  </h4>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {value.description}
                  </p>
                </li>
              );
            })}
          </ul>
        </div>

        {/* Struktur kepengurusan */}
        <div className="mt-20">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">
            Struktur Kepengurusan
          </p>
          <div className="mt-3 h-0.5 w-16 bg-primary" aria-hidden="true" />
          <h3 className="mt-6 font-display text-2xl font-bold tracking-tight text-foreground md:text-3xl">
            Presidium &amp; Bidang
          </h3>

          <ul className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {officers.map((officer) => (
              <li
                key={officer.id}
                data-ocid={`about.officer.card.${officer.id}`}
                className="flex items-start gap-4 rounded-lg border border-border bg-card p-6 shadow-elevated transition-smooth hover:-translate-y-1 hover:border-primary hover:shadow-elevated-hover"
              >
                <span className="inline-flex size-12 shrink-0 items-center justify-center rounded-full bg-primary/15 font-display text-lg font-bold text-primary">
                  {officer.name.charAt(0)}
                </span>
                <div className="min-w-0">
                  <p className="font-display text-lg font-semibold text-foreground">
                    {officer.name}
                  </p>
                  <p className="text-sm font-medium text-primary">
                    {officer.role}
                  </p>
                  <p className="mt-1 flex items-center gap-1.5 text-xs uppercase tracking-wider text-muted-foreground">
                    <Users className="size-3.5" aria-hidden="true" />
                    {officer.field}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
