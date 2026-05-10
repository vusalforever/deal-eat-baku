import { Link } from "@tanstack/react-router";
import { Clock, Star, Bike, ExternalLink } from "lucide-react";
import { cheapestPlatform, platformMeta, type Restaurant, type Platform } from "@/data/restaurants";
import { PriceBadge } from "./PriceBadge";

export function RestaurantCard({ restaurant }: { restaurant: Restaurant }) {
  const cheapest = cheapestPlatform(restaurant.popularPrice);
  const minFee = Math.min(...Object.values(restaurant.fees) as number[]);
  const platforms = Object.keys(restaurant.popularPrice) as Platform[];
  const cheapestUrl = cheapest ? platformMeta[cheapest].url : "#";
  const cheapestLabel = cheapest ? platformMeta[cheapest].label : "";

  return (
    <Link
      to="/restaurants/$id"
      params={{ id: restaurant.id }}
      className="group block rounded-3xl bg-card border border-border overflow-hidden shadow-[var(--shadow-card)] hover:shadow-[var(--shadow-elevated)] hover:-translate-y-1 transition-all duration-300"
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

      <div className="p-4 space-y-3">
        <div>
          <div className="flex items-baseline justify-between gap-2">
            <h3 className="font-display font-semibold text-lg leading-tight truncate">{restaurant.name}</h3>
            <span className="text-xs text-muted-foreground shrink-0">{restaurant.cuisine}</span>
          </div>
          <p className="text-sm text-muted-foreground line-clamp-1 mt-0.5">{restaurant.tagline}</p>
        </div>

        <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
          <Bike className="size-3.5" />
          Çatdırılma {minFee.toFixed(2)} AZN-dən
        </div>

        <div className="space-y-1.5 pt-1">
          <p className="text-[11px] uppercase tracking-wider text-muted-foreground font-medium">Populyar yemək</p>
          <div className="grid grid-cols-1 gap-1.5">
            {platforms.map((p) => (
              <PriceBadge
                key={p}
                platform={p}
                price={restaurant.popularPrice[p]!}
                cheapest={p === cheapest}
                size="sm"
              />
            ))}
          </div>
        </div>
      </div>
    </Link>
  );
}
