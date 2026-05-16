import { Link } from "@tanstack/react-router";
import { Home, Map, Shuffle, Sparkles } from "lucide-react";
import { Logo } from "./Logo";

export function Navbar() {
  return (
    <>
      {/* ── Top header ── */}
      <header className="sticky top-0 z-40 w-full border-b border-border/60 bg-background/85 backdrop-blur-xl relative">
        <div className="container mx-auto flex h-14 sm:h-20 items-center gap-3 px-4">
          {/* On mobile: centered absolutely so it doesn't shift with nav */}
          <div className="absolute left-1/2 -translate-x-1/2 sm:static sm:translate-x-0">
            <Logo />
          </div>
          {/* Desktop nav — hidden on mobile */}
          <nav className="ml-auto hidden sm:flex items-center gap-1">
            <Link
              to="/"
              activeOptions={{ exact: true }}
              className="px-3 py-1.5 text-sm rounded-full text-muted-foreground hover:text-foreground transition data-[status=active]:text-foreground data-[status=active]:bg-secondary"
            >
              Restaurants
            </Link>
            <Link
              to="/restaurants"
              className="px-3 py-1.5 text-sm rounded-full text-muted-foreground hover:text-foreground transition data-[status=active]:text-foreground data-[status=active]:bg-secondary"
            >
              Map
            </Link>
            <Link
              to="/decide"
              className="px-3 py-1.5 text-sm rounded-full font-medium bg-primary/10 text-primary hover:bg-primary/20 transition data-[status=active]:bg-primary data-[status=active]:text-primary-foreground"
            >
              🎲 Decide
            </Link>
            <Link
              to="/ai"
              className="px-3 py-1.5 text-sm rounded-full text-muted-foreground hover:text-foreground transition data-[status=active]:text-primary data-[status=active]:bg-primary/10"
            >
              ✨ AI
            </Link>
          </nav>
        </div>
      </header>

      {/* ── Mobile bottom tab bar ── */}
      <nav className="fixed bottom-0 left-0 right-0 z-40 sm:hidden border-t border-border/60 bg-background/95 backdrop-blur-xl safe-area-pb">
        <div className="flex items-stretch justify-around">
          <Link
            to="/"
            activeOptions={{ exact: true }}
            className="flex flex-1 flex-col items-center gap-0.5 px-2 py-2.5 text-muted-foreground transition data-[status=active]:text-primary"
          >
            <Home className="size-5" />
            <span className="text-[10px] font-medium">Restaurants</span>
          </Link>
          <Link
            to="/restaurants"
            className="flex flex-1 flex-col items-center gap-0.5 px-2 py-2.5 text-muted-foreground transition data-[status=active]:text-primary"
          >
            <Map className="size-5" />
            <span className="text-[10px] font-medium">Map</span>
          </Link>
          <Link
            to="/decide"
            className="flex flex-1 flex-col items-center gap-0.5 px-2 py-2.5 text-muted-foreground transition data-[status=active]:text-primary"
          >
            <Shuffle className="size-5" />
            <span className="text-[10px] font-medium">Decide</span>
          </Link>
          <Link
            to="/ai"
            className="flex flex-1 flex-col items-center gap-0.5 px-2 py-2.5 text-muted-foreground transition data-[status=active]:text-primary"
          >
            <Sparkles className="size-5" />
            <span className="text-[10px] font-medium">AI</span>
          </Link>
        </div>
      </nav>
    </>
  );
}
