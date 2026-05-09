import { Link } from "@tanstack/react-router";

export function Logo() {
  return (
    <Link to="/" className="flex items-center gap-2 group">
      <div className="relative">
        <div className="size-9 rounded-xl bg-gradient-to-br from-[var(--primary-glow)] to-primary grid place-items-center shadow-[var(--shadow-glow)] transition-transform group-hover:scale-105">
          <span className="text-primary-foreground font-display font-bold text-lg">D</span>
        </div>
      </div>
      <div className="flex flex-col leading-none">
        <span className="font-display font-bold text-xl tracking-tight">DealEat</span>
        <span className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground">Bakı</span>
      </div>
    </Link>
  );
}
