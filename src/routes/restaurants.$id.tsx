import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, Star, Clock, Bike, ExternalLink, TrendingDown } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { PriceBadge } from "@/components/PriceBadge";
import { cheapestPlatform, getRestaurant, platformMeta, type Platform, type Restaurant } from "@/data/restaurants";

export const Route = createFileRoute("/restaurants/$id")({
  head: ({ params }) => {
    const r = getRestaurant(params.id);
    return {
      meta: [
        { title: r ? `${r.name} — DealEat` : "Restoran — DealEat" },
        { name: "description", content: r?.tagline ?? "Restoran qiymət müqayisəsi" },
      ],
    };
  },
  loader: ({ params }): Restaurant => {
    const r = getRestaurant(params.id);
    if (!r) throw notFound();
    return r;
  },
  notFoundComponent: () => (
    <div className="min-h-screen grid place-items-center">
      <div className="text-center">
        <h1 className="font-display text-3xl font-bold">Restoran tapılmadı</h1>
        <Link to="/restaurants" className="text-primary mt-4 inline-block">← Restoranlara qayıt</Link>
      </div>
    </div>
  ),
  errorComponent: ({ error }) => (
    <div className="min-h-screen grid place-items-center text-center px-4">
      <div>
        <h1 className="font-display text-2xl font-bold">Xəta baş verdi</h1>
        <p className="text-muted-foreground mt-2">{error.message}</p>
      </div>
    </div>
  ),
  component: RestaurantDetail,
});

function RestaurantDetail() {
  const restaurant = Route.useLoaderData() as Restaurant;
  const platforms = Object.keys(restaurant.popularPrice) as Platform[];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero */}
      <div className="relative h-64 md:h-80 overflow-hidden">
        <img src={restaurant.image} alt={restaurant.name} className="size-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
        <div className="container mx-auto px-4 absolute inset-0 flex flex-col justify-end pb-6">
          <Link to="/restaurants" className="inline-flex items-center gap-1.5 text-sm text-foreground/80 hover:text-foreground mb-4 w-fit">
            <ArrowLeft className="size-4" />
            Restoranlar
          </Link>
          <div className="flex items-end justify-between gap-4 flex-wrap">
            <div>
              <p className="text-sm text-muted-foreground">{restaurant.cuisine}</p>
              <h1 className="font-display font-bold text-3xl md:text-5xl">{restaurant.name}</h1>
              <p className="text-muted-foreground mt-1">{restaurant.tagline}</p>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <span className="inline-flex items-center gap-1 rounded-full bg-card border border-border px-3 py-1.5">
                <Star className="size-4 fill-primary text-primary" /> {restaurant.rating}
              </span>
              <span className="inline-flex items-center gap-1 rounded-full bg-card border border-border px-3 py-1.5">
                <Clock className="size-4" /> {restaurant.deliveryMin} dəq
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 grid lg:grid-cols-[1fr_360px] gap-8">
        {/* Menu */}
        <div className="space-y-4">
          <h2 className="font-display font-bold text-2xl">Menyu — qiymət müqayisəsi</h2>
          <div className="space-y-4">
            {restaurant.menu.map((item) => {
              const cheapest = cheapestPlatform(item.prices);
              const itemPlatforms = Object.keys(item.prices) as Platform[];
              const cheapestPrice = item.prices[cheapest!]!;
              const maxPrice = Math.max(...(Object.values(item.prices) as number[]));
              const savings = ((maxPrice - cheapestPrice) / maxPrice) * 100;

              return (
                <div key={item.id} className="rounded-3xl bg-card border border-border overflow-hidden shadow-[var(--shadow-card)]">
                  <div className="grid md:grid-cols-[200px_1fr]">
                    <div className="aspect-square md:aspect-auto bg-muted">
                      <img src={item.image} alt={item.name} loading="lazy" className="size-full object-cover" />
                    </div>
                    <div className="p-5 space-y-4">
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <h3 className="font-display font-semibold text-xl">{item.name}</h3>
                          <p className="text-sm text-muted-foreground mt-1">{item.description}</p>
                        </div>
                        {savings > 1 && (
                          <span className="shrink-0 inline-flex items-center gap-1 rounded-full bg-success/10 text-success text-xs font-bold px-2.5 py-1">
                            <TrendingDown className="size-3" />
                            {savings.toFixed(0)}% qənaət
                          </span>
                        )}
                      </div>
                      <div className="grid sm:grid-cols-3 gap-2">
                        {itemPlatforms.map((p) => (
                          <PriceBadge key={p} platform={p} price={item.prices[p]!} cheapest={p === cheapest} />
                        ))}
                      </div>
                      <Button asChild variant="default" className="w-full sm:w-auto rounded-xl gap-2 font-semibold">
                        <a href={platformMeta[cheapest!].url} target="_blank" rel="noreferrer">
                          {platformMeta[cheapest!].label} ilə {cheapestPrice.toFixed(2)} AZN-ə sifariş et
                          <ExternalLink className="size-4" />
                        </a>
                      </Button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Sidebar */}
        <aside className="space-y-4 lg:sticky lg:top-24 self-start">
          <div className="rounded-3xl bg-card border border-border p-5 shadow-[var(--shadow-card)]">
            <h3 className="font-display font-semibold text-lg mb-4">Çatdırılma haqqı</h3>
            <div className="space-y-2">
              {platforms.map((p) => (
                <div key={p} className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <span className="size-2 rounded-full" style={{ backgroundColor: platformMeta[p].color }} />
                    {platformMeta[p].label}
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Bike className="size-3.5 text-muted-foreground" />
                    <span className="font-medium tabular-nums">{restaurant.fees[p]!.toFixed(2)} AZN</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-3xl bg-gradient-to-br from-primary to-[var(--primary-glow)] text-primary-foreground p-5 shadow-[var(--shadow-glow)]">
            <h3 className="font-display font-semibold text-lg">Ən sərfəli sifariş</h3>
            <p className="text-sm opacity-90 mt-1">
              Bütün menyu üzrə hesablanmış ortalama ən aşağı qiyməti seçirik.
            </p>
            <Button asChild variant="secondary" className="w-full mt-4 rounded-xl font-semibold gap-2">
              <a
                href={platformMeta[cheapestPlatform(restaurant.popularPrice)!].url}
                target="_blank"
                rel="noreferrer"
              >
                İndi sifariş et
                <ExternalLink className="size-4" />
              </a>
            </Button>
          </div>
        </aside>
      </div>
    </div>
  );
}
