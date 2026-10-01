import { createActor } from "@/backend";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useActor } from "@caffeineai/core-infrastructure";
import { useMutation } from "@tanstack/react-query";
import {
  AlertCircle,
  CheckCircle2,
  Clock,
  Mail,
  MapPin,
  Phone,
  Send,
} from "lucide-react";
import { useState } from "react";
import { SiFacebook, SiInstagram, SiWhatsapp } from "react-icons/si";

interface ContactMessageInput {
  name: string;
  email: string;
  message: string;
}

/**
 * Kontrak backend untuk pesan kontak. Metode ini disediakan oleh mixin
 * contact-messages pada canister; antarmuka sempit ini menjaga frontend
 * tetap bertipe saat binding belum diregenerasi.
 */
interface ContactBackend {
  submitContactMessage(input: ContactMessageInput): Promise<unknown>;
}

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const contactDetails = [
  {
    id: "alamat",
    icon: MapPin,
    label: "Alamat Sekretariat",
    value:
      "Jl. Perintis Kemerdekaan No. 12, Tamalanrea, Makassar, Sulawesi Selatan 90245",
    href: null,
  },
  {
    id: "email",
    icon: Mail,
    label: "Email",
    value: "sekretariat@pmkrimakassar.org",
    href: "mailto:sekretariat@pmkrimakassar.org",
  },
  {
    id: "telepon",
    icon: Phone,
    label: "Telepon / WhatsApp",
    value: "+62 812-3456-7890",
    href: "https://wa.me/6281234567890",
  },
  {
    id: "jam",
    icon: Clock,
    label: "Jam Layanan",
    value: "Senin – Jumat, 09.00 – 17.00 WITA",
    href: null,
  },
];

const socialLinks = [
  {
    id: "instagram",
    icon: SiInstagram,
    label: "Instagram Perhimpiunan Mahasiswa Katolik Republik Indonesia",
    href: "https://instagram.com/pmkrimakassar",
  },
  {
    id: "facebook",
    icon: SiFacebook,
    label: "Facebook Perhimpiunan Mahasiswa Katolik Republik Indonesia",
    href: "https://facebook.com/pmkrimakassar",
  },
  {
    id: "whatsapp",
    icon: SiWhatsapp,
    label: "WhatsApp Perhimpiunan Mahasiswa Katolik Republik Indonesia",
    href: "https://wa.me/6281234567890",
  },
];

