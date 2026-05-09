import { MapPin } from "lucide-react";
import { restaurants } from "@/data/restaurants";

export function MapView({ activeId }: { activeId?: string }) {
  return (
    <div className="relative w-full aspect-[16/10] md:aspect-[16/9] rounded-3xl overflow-hidden border border-border bg-secondary shadow-[var(--shadow-card)]">
      {/* Stylized map background */}
      <svg className="absolute inset-0 size-full" viewBox="0 0 800 500" preserveAspectRatio="xMidYMid slice" aria-hidden>
        <defs>
          <linearGradient id="bay" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="oklch(0.88 0.05 220)" />
            <stop offset="100%" stopColor="oklch(0.78 0.08 230)" />
          </linearGradient>
          <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="oklch(0.9 0.02 70)" strokeWidth="1" />
          </pattern>
        </defs>
        <rect width="800" height="500" fill="oklch(0.97 0.02 80)" />
        <rect width="800" height="500" fill="url(#grid)" />
        {/* Caspian bay */}
        <path d="M 500 500 Q 600 350 800 320 L 800 500 Z" fill="url(#bay)" />
        <path d="M 0 420 Q 200 380 400 420 L 400 500 L 0 500 Z" fill="oklch(0.94 0.03 110)" opacity="0.6" />
        {/* Roads */}
        <path d="M 0 200 Q 300 180 800 240" stroke="oklch(0.85 0.02 70)" strokeWidth="6" fill="none" />
        <path d="M 200 0 Q 250 250 180 500" stroke="oklch(0.85 0.02 70)" strokeWidth="6" fill="none" />
        <path d="M 600 0 Q 550 250 620 500" stroke="oklch(0.85 0.02 70)" strokeWidth="4" fill="none" />
        <path d="M 0 350 L 800 380" stroke="oklch(0.85 0.02 70)" strokeWidth="4" fill="none" />
      </svg>

      {/* User location */}
      <div className="absolute" style={{ left: "50%", top: "50%", transform: "translate(-50%, -50%)" }}>
        <div className="relative">
          <div className="absolute inset-0 rounded-full bg-primary/30 animate-ping" style={{ width: 40, height: 40, marginLeft: -20, marginTop: -20 }} />
          <div className="size-5 rounded-full bg-primary border-[3px] border-background shadow-lg" />
        </div>
      </div>

      {/* Restaurant pins */}
      {restaurants.map((r) => {
        const active = r.id === activeId;
        return (
          <button
            key={r.id}
            className="absolute -translate-x-1/2 -translate-y-full group"
            style={{ left: `${r.coords.x}%`, top: `${r.coords.y}%` }}
            aria-label={r.name}
          >
            <div
              className={`flex items-center gap-1.5 rounded-full pl-1 pr-3 py-1 shadow-[var(--shadow-card)] border transition-all ${
                active
                  ? "bg-primary text-primary-foreground border-primary scale-110"
                  : "bg-background border-border group-hover:scale-105 group-hover:border-primary/50"
              }`}
            >
              <span className={`grid place-items-center size-6 rounded-full ${active ? "bg-primary-foreground/20" : "bg-primary/10"}`}>
                <MapPin className={`size-3.5 ${active ? "text-primary-foreground" : "text-primary"}`} />
              </span>
              <span className="text-xs font-semibold whitespace-nowrap max-w-[120px] truncate">{r.name}</span>
            </div>
            <div className={`mx-auto -mt-0.5 size-2 rotate-45 ${active ? "bg-primary" : "bg-background border-r border-b border-border"}`} />
          </button>
        );
      })}

      <div className="absolute bottom-3 left-3 inline-flex items-center gap-1.5 rounded-full bg-background/95 backdrop-blur px-3 py-1.5 text-xs font-medium shadow-sm border border-border">
        <span className="size-2 rounded-full bg-primary" />
        Sizin məkanınız · Bakı, Azərbaycan
      </div>
    </div>
  );
}
