import { Link } from "@tanstack/react-router";
import logoSrc from "@/assets/DealEat-Logo.png";

export function Logo() {
  return (
    <Link to="/" className="flex items-center group">
      <img
        src={logoSrc}
        alt="DealEat"
        className="h-10 sm:h-16 w-auto object-contain transition-transform group-hover:scale-105"
      />
    </Link>
  );
}
