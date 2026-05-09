import { Link } from "@tanstack/react-router";
import { Search, MapPin, SlidersHorizontal } from "lucide-react";
import { Logo } from "./Logo";
import { Button } from "./ui/button";

export function Navbar({ address, onAddressChange }: { address?: string; onAddressChange?: (v: string) => void }) {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-border/60 bg-background/85 backdrop-blur-xl">
      <div className="container mx-auto flex h-16 items-center gap-3 px-4">
        <Logo />
        <div className="hidden md:flex flex-1 items-center gap-2 max-w-2xl mx-auto">
          <div className="flex flex-1 items-center gap-2 rounded-full border border-border bg-secondary/60 px-4 py-2 focus-within:border-primary/60 focus-within:bg-background transition-colors">
            <MapPin className="size-4 text-primary shrink-0" />
            <input
              value={address ?? ""}
              onChange={(e) => onAddressChange?.(e.target.value)}
              placeholder="Ünvanınızı daxil edin..."
              className="flex-1 bg-transparent outline-none text-sm placeholder:text-muted-foreground"
            />
            <button className="grid place-items-center size-7 rounded-full bg-primary text-primary-foreground hover:opacity-90 transition">
              <Search className="size-3.5" />
            </button>
          </div>
          <Button variant="outline" size="sm" className="rounded-full gap-1.5">
            <SlidersHorizontal className="size-4" />
            Filtrlər
          </Button>
        </div>
        <nav className="ml-auto flex items-center gap-1">
          <Link
            to="/"
            activeOptions={{ exact: true }}
            className="px-3 py-1.5 text-sm rounded-full text-muted-foreground hover:text-foreground transition data-[status=active]:text-foreground data-[status=active]:bg-secondary"
          >
            Ana səhifə
          </Link>
          <Link
            to="/restaurants"
            className="px-3 py-1.5 text-sm rounded-full text-muted-foreground hover:text-foreground transition data-[status=active]:text-foreground data-[status=active]:bg-secondary"
          >
            Restoranlar
          </Link>
        </nav>
      </div>
    </header>
  );
}