export function ContactSection() {
  const { actor } = useActor(createActor);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);

  const mutation = useMutation({
    mutationFn: async (input: ContactMessageInput) => {
      if (!actor) throw new Error("Backend belum siap. Coba lagi sebentar.");
      const contactActor = actor as unknown as ContactBackend;
      if (typeof contactActor.submitContactMessage !== "function") {
        throw new Error(
          "Layanan pesan kontak belum tersedia. Silakan hubungi kami via email.",
        );
      }
      return contactActor.submitContactMessage(input);
    },
  });

  function validate(): boolean {
    const next: Record<string, string> = {};
    if (name.trim().length < 2) {
      next.name = "Nama minimal 2 karakter.";
    }
    if (!EMAIL_PATTERN.test(email.trim())) {
      next.email = "Masukkan alamat email yang valid.";
    }
    if (message.trim().length < 10) {
      next.message = "Pesan minimal 10 karakter.";
    }
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitted(false);
    if (!validate()) return;

    const payload: ContactMessageInput = {
      name: name.trim(),
      email: email.trim(),
      message: message.trim(),
    };

    setName("");
    setEmail("");
    setMessage("");

    mutation.mutate(payload, {
      onSuccess: () => setSubmitted(true),
      onError: () => {
        setName((current) => (current === "" ? payload.name : current));
        setEmail((current) => (current === "" ? payload.email : current));
        setMessage((current) => (current === "" ? payload.message : current));
      },
    });
  }

  return (
    <section
      id="kontak"
      data-ocid="contact.section"
      className="border-t border-border bg-background py-20 md:py-28"
    >
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <div className="max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">
            Kontak
          </p>
          <div className="mt-3 h-0.5 w-16 bg-primary" aria-hidden="true" />
          <h2 className="mt-6 font-display text-3xl font-bold tracking-tight text-foreground md:text-4xl">
            Hubungi Sekretariat Kami
          </h2>
          <p className="mt-4 text-base leading-relaxed text-muted-foreground md:text-lg">
            Sampaikan pertanyaan, ajakan kerja sama, atau aspirasi Anda. Pesan
            akan diteruskan langsung kepada pengurus Perhimpiunan Mahasiswa
            Katolik Republik Indonesia.
          </p>
        </div>

        <div className="mt-12 grid gap-10 lg:grid-cols-2 lg:gap-16">
          {/* Informasi kontak */}
          <div>
            <ul className="space-y-6">
              {contactDetails.map((detail) => {
                const Icon = detail.icon;
                return (
                  <li
                    key={detail.id}
                    data-ocid={`contact.info.${detail.id}`}
                    className="flex items-start gap-4"
                  >
                    <span className="inline-flex size-11 shrink-0 items-center justify-center rounded-md bg-primary/15 text-primary">
                      <Icon className="size-5" aria-hidden="true" />
                    </span>
                    <div className="min-w-0">
                      <p className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                        {detail.label}
                      </p>
                      {detail.href ? (
                        <a
                          href={detail.href}
                          target="_blank"
                          rel="noreferrer"
                          className="mt-1 block break-words text-base text-foreground underline-offset-4 transition-smooth hover:text-primary hover:underline"
                        >
                          {detail.value}
                        </a>
                      ) : (
                        <p className="mt-1 break-words text-base text-foreground">
                          {detail.value}
                        </p>
                      )}
                    </div>
                  </li>
                );
              })}
            </ul>

            <div className="mt-8">
              <p className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                Media Sosial
              </p>
              <div className="mt-3 flex items-center gap-3">
                {socialLinks.map((social) => {
                  const Icon = social.icon;
                  return (
                    <a
                      key={social.id}
                      href={social.href}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={social.label}
                      data-ocid={`contact.social.${social.id}`}
                      className="inline-flex size-11 items-center justify-center rounded-md border border-border bg-card text-foreground transition-smooth hover:border-primary hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    >
                      <Icon className="size-5" aria-hidden="true" />
                    </a>
                  );
                })}
              </div>
            </div>

            {/* Peta lokasi statis */}
            <figure
              data-ocid="contact.map"
              className="mt-8 overflow-hidden rounded-lg border border-border bg-card shadow-elevated"
            >
              <img
                src="/assets/generated/map-sekretariat.dim_1200x675.png"
                alt="Peta lokasi sekretariat Perhimpiunan Mahasiswa Katolik Republik Indonesia di Tamalanrea"
                loading="lazy"
                className="aspect-video w-full object-cover"
              />
              <figcaption className="border-t border-border px-5 py-3 text-sm text-muted-foreground">
                Sekretariat Perhimpiunan Mahasiswa Katolik Republik Indonesia —
                Tamalanrea, Kota Makassar
              </figcaption>
            </figure>
          </div>

          {/* Formulir kontak */}
          <div className="rounded-lg border border-border bg-card p-6 shadow-elevated md:p-8">
            <form
              onSubmit={handleSubmit}
              noValidate
              data-ocid="contact.form"
              className="space-y-5"
            >
              <div className="space-y-2">
                <Label htmlFor="contact-name">Nama Lengkap</Label>
                <Input
                  id="contact-name"
                  name="name"
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  placeholder="Nama Anda"
                  autoComplete="name"
                  aria-invalid={Boolean(errors.name)}
                  aria-describedby={
                    errors.name ? "contact-name-error" : undefined
                  }
                  data-ocid="contact.name.input"
                />
                {errors.name && (
                  <p
                    id="contact-name-error"
                    data-ocid="contact.name.error"
                    className="flex items-center gap-1.5 text-sm text-destructive"
                  >
                    <AlertCircle className="size-4" aria-hidden="true" />
                    {errors.name}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="contact-email">Email</Label>
                <Input
                  id="contact-email"
                  name="email"
                  type="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  placeholder="nama@email.com"
                  autoComplete="email"
                  aria-invalid={Boolean(errors.email)}
                  aria-describedby={
                    errors.email ? "contact-email-error" : undefined
                  }
                  data-ocid="contact.email.input"
                />
                {errors.email && (
                  <p
                    id="contact-email-error"
                    data-ocid="contact.email.error"
                    className="flex items-center gap-1.5 text-sm text-destructive"
                  >
                    <AlertCircle className="size-4" aria-hidden="true" />
                    {errors.email}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="contact-message">Pesan</Label>
                <Textarea
                  id="contact-message"
                  name="message"
                  value={message}
                  onChange={(event) => setMessage(event.target.value)}
                  placeholder="Tuliskan pesan Anda di sini..."
                  rows={5}
                  aria-invalid={Boolean(errors.message)}
                  aria-describedby={
                    errors.message ? "contact-message-error" : undefined
                  }
                  data-ocid="contact.message.textarea"
                />
                {errors.message && (
                  <p
                    id="contact-message-error"
                    data-ocid="contact.message.error"
                    className="flex items-center gap-1.5 text-sm text-destructive"
                  >
                    <AlertCircle className="size-4" aria-hidden="true" />
                    {errors.message}
                  </p>
                )}
              </div>

              <Button
                type="submit"
                size="lg"
                disabled={mutation.isPending}
                data-ocid="contact.submit_button"
                className="w-full rounded-md"
              >
                <Send className="size-4" aria-hidden="true" />
                {mutation.isPending ? "Mengirim..." : "Kirim Pesan"}
              </Button>

              {submitted && (
                <output
                  data-ocid="contact.success_state"
                  className="flex items-center gap-2 rounded-md border border-accent/40 bg-accent/10 px-4 py-3 text-sm text-foreground"
                >
                  <CheckCircle2
                    className="size-4 shrink-0 text-accent"
                    aria-hidden="true"
                  />
                  Terima kasih! Pesan Anda telah terkirim dan akan segera
                  ditindaklanjuti oleh pengurus.
                </output>
              )}

              {mutation.isError && (
                <p
                  role="alert"
                  data-ocid="contact.error_state"
                  className="flex items-center gap-2 rounded-md border border-destructive/40 bg-destructive/10 px-4 py-3 text-sm text-foreground"
                >
                  <AlertCircle
                    className="size-4 shrink-0 text-destructive"
                    aria-hidden="true"
                  />
                  {mutation.error instanceof Error
                    ? mutation.error.message
                    : "Pesan gagal terkirim. Silakan coba lagi."}
                </p>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
