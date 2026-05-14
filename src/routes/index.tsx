import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useRef, useState } from "react";
import { MapPin, ExternalLink } from "lucide-react";
import { toast } from "sonner";
import { Navbar } from "@/components/Navbar";
import { EmojiCategoryBar } from "@/components/EmojiCategoryBar";
import { RestaurantCard } from "@/components/RestaurantCard";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import {
  restaurants,
  cheapestPlatform,
  platformMeta,
  neighborhoods,
  type CategoryKey,
  type Restaurant,
} from "@/data/restaurants";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Restoranlar — DealEat Bakı" },
      {
        name: "description",
        content:
          "Bakıdakı restoranları kateqoriya və ünvana görə tap, Wolt, Bolt Food və Yango Deli qiymətlərini müqayisə et.",
      },
    ],
  }),
  component: RestaurantsHome,
});

function RestaurantsHome() {
  const [address, setAddress] = useState("");
  const [activeCategory, setActiveCategory] = useState<CategoryKey | undefined>();
  const [hovered, setHovered] = useState<string | undefined>();

  const filtered = useMemo(() => {
    const a = address.trim().toLowerCase();
    const matchedNb = a
      ? neighborhoods.find((n) => n.toLowerCase().includes(a) || a.includes(n.toLowerCase()))
      : undefined;
    return restaurants.filter((r) => {
      if (activeCategory && !r.categories.includes(activeCategory)) return false;
      if (a) {
        if (matchedNb) {
          if (r.neighborhood !== matchedNb) return false;
        } else {
          const haystack = `${r.name} ${r.cuisine} ${r.tagline} ${r.neighborhood}`.toLowerCase();
          if (!haystack.includes(a)) return false;
        }
      }
      return true;
    });
  }, [activeCategory, address]);

  const [spotlightId, setSpotlightId] = useState<string | undefined>();
  const [deciding, setDeciding] = useState(false);
  const [picked, setPicked] = useState<Restaurant | null>(null);
  const cardRefs = useRef<Record<string, HTMLDivElement | null>>({});

  const handleDecide = () => {
    if (!filtered.length || deciding) {
      if (!filtered.length) toast.error("Seçim üçün restoran yoxdur.");
      return;
    }
    setDeciding(true);
    setPicked(null);
    const finalIdx = Math.floor(Math.random() * filtered.length);
    let i = 0;
    const total = 16 + finalIdx;
    const tick = () => {
      const idx = i % filtered.length;
      setSpotlightId(filtered[idx].id);
      i++;
      if (i <= total) {
        setTimeout(tick, 80 + i * 12);
      } else {
        const chosen = filtered[finalIdx];
        setSpotlightId(chosen.id);
        cardRefs.current[chosen.id]?.scrollIntoView({ behavior: "smooth", block: "center" });
        setTimeout(() => {
          setPicked(chosen);
          setDeciding(false);
        }, 600);
      }
    };
    tick();
  };

  const pickedCheapest = picked ? cheapestPlatform(picked.popularPrice) : null;
  const pickedMeta = pickedCheapest ? platformMeta[pickedCheapest] : null;

  return (
    <div className="min-h-screen bg-background">
      <Navbar onDecide={handleDecide} deciding={deciding} />

      <div className="container mx-auto px-4 py-6 md:py-8 space-y-6">
        {/* Address input */}
        <div className="flex items-center gap-2 rounded-2xl border border-border bg-card px-4 py-3 shadow-[var(--shadow-card)] focus-within:border-primary/60 transition-colors">
          <MapPin className="size-5 text-primary shrink-0" />
          <input
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder="📍 Ünvanınızı daxil edin (Yasamal, Nəsimi, 28 May...)"
            className="flex-1 bg-transparent outline-none text-base placeholder:text-muted-foreground"
          />
        </div>

        {/* Emoji category circles */}
        <EmojiCategoryBar active={activeCategory} onSelect={setActiveCategory} />

        {/* Pill category filter */}
        <div className="-mx-4">
          <CategoryBar active={activeCategory} onSelect={setActiveCategory} />
        </div>

        <div className="flex items-baseline justify-between">
          <h2 className="font-display font-bold text-2xl">
            {filtered.length} restoran tapıldı
            {activeCategory ? ` · ${activeCategory}` : ""}
          </h2>
          <p className="text-sm text-muted-foreground">Qiymətlər real vaxtda yenilənir</p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map((r) => {
            const isSpot = spotlightId === r.id;
            return (
              <div
                key={r.id}
                ref={(el) => {
                  cardRefs.current[r.id] = el;
                }}
                onMouseEnter={() => setHovered(r.id)}
                onMouseLeave={() => setHovered(undefined)}
                className={`rounded-3xl transition-all duration-200 ${
                  isSpot
                    ? "ring-4 ring-primary ring-offset-2 ring-offset-background scale-[1.03] shadow-[var(--shadow-glow)] animate-pulse"
                    : ""
                }`}
              >
                <RestaurantCard restaurant={r} />
              </div>
            );
          })}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-20 text-muted-foreground">
            Bu kateqoriyaya uyğun restoran tapılmadı.
          </div>
        )}
      </div>

      <Dialog
        open={!!picked}
        onOpenChange={(o) => {
          if (!o) {
            setPicked(null);
            setSpotlightId(undefined);
          }
        }}
      >
        <DialogContent className="sm:max-w-md text-center">
          <DialogHeader>
            <div className="mx-auto text-6xl mb-2 animate-bounce">🎲</div>
            <DialogTitle className="font-display text-2xl">
              Bu gün sənin seçimin
            </DialogTitle>
            <DialogDescription className="text-base">
              {picked && pickedMeta ? (
                <>
                  <span className="block text-2xl font-bold text-foreground mt-3">
                    {picked.name}
                  </span>
                  <span className="block mt-2 text-muted-foreground">
                    <span className="font-semibold text-primary">{pickedMeta.label}</span>
                    -dan sifariş ver!
                  </span>
                </>
              ) : null}
            </DialogDescription>
          </DialogHeader>
          {picked && pickedMeta && (
            <a
              href={pickedMeta.url}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 inline-flex items-center justify-center gap-2 rounded-full bg-primary text-primary-foreground font-semibold py-3 px-6 hover:opacity-90 transition shadow-[var(--shadow-glow)]"
            >
              Sifariş et — {pickedMeta.label}
              <ExternalLink className="size-4" />
            </a>
          )}
        </DialogContent>
      </Dialog>

      {/* hovered is reserved for future map sync */}
      <span className="hidden">{hovered}</span>
    </div>
  );
}
