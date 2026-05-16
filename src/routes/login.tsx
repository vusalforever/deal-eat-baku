import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Mail, LogIn } from "lucide-react";
import logoSrc from "@/assets/DealEat-Logo.png";

export const Route = createFileRoute("/login")({
  component: LoginPage,
  head: () => ({
    meta: [
      { title: "Sign In — DealEat" },
      { name: "description", content: "Find the best food deals in Baku. Sign in to DealEat." },
    ],
  }),
});

const FLOATING = [
  { e: "🍔", style: "top-[8%] left-[6%]", d: "0s", dur: "7s" },
  { e: "🍕", style: "top-[18%] right-[10%]", d: "1.2s", dur: "8s" },
  { e: "🥙", style: "bottom-[14%] left-[12%]", d: "0.6s", dur: "9s" },
  { e: "🍰", style: "bottom-[10%] right-[8%]", d: "2s", dur: "7.5s" },
  { e: "☕", style: "top-[42%] left-[3%]", d: "1.6s", dur: "10s" },
  { e: "🔥", style: "top-[55%] right-[4%]", d: "0.3s", dur: "8.5s" },
  { e: "🍗", style: "top-[72%] left-[40%]", d: "2.4s", dur: "9.5s" },
  { e: "🐟", style: "top-[28%] left-[48%]", d: "1s", dur: "11s" },
];

function GoogleIcon() {
  return (
    <svg viewBox="0 0 48 48" className="size-5" aria-hidden="true">
      <path fill="#FFC107" d="M43.6 20.5H42V20H24v8h11.3C33.7 32.9 29.3 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.9 1.2 8 3.1l5.7-5.7C34 6.1 29.3 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.3-.1-2.3-.4-3.5z"/>
      <path fill="#FF3D00" d="M6.3 14.7l6.6 4.8C14.7 16 19 13 24 13c3.1 0 5.9 1.2 8 3.1l5.7-5.7C34 6.1 29.3 4 24 4 16.3 4 9.7 8.3 6.3 14.7z"/>
      <path fill="#4CAF50" d="M24 44c5.2 0 9.9-2 13.4-5.2l-6.2-5.2C29.2 35 26.7 36 24 36c-5.3 0-9.7-3.1-11.3-8l-6.5 5C9.5 39.6 16.2 44 24 44z"/>
      <path fill="#1976D2" d="M43.6 20.5H42V20H24v8h11.3c-.8 2.3-2.3 4.2-4.1 5.6l6.2 5.2C41 35.9 44 30.5 44 24c0-1.3-.1-2.3-.4-3.5z"/>
    </svg>
  );
}

function LoginPage() {
  return (
    <div className="relative min-h-screen overflow-hidden flex items-center justify-center px-4 py-10">
      {/* gradient bg */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(1200px 600px at 20% 10%, oklch(0.28 0.12 320) 0%, transparent 60%), radial-gradient(900px 600px at 85% 90%, oklch(0.32 0.18 25) 0%, transparent 55%), linear-gradient(160deg, oklch(0.14 0.04 300) 0%, oklch(0.13 0.06 20) 100%)",
        }}
      />

      {/* floating emojis */}
      {FLOATING.map((f, i) => (
        <span
          key={i}
          aria-hidden
          className={`absolute text-4xl md:text-5xl opacity-25 select-none pointer-events-none ${f.style}`}
          style={{
            animation: `floatY ${f.dur} ease-in-out ${f.d} infinite`,
            filter: "drop-shadow(0 6px 18px rgba(0,0,0,0.4))",
          }}
        >
          {f.e}
        </span>
      ))}

      <style>{`
        @keyframes floatY {
          0%,100% { transform: translateY(0) rotate(-4deg); }
          50% { transform: translateY(-22px) rotate(6deg); }
        }
      `}</style>

      {/* card */}
      <div className="relative w-full max-w-md rounded-3xl border border-white/10 bg-white/[0.04] backdrop-blur-2xl p-5 sm:p-8 md:p-10 shadow-[0_30px_80px_-20px_rgba(0,0,0,0.6)]">
        {/* logo */}
        <div className="flex flex-col items-center text-center">
          <div className="flex items-center gap-3">
            <img
              src={logoSrc}
              alt="DealEat"
              className="h-16 sm:h-24 w-auto object-contain drop-shadow-lg"
            />
            <span className="text-[10px] font-semibold tracking-widest px-1.5 py-0.5 rounded-md bg-primary text-primary-foreground">
              BETA
            </span>
          </div>
          <p className="mt-3 text-sm text-white/70">Find the best food deals in Baku</p>
        </div>

        {/* buttons */}
        <div className="mt-8 space-y-3">
          <Button
            type="button"
            className="w-full h-11 rounded-xl bg-white text-neutral-900 hover:bg-white/90 font-medium gap-3"
          >
            <GoogleIcon />
            Continue with Google
          </Button>

          <div className="flex items-center gap-3 py-1">
            <div className="h-px flex-1 bg-white/15" />
            <span className="text-xs uppercase tracking-widest text-white/50">or</span>
            <div className="h-px flex-1 bg-white/15" />
          </div>

          <Button
            type="button"
            className="w-full h-11 rounded-xl bg-primary text-primary-foreground hover:opacity-95 font-medium gap-2"
          >
            <Mail className="size-4" />
            Sign up with Email
          </Button>

          <Button
            type="button"
            variant="outline"
            className="w-full h-11 rounded-xl border-white/15 bg-white/5 text-white hover:bg-white/10 hover:text-white font-medium gap-2"
          >
            <LogIn className="size-4" />
            Sign In
          </Button>
        </div>

        {/* guest link */}
        <div className="mt-6 text-center">
          <Link
            to="/"
            className="text-sm text-white/60 hover:text-white underline-offset-4 hover:underline transition-colors"
          >
            Continue without account →
          </Link>
        </div>

        <p className="mt-6 text-[11px] text-center text-white/40 leading-relaxed">
          By continuing you agree to our{" "}
          <span className="text-white/60">Terms of Service</span> and{" "}
          <span className="text-white/60">Privacy Policy</span>.
        </p>
      </div>
    </div>
  );
}
