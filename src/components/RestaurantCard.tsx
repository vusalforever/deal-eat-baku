import { useState } from "react";
import { Clock, Star, MapPin, ExternalLink } from "lucide-react";
import { cheapestPlatform, platformMeta, type Restaurant, type Platform } from "@/data/restaurants";
import { RestaurantSheet } from "./RestaurantSheet";

export function RestaurantCard({ restaurant }: { restaurant: Restaurant }) {
  const [open, setOpen] = useState(false);
  const cheapestFee = cheapestPlatform(restaurant.fees);
  const platforms = Object.keys(restaurant.fees) as Platform[];
  const cheapestUrl = cheapestFee ? platformMeta[cheapestFee].url : "#";
  const cheapestLabel = cheapestFee ? platformMeta[cheapestFee].label : "";

  return (
    <>
      <div className="group flex flex-col rounded-3xl bg-card border border-border overflow-hidden shadow-[var(--shadow-card)] hover:shadow-[var(--shadow-elevated)] hover:-translate-y-1 transition-all duration-300">
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="block text-left"
        >
          <div className="relative aspect-[4/3] overflow-hidden bg-muted">
            <img
              src={restaurant.image}
              alt={restaurant.name}
              loading="lazy"
              className="size-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute top-3 left-3 inline-flex items-center gap-1 rounded-full bg-background/95 backdrop-blur px-2.5 py-1 text-xs font-medium shadow-sm">
              <Star className="size-3 fill-primary text-primary" />
              {restaurant.rating}
            </div>
            <div className="absolute top-3 right-3 inline-flex items-center gap-1 rounded-full bg-background/95 backdrop-blur px-2.5 py-1 text-xs font-medium shadow-sm">
              <Clock className="size-3" /> {restaurant.deliveryMin} dəq
            </div>
          </div>
        </button>

        <div className="p-4 space-y-3 flex-1 flex flex-col">
          <button
            type="button"
            onClick={() => setOpen(true)}
            className="block text-left"
          >
            <div className="flex items-baseline justify-between gap-2">
              <h3 className="font-display font-semibold text-lg leading-tight truncate">{restaurant.name}</h3>
              <span className="text-xs text-muted-foreground shrink-0">{restaurant.cuisine}</span>
            </div>
            <p className="text-sm text-muted-foreground line-clamp-1 mt-0.5">{restaurant.tagline}</p>
            <div className="flex items-center gap-1 text-xs text-muted-foreground mt-1">
              <MapPin className="size-3" /> {restaurant.neighborhood}
            </div>
          </button>

          <div className="space-y-1.5 pt-1">
            <p className="text-[11px] uppercase tracking-wider text-muted-foreground font-medium">Çatdırılma haqqı</p>
            <div className="grid grid-cols-1 gap-1.5">
              {platforms.map((p) => {
                const isCheap = p === cheapestFee;
                return (
                  <div
                    key={p}
                    className={`flex items-center justify-between rounded-xl border px-3 py-2 text-sm transition ${
                      isCheap ? "border-success/40 bg-success/5" : "border-border bg-card"
                    }`}
                  >
                    <span className="flex items-center gap-2">
                      <span
                        className="size-2.5 rounded-full"
                        style={{ backgroundColor: platformMeta[p].color }}
                      />
                      <span className="font-medium">{platformMeta[p].label}</span>
                    </span>
                    <span className="flex items-center gap-1.5">
                      <span className="font-display font-semibold tabular-nums">
                        {restaurant.fees[p]!.toFixed(2)}
                      </span>
                      <span className="text-xs text-muted-foreground">AZN</span>
                      {isCheap && <span className="ml-1 text-success">✅</span>}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          <a
            href={cheapestUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="mt-auto inline-flex items-center justify-center gap-1.5 rounded-full bg-primary text-primary-foreground font-semibold text-sm py-2.5 hover:opacity-90 transition shadow-[var(--shadow-glow)]"
          >
            Sifariş et — {cheapestLabel}
            <ExternalLink className="size-3.5" />
          </a>
        </div>
      </div>

      <RestaurantSheet restaurant={restaurant} open={open} onOpenChange={setOpen} />
    </>
  );
}

