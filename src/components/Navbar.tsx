import { Link } from "@tanstack/react-router";
import { Logo } from "./Logo";

export function Navbar() {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-border/60 bg-background/85 backdrop-blur-xl">
      <div className="container mx-auto flex h-16 items-center gap-3 px-4">
        <Logo />
        <nav className="ml-auto flex items-center gap-1">
          <Link
            to="/"
            activeOptions={{ exact: true }}
            className="px-3 py-1.5 text-sm rounded-full text-muted-foreground hover:text-foreground transition data-[status=active]:text-foreground data-[status=active]:bg-secondary"
          >
            Restoranlar
          </Link>
          <Link
            to="/restaurants"
            className="px-3 py-1.5 text-sm rounded-full text-muted-foreground hover:text-foreground transition data-[status=active]:text-foreground data-[status=active]:bg-secondary"
          >
            Xəritə
          </Link>
          <Link
            to="/decide"
            className="px-3 py-1.5 text-sm rounded-full font-medium bg-primary/10 text-primary hover:bg-primary/20 transition data-[status=active]:bg-primary data-[status=active]:text-primary-foreground"
          >
            🎲 Qərar ver
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
  );
}
