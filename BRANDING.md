# DealEat — Brand Guidelines

> **Find the best food deals in Baku.**  
> DealEat is a food delivery price comparison platform that helps users in Baku, Azerbaijan compare prices across Wolt, Bolt Food, Yango Deli, and direct restaurant ordering — all in one place.

---

## 1. Brand Identity

| Property | Value |
|---|---|
| **Name** | DealEat |
| **Stage** | BETA |
| **Market** | Baku, Azerbaijan |
| **Currency** | Azerbaijani Manat (₼) — always prefix, e.g. `₼12.50` |
| **Tagline** | *Find the best food deals in Baku* |

### Personality
- **Smart** — surfaces the best deal, not just the cheapest price
- **Friendly** — approachable tone, emoji used contextually
- **Practical** — no fluff; price, time, and score front and center
- **Local** — built for Baku, understands the city's delivery platforms

---

## 2. Logo

The logo is the primary visual identity of DealEat. It should always be used as-is — never recreated, recolored, or replaced with text.

| Usage | Size |
|---|---|
| Navbar / header | `h-16` (64 px tall, auto width) |
| Login / auth screens | `h-24` (96 px tall, auto width) |
| Favicon / app icon | Square crop of logo mark |

**Rules:**
- Always use the PNG asset (`DealEat-Logo.png`) with `object-contain`
- Maintain aspect ratio — never stretch
- On hover in the navbar, apply a subtle `scale-105` transition
- Always render on a dark or neutral background for contrast

---

## 3. Color Palette

### Brand Primary — Orange

The core brand color. Used on CTAs, active states, badges, and the "Best Deal" indicator.

| Token | OKLCH | Description |
|---|---|---|
| `--primary` | `oklch(0.71 0.19 45)` | Vibrant orange — buttons, rings, highlights |
| `--primary-glow` | `oklch(0.78 0.18 60)` | Lighter orange — gradients, hover glows |
| `--primary-foreground` | `oklch(1 0 0)` | White — text on primary backgrounds |

### UI Neutrals

| Token | OKLCH | Description |
|---|---|---|
| `--background` | `oklch(0.995 0.005 80)` | Off-white warm page background |
| `--foreground` | `oklch(0.18 0.02 40)` | Near-black body text |
| `--card` | `oklch(1 0 0)` | Pure white card surfaces |
| `--muted` | `oklch(0.965 0.01 70)` | Subtle fills, disabled states |
| `--muted-foreground` | `oklch(0.5 0.02 50)` | Secondary / caption text |
| `--border` | `oklch(0.92 0.01 70)` | Dividers and input borders |

### Semantic Colors

| Token | OKLCH | Usage |
|---|---|---|
| `--success` | `oklch(0.68 0.16 145)` | Confirmations, "Best Deal" badge |
| `--destructive` | `oklch(0.6 0.22 25)` | Errors, warnings |

### Platform Colors

Each delivery platform has a dedicated brand color used on badges, score bars, and order buttons.

| Platform | Token | OKLCH | Hex Approx. |
|---|---|---|---|
| 🔵 Wolt | `--wolt` | `oklch(0.62 0.18 240)` | Blue |
| 🟢 Bolt Food | `--bolt` | `oklch(0.72 0.18 155)` | Green |
| 🟠 Yango Deli | `--yango` | `oklch(0.72 0.19 30)` | Orange-red |
| 🟩 Direct Order | `--direct` | `oklch(0.64 0.18 145)` | Forest green |

### Gradients

| Name | Value | Usage |
|---|---|---|
| `--gradient-hero` | `135deg, oklch(0.78 0.18 60) → oklch(0.68 0.21 35)` | Hero banners, landing sections |
| `--gradient-warm` | `180deg, oklch(0.99 0.015 80) → oklch(0.96 0.04 70)` | Page section backgrounds |

---

## 4. Typography

| Role | Font | Weight |
|---|---|---|
| Display / headings | **Plus Jakarta Sans** | 600–700 |
| Body / UI | **Inter** | 400–500 |
| Fallback | `ui-sans-serif, system-ui, sans-serif` | — |

**Scale guidelines:**
- Page titles: `text-2xl` – `text-4xl`, `font-bold`
- Section headings: `text-lg` – `text-xl`, `font-semibold`
- Body: `text-sm` – `text-base`, `font-normal`
- Captions / labels: `text-xs`, `font-medium`, `tracking-wide`

---

## 5. Spacing & Radius

| Token | Value | Usage |
|---|---|---|
| `--radius` | `0.875rem` | Base radius |
| `--radius-sm` | `base − 4px` | Badges, chips |
| `--radius-lg` | `base` | Cards |
| `--radius-xl` | `base + 4px` | Modals, sheets |
| `--radius-2xl` | `base + 8px` | Large cards |
| `--radius-3xl` | `base + 12px` | Login card, hero elements |

---

## 6. Shadows

| Token | Usage |
|---|---|
| `--shadow-card` | Default restaurant cards |
| `--shadow-elevated` | Modals, drawers, floating panels |
| `--shadow-glow` | Primary CTA buttons on hover |

---

## 7. Key UI Patterns

### Deal Score Badge
- Range: **0 – 100**
- Best score on page: shown with `✅` and a **"Best Deal"** label
- Score bar: filled with platform color, empty track is `bg-muted`
- Score factors: Cost 45% · Speed 35% · Discount 20%, scaled by restaurant rating

### Platform Order Buttons
- Always sorted by Deal Score (best first)
- Color matches platform token
- Shows: platform name · delivery fee · estimated time
- "Direct Order" opens `tel:` or restaurant contact (green button)

### Price Display
- Always prefix with `₼` — never suffix with `AZN`
- Example: `₼12.50` ✅ — `12.50 AZN` ❌
- Two decimal places for all prices

### BETA Badge
```
text-[10px] font-semibold tracking-widest px-1.5 py-0.5 rounded-md
bg-primary text-primary-foreground
```

---

## 8. Navigation

| Label | Route | Style |
|---|---|---|
| Restaurants | `/` | Default nav pill |
| Map | `/restaurants` | Default nav pill |
| 🎲 Decide | `/decide` | `bg-primary/10 text-primary` |
| ✨ AI | `/ai` | Active: `bg-primary/10 text-primary` |
| Sign In | `/login` | — |

---

## 9. Voice & Tone

| Context | Tone |
|---|---|
| UI labels | Short, action-oriented ("Order Now", "Best Deal", "Continue") |
| Empty states | Friendly and helpful ("No restaurants found — try a different filter") |
| AI assistant | Conversational, uses Markdown, emojis, and ₼ prices |
| Error messages | Direct, non-technical, always suggest next step |

**Always write in English.** Azerbaijani text is limited to restaurant/dish names and neighborhood names.

---

## 10. Delivery Platforms — Market Context

| Platform | Positioning | Typical Fee |
|---|---|---|
| **Wolt** | Premium, fastest delivery, frequent promos | ₼2.0 – ₼3.5 |
| **Bolt Food** | Budget-friendly, widest coverage | ₼1.5 – ₼2.5 |
| **Yango Deli** | Mid-range, local focus | ₼1.7 – ₼2.8 |
| **Direct Order** | No commission, restaurant's own delivery | ₼0.0 – ₼1.5 |

---

*DealEat — BETA · Baku, Azerbaijan*
