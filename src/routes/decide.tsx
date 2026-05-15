import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Heart, X, ExternalLink, MapPin, Star, Sparkles } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import {
  restaurants,
  platformMeta,
  categoryEmoji,
  type Platform,
  type Restaurant,
  type MenuItem,
} from "@/data/restaurants";

export const Route = createFileRoute("/decide")({
  head: () => ({
    meta: [
      { title: "Qərar ver — DealEat Bakı" },
      {
        name: "description",
        content: "Tinder-tipli qərar oyunu — yemək seç, ən ucuz platformadan sifariş et.",
      },
    ],
  }),
  component: DecidePage,
});

const ROTATION: Platform[] = ["wolt", "bolt", "yango"];

// Map of category -> gradient classes (background mood)
const categoryGradient: Record<string, string> = {
  Burger: "from-amber-400 via-orange-500 to-rose-500",
  Pizza: "from-red-400 via-rose-500 to-orange-500",
  Döner: "from-yellow-400 via-amber-500 to-orange-500",
  Kabab: "from-rose-500 via-red-600 to-amber-600",
  Qəhvə: "from-amber-700 via-amber-600 to-orange-700",
  Pide: "from-orange-400 via-amber-500 to-yellow-500",
  Şirniyyat: "from-pink-400 via-rose-400 to-fuchsia-500",
  Çörək: "from-amber-300 via-yellow-400 to-orange-400",
  Balıq: "from-sky-400 via-cyan-500 to-blue-500",
  Toyuq: "from-yellow-300 via-amber-400 to-orange-400",
  "Fast Food": "from-red-500 via-orange-500 to-yellow-500",
};

type Card = {
  restaurant: Restaurant;
  item: MenuItem;
  platform: Platform;
  price: number;
  isCheapest: boolean;
  distanceKm: number;
};

function buildDeck(): Card[] {
  // For each restaurant pick a random menu item, rotate platform per card.
  const shuffled = [...restaurants].sort(() => Math.random() - 0.5);
  const deck: Card[] = [];
  shuffled.forEach((r, idx) => {
    const platform = ROTATION[idx % ROTATION.length];
    // Pick first menu item that has that platform price; fallback to any
    const candidates = r.menu.filter((m) => m.prices[platform] != null);
    const item = (candidates.length ? candidates : r.menu)[
      Math.floor(Math.random() * (candidates.length || r.menu.length))
    ];
    if (!item) return;
    const price = item.prices[platform] ?? Math.min(...Object.values(item.prices) as number[]);
    const cheapestVal = Math.min(...Object.values(item.prices) as number[]);
    const isCheapest = price === cheapestVal;
    // Deterministic-ish distance from city center based on coords
    const dx = (r.coords.x - 50) / 10;
    const dy = (r.coords.y - 50) / 10;
    const distanceKm = Math.max(0.4, Math.round(Math.sqrt(dx * dx + dy * dy) * 10) / 10);
    deck.push({ restaurant: r, item, platform, price, isCheapest, distanceKm });
  });
  return deck;
}

function DecidePage() {
  const [deck, setDeck] = useState<Card[]>(() => buildDeck());
  const [index, setIndex] = useState(0);
  const [exitDir, setExitDir] = useState<"left" | "right" | null>(null);

  const current = deck[index];
  const next = deck[index + 1];

  const advance = (dir: "left" | "right") => {
    setExitDir(dir);
    setTimeout(() => {
      if (index + 1 >= deck.length) {
        // Reshuffle and continue rotation seamlessly
        setDeck(buildDeck());
        setIndex(0);
      } else {
        setIndex((i) => i + 1);
      }
      setExitDir(null);
    }, 280);
  };

  const platformBg: Record<Platform, string> = useMemo(
    () => ({
      wolt: "bg-[color:var(--wolt)]",
      bolt: "bg-[color:var(--bolt)]",
      yango: "bg-[color:var(--yango)]",
    }),
    []
  );
  const platformEmoji: Record<Platform, string> = {
    wolt: "🔵",
    bolt: "🟢",
    yango: "🔴",
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-4 py-6 md:py-10 max-w-md">
        <div className="text-center mb-6">
          <h1 className="font-display font-bold text-3xl flex items-center justify-center gap-2">
            <Sparkles className="size-6 text-primary" />
            Qərar ver
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            Yemək kartını seç və ya növbətiyə keç
          </p>
        </div>

        <div className="relative h-[560px]">
          {next && (
            <CardView
              key={`next-${index + 1}`}
              card={next}
              gradient={
                categoryGradient[next.restaurant.categories[0]] ??
                "from-orange-400 to-rose-500"
              }
              platformBg={platformBg}
              platformEmoji={platformEmoji}
              behind
            />
          )}
          {current && (
            <CardView
              key={`cur-${index}`}
              card={current}
              gradient={
                categoryGradient[current.restaurant.categories[0]] ??
                "from-orange-400 to-rose-500"
              }
              platformBg={platformBg}
              platformEmoji={platformEmoji}
              exitDir={exitDir}
            />
          )}
        </div>

        <div className="flex items-center justify-center gap-6 mt-6">
          <button
            type="button"
            onClick={() => advance("left")}
            aria-label="Keç"
            className="grid place-items-center size-16 rounded-full bg-card border-2 border-border shadow-[var(--shadow-card)] hover:scale-110 active:scale-95 transition"
          >
            <X className="size-7 text-muted-foreground" />
          </button>
          <button
            type="button"
            onClick={() => advance("right")}
            aria-label="Bəyən"
            className="grid place-items-center size-16 rounded-full bg-gradient-to-br from-rose-500 to-pink-600 text-white shadow-[var(--shadow-glow)] hover:scale-110 active:scale-95 transition"
          >
            <Heart className="size-7 fill-white" />
          </button>
        </div>
      </div>
    </div>
  );
}

