# Design Brief

## Direction

**Marun Institusional** — a deep maroon institutional identity for PMKRI Makassar, formal and dignified, with gold and green accents pulled straight from the organization's shield crest.

## Tone

Refined institutional / editorial — restrained, formal, and confident, the visual language of a respected student organization rather than a startup landing page.

## Differentiation

A site-wide deep maroon canvas (not a white page with maroon accents) with gold rule-lines and a serif display face, so every scroll feels like an official document.

## Color Palette

| Token      | OKLCH          | Role                                              |
| ---------- | -------------- | ------------------------------------------------- |
| background | 0.34 0.115 25  | Site-wide deep maroon base                        |
| foreground | 0.97 0.012 80  | Warm off-white text (≈11:1 on maroon)             |
| card       | 0.40 0.12 25   | Raised maroon surface for cards + navbar          |
| primary    | 0.84 0.16 92   | Gold from the logo shield — CTAs, active nav      |
| accent     | 0.60 0.13 150  | Green from PMKRI lettering — secondary highlights |
| muted      | 0.44 0.10 25   | Recessed panels, form fields, footer band         |

## Typography

- Display: **Lora** — hero title, section headings, institutional serif gravitas
- Body: **General Sans** — paragraphs, nav, labels, UI; clean and highly legible on maroon
- Scale: hero `text-4xl md:text-6xl font-bold tracking-tight`, h2 `text-3xl md:text-4xl font-bold`, label `text-sm font-semibold tracking-[0.2em] uppercase text-primary`, body `text-base md:text-lg`

## Elevation & Depth

Flat maroon base with layered surfaces: cards use `bg-card` + `border` + `shadow-elevated`; no gradients on large areas, only a maroon overlay gradient over the hero photo.

## Structural Zones

| Zone    | Background            | Border            | Notes                                                     |
| ------- | --------------------- | ----------------- | --------------------------------------------------------- |
| Header  | `bg-card/95` backdrop | `border-b` gold   | Sticky; logo left, 4 links right, active link = gold rule |
| Hero    | Photo + maroon overlay| —                 | Full-bleed group photo, gold badge, two CTAs              |
| Content | `bg-background`       | —                 | Sections separated by `bg-muted/40` bands + gold hairlines|
| Footer  | `bg-sidebar` (darker) | `border-t` gold   | Logo, org name, menu links, copyright                     |

## Spacing & Rhythm

Generous `py-20 md:py-28` section padding with `max-w-6xl` container; 8px base grid, `gap-6` card grids, `space-y-4` body groups, gold 2px rule under each section label.

## Component Patterns

- Buttons: `rounded-md`, gold `bg-primary` fill with maroon text; outline variant = gold border on transparent; hover lifts + `shadow-elevated`
- Cards: `rounded-lg bg-card border-border shadow-elevated`, gold top hairline, 24px padding
- Badges: pill `rounded-full`, gold background with maroon text for section labels; green outline variant for values

## Motion

- Entrance: `animate-fade-up` staggered 80ms per card, 0.5s ease-out
- Hover: cards translate `-translate-y-1` + shadow deepen, 0.3s smooth
- Decorative: slow `animate-float` on hero badge accent; respect `prefers-reduced-motion`

## Constraints

- Maroon is the base everywhere; never a white page with maroon accents
- Text on maroon must stay ≥ 4.5:1 — use `foreground` / `muted-foreground`, never raw white on `muted`
- Exactly four nav items: Beranda, Tentang Kami, Kontak, Galeri
- Accents (gold, green) are sparing — gold for actions/active, green for values only
- All content in Bahasa Indonesia; no news page, no admin panel

## Signature Detail

A continuous gold hairline rule that runs under every section label and along card tops — a quiet "official letterhead" motif that ties the whole page together.
