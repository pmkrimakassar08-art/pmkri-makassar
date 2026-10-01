import { Card, CardContent } from "@/components/ui/card";
import { VALUE_CARDS } from "@/lib/site";

export function ValueCards() {
  return (
    <section
      data-ocid="values.section"
      aria-labelledby="values-heading"
      className="border-y border-border/60 bg-muted/40"
    >
      <div className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
            Identitas Kami
          </p>
          <h2
            id="values-heading"
            className="mt-3 font-display text-3xl font-bold tracking-tight text-foreground sm:text-4xl"
          >
            Nilai yang Kami Hidupi
          </h2>
          <p className="mt-4 text-base leading-relaxed text-muted-foreground">
            Enam pilar yang menuntun setiap langkah dan karya Perhimpiunan
            Mahasiswa Katolik Republik Indonesia.
          </p>
        </div>

        <ul className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {VALUE_CARDS.map((value, index) => {
            const Icon = value.icon;
            return (
              <li key={value.title}>
                <Card
                  data-ocid={`values.card.${index + 1}`}
                  className="h-full rounded-lg border-border/70 bg-card shadow-subtle transition-smooth hover:-translate-y-1 hover:shadow-elevated"
                >
                  <CardContent className="flex flex-col gap-4">
                    <span className="flex size-12 items-center justify-center rounded-full bg-accent/15 text-accent">
                      <Icon aria-hidden="true" className="size-6" />
                    </span>
                    <h3 className="font-display text-lg font-semibold text-foreground">
                      {value.title}
                    </h3>
                    <p className="text-sm leading-relaxed text-muted-foreground">
                      {value.description}
                    </p>
                  </CardContent>
                </Card>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