function CardView({
  card,
  gradient,
  platformBg,
  platformEmoji,
  exitDir,
  behind,
}: {
  card: Card;
  gradient: string;
  platformBg: Record<Platform, string>;
  platformEmoji: Record<Platform, string>;
  exitDir?: "left" | "right" | null;
  behind?: boolean;
}) {
  const meta = platformMeta[card.platform];
  const emoji = categoryEmoji[card.restaurant.categories[0]] ?? "🍽️";

  const exitClass =
    exitDir === "left"
      ? "-translate-x-[120%] -rotate-12 opacity-0"
      : exitDir === "right"
      ? "translate-x-[120%] rotate-12 opacity-0"
      : "";

  return (
    <div
      className={`absolute inset-0 rounded-3xl overflow-hidden border border-border bg-card shadow-[var(--shadow-elevated)] transition-all duration-300 ${
        behind ? "scale-95 opacity-60 translate-y-3" : "z-10"
      } ${exitClass}`}
    >
      {/* Hero gradient with emoji */}
      <div
        className={`relative h-56 bg-gradient-to-br ${gradient} flex items-center justify-center`}
      >
        <div className="text-[120px] leading-none drop-shadow-2xl select-none">
          {emoji}
        </div>
        <div className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-black/30 backdrop-blur text-white text-xs font-medium">
          {card.restaurant.categories[0]}
        </div>
      </div>

      {/* Content */}
      <div className="p-5 space-y-4">
        <div>
          <h2 className="font-display font-bold text-2xl leading-tight">
            {card.item.name}
          </h2>
          <p className="text-base font-medium text-foreground/80 mt-1">
            {card.restaurant.name}
          </p>
          <p className="text-sm text-muted-foreground line-clamp-2 mt-1">
            {card.item.description}
          </p>
        </div>

        <div className="flex items-center gap-3 text-sm text-muted-foreground">
          <span className="inline-flex items-center gap-1">
            <MapPin className="size-4" /> {card.distanceKm} km
          </span>
          <span>·</span>
          <span className="inline-flex items-center gap-1">
            <Star className="size-4 fill-amber-500 text-amber-500" />
            {card.restaurant.rating}
          </span>
        </div>

        <div
          className={`inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-white text-sm font-semibold ${platformBg[card.platform]}`}
        >
          <span>{platformEmoji[card.platform]}</span>
          <span>{meta.label}</span>
          <span>·</span>
          <span>{card.price.toFixed(2)} AZN</span>
          {card.isCheapest && (
            <span className="ml-1 px-2 py-0.5 rounded-full bg-emerald-500 text-[10px] font-bold tracking-wide">
              ƏN UCUZ
            </span>
          )}
        </div>

        <a
          href={meta.url}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full inline-flex items-center justify-center gap-2 rounded-2xl bg-primary text-primary-foreground font-bold py-4 text-base hover:opacity-90 transition shadow-[var(--shadow-glow)]"
        >
          Sifariş Ver · {card.price.toFixed(2)} AZN
          <ExternalLink className="size-4" />
        </a>
      </div>
    </div>
  );
}
