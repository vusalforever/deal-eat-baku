import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowRight, MapPin, Sparkles, TrendingDown, Zap, ShieldCheck } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import heroImg from "@/assets/hero-baku.jpg";
import { platformMeta } from "@/data/restaurants";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "DealEat — Bakıda ən ucuz yemək çatdırılması" },
      {
        name: "description",
        content:
          "Wolt, Bolt Food və Yango Deli qiymətlərini bir yerdə müqayisə edin və Bakıda ən sərfəli sifariş seçin.",
      },
      { property: "og:title", content: "DealEat — Bakı Yemək Kəşfi" },
      { property: "og:description", content: "Bakıda yemək çatdırılması üçün ən ucuz qiymətlər." },
    ],
  }),
  component: Landing,
});

function Landing() {
  const [address, setAddress] = useState("Nizami küç. 25, Bakı");
  const navigate = useNavigate();

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate({ to: "/restaurants", search: { address } });
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar address={address} onAddressChange={setAddress} />

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div
          className="absolute inset-0 -z-10"
          style={{
            background: "var(--gradient-warm)",
          }}
        />
        <div className="container mx-auto px-4 pt-12 pb-20 md:pt-20 md:pb-28 grid lg:grid-cols-[1.1fr_1fr] gap-12 items-center">
          <div className="space-y-7 max-w-xl">
            <span className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-xs font-medium text-primary">
              <Sparkles className="size-3.5" />
              Bakı üçün №1 qiymət müqayisəsi
            </span>
            <h1 className="font-display font-bold text-4xl md:text-6xl leading-[1.05] tracking-tight">
              Bakıda{" "}
              <span className="bg-gradient-to-r from-primary to-[var(--primary-glow)] bg-clip-text text-transparent">
                ən ucuz
              </span>{" "}
              yemək çatdırılmasını tapın.
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Wolt, Bolt Food və Yango Deli qiymətlərini bir ekranda müqayisə edin. Eyni restoran, ən sərfəli platforma — bir kliklə.
            </p>

            <form
              onSubmit={submit}
              className="flex flex-col sm:flex-row gap-2 p-2 rounded-2xl bg-card border border-border shadow-[var(--shadow-elevated)]"
            >
              <div className="flex flex-1 items-center gap-2 px-3">
                <MapPin className="size-5 text-primary shrink-0" />
                <input
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="Ünvanınızı daxil edin..."
                  className="flex-1 bg-transparent outline-none text-base py-2 placeholder:text-muted-foreground"
                />
              </div>
              <Button type="submit" size="lg" className="rounded-xl gap-2 h-12 px-6 font-semibold">
                Restoranları gör
                <ArrowRight className="size-4" />
              </Button>
            </form>

            <div className="flex items-center gap-6 pt-2">
              {(Object.keys(platformMeta) as Array<keyof typeof platformMeta>).map((p) => (
                <div key={p} className="flex items-center gap-2 text-sm text-muted-foreground">
                  <span className="size-2.5 rounded-full" style={{ backgroundColor: platformMeta[p].color }} />
                  {platformMeta[p].label}
                </div>
              ))}
            </div>
          </div>

          <div className="relative">
            <div className="absolute -inset-6 rounded-[2.5rem] bg-gradient-to-br from-primary/20 to-[var(--primary-glow)]/10 blur-3xl -z-10" />
            <div className="relative rounded-[2rem] overflow-hidden border border-border shadow-[var(--shadow-elevated)]">
              <img src={heroImg} alt="Bakı şəhəri" width={1600} height={1024} className="w-full h-[420px] object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />

              {/* Floating price comparison card */}
              <div className="absolute bottom-5 left-5 right-5 rounded-2xl bg-card/95 backdrop-blur-xl border border-border p-4 shadow-[var(--shadow-elevated)]">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <p className="text-xs text-muted-foreground">Quzu Plov · Firuzə</p>
                    <p className="font-display font-semibold">3 platforma müqayisəsi</p>
                  </div>
                  <span className="rounded-full bg-success/10 text-success text-xs font-bold px-2 py-1">−11%</span>
                </div>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { p: "wolt", v: 14.5 },
                    { p: "bolt", v: 12.9, best: true },
                    { p: "yango", v: 13.8 },
                  ].map((x) => (
                    <div
                      key={x.p}
                      className={`rounded-xl p-2 text-center border ${x.best ? "border-success bg-success/5" : "border-border"}`}
                    >
                      <div className="text-[10px] uppercase tracking-wider text-muted-foreground">{platformMeta[x.p as keyof typeof platformMeta].label}</div>
                      <div className="font-display font-semibold tabular-nums">{x.v.toFixed(2)}</div>
                      <div className="text-[10px] text-muted-foreground">AZN</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="container mx-auto px-4 py-16 md:py-24">
        <div className="grid md:grid-cols-3 gap-5">
          {[
            { icon: TrendingDown, title: "Ən ucuz qiymət", desc: "Hər yemək üçün üç platformanın qiymətini müqayisə edib ən sərfəlisini göstəririk." },
            { icon: Zap, title: "Bir klik sifariş", desc: "Sevdiyiniz platformanın səhifəsinə birbaşa keçid — vaxt itirməyin." },
            { icon: ShieldCheck, title: "Şəffaf və dürüst", desc: "Çatdırılma haqqı və minimum sifariş — gizli ödəniş yoxdur." },
          ].map((f) => (
            <div key={f.title} className="rounded-3xl bg-card border border-border p-6 shadow-[var(--shadow-card)] hover:shadow-[var(--shadow-elevated)] transition-shadow">
              <div className="size-12 rounded-2xl bg-primary/10 grid place-items-center text-primary mb-4">
                <f.icon className="size-6" />
              </div>
              <h3 className="font-display font-semibold text-lg mb-2">{f.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <footer className="border-t border-border">
        <div className="container mx-auto px-4 py-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">© 2026 DealEat · Bakı, Azərbaycan</p>
          <p className="text-xs text-muted-foreground">DealEat Wolt, Bolt Food və Yango Deli ilə əlaqəli deyil.</p>
        </div>
      </footer>
    </div>
  );
}
