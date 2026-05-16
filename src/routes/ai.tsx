import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import ReactMarkdown from "react-markdown";
import { Send, RotateCcw, Sparkles, Bot, User as UserIcon } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { sendChatMessage } from "@/lib/chat.functions";

export const Route = createFileRoute("/ai")({
  head: () => ({
    meta: [
      { title: "DealEat AI — Food assistant in Baku" },
      {
        name: "description",
        content:
          "AI assistant for finding the best food deals in Baku. Get recommendations based on your budget.",
      },
    ],
  }),
  component: AIPage,
});

type Msg = { role: "user" | "assistant"; content: string };

const WELCOME =
  "Hi! I'm **DealEat AI** ✨\n\nI'll help you find the best food deals in Baku. Ask me anything!";

const SUGGESTIONS = [
  { emoji: "💰", text: "Food under ₼10" },
  { emoji: "🍳", text: "Breakfast near me" },
  { emoji: "🧁", text: "Desserts under ₼8" },
  { emoji: "⚖️", text: "Compare platforms" },
];

function AIPage() {
  const sendFn = useServerFn(sendChatMessage);
  const [messages, setMessages] = useState<Msg[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, loading]);

  const reset = () => {
    setMessages([]);
    setInput("");
    setError(null);
  };

  const send = async (text: string) => {
    const trimmed = text.trim();
    if (!trimmed || loading) return;
    setError(null);
    const next: Msg[] = [...messages, { role: "user", content: trimmed }];
    setMessages(next);
    setInput("");
    setLoading(true);
    try {
      const res = await sendFn({ data: { messages: next } });
      if (res.ok) {
        setMessages((prev) => [...prev, { role: "assistant", content: res.content }]);
      } else {
        setError(res.error);
      }
    } catch (e) {
      console.error(e);
      setError("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />

      <main className="flex-1 container mx-auto px-4 py-4 sm:py-6 md:py-8 w-full max-w-3xl flex flex-col pb-24 sm:pb-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="grid place-items-center size-10 rounded-2xl bg-gradient-to-br from-primary to-primary/70 text-primary-foreground shadow-[var(--shadow-glow)]">
              <Sparkles className="size-5" />
            </div>
            <div>
              <h1 className="font-display font-bold text-xl leading-tight">DealEat AI</h1>
              <p className="text-xs text-muted-foreground">Food discovery assistant</p>
            </div>
          </div>
          <button
            onClick={reset}
            className="inline-flex items-center gap-1.5 rounded-full border border-border bg-card hover:border-primary/40 px-3 py-1.5 text-sm font-medium transition"
          >
            <RotateCcw className="size-3.5" />
            New chat
          </button>
        </div>

        {/* Chat window */}
        <div className="flex-1 flex flex-col rounded-3xl border border-border bg-card shadow-[var(--shadow-card)] overflow-hidden">
          <div ref={scrollRef} className="flex-1 overflow-y-auto p-3 sm:p-4 md:p-6 space-y-4 min-h-[240px] sm:min-h-[360px] max-h-[45vh] sm:max-h-[60vh]">
            {/* Welcome */}
            <MessageBubble role="assistant" content={WELCOME} />

            {messages.map((m, i) => (
              <MessageBubble key={i} role={m.role} content={m.content} />
            ))}

            {loading && (
              <div className="flex items-start gap-2.5">
                <div className="grid place-items-center size-8 rounded-full bg-primary/10 text-primary shrink-0">
                  <Bot className="size-4" />
                </div>
                <div className="rounded-2xl rounded-tl-sm bg-secondary px-4 py-3">
                  <div className="flex gap-1">
                    <span className="size-2 rounded-full bg-primary/60 animate-bounce" style={{ animationDelay: "0ms" }} />
                    <span className="size-2 rounded-full bg-primary/60 animate-bounce" style={{ animationDelay: "150ms" }} />
                    <span className="size-2 rounded-full bg-primary/60 animate-bounce" style={{ animationDelay: "300ms" }} />
                  </div>
                </div>
              </div>
            )}

            {error && (
              <div className="rounded-xl border border-destructive/40 bg-destructive/10 text-destructive text-sm px-4 py-2.5">
                {error}
              </div>
            )}
          </div>

          {/* Suggestions */}
          {messages.length === 0 && !loading && (
            <div className="px-3 sm:px-4 md:px-6 pb-2 flex flex-wrap gap-1.5 sm:gap-2">
              {SUGGESTIONS.map((s) => (
                <button
                  key={s.text}
                  onClick={() => send(`${s.emoji} ${s.text}`)}
                  className="inline-flex items-center gap-1.5 rounded-full border border-border bg-background hover:border-primary/50 hover:bg-primary/5 px-3 py-1.5 text-sm transition"
                >
                  <span>{s.emoji}</span>
                  {s.text}
                </button>
              ))}
            </div>
          )}

          {/* Input */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              send(input);
            }}
            className="border-t border-border p-3 md:p-4 flex items-center gap-2 bg-background/40"
          >
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="What are you craving?"
              disabled={loading}
              className="flex-1 bg-secondary/60 border border-border rounded-full px-4 py-2.5 text-sm outline-none focus:border-primary/60 focus:bg-background transition disabled:opacity-50"
            />
            <button
              type="submit"
              disabled={loading || !input.trim()}
              aria-label="Send"
              className="grid place-items-center size-10 rounded-full bg-primary text-primary-foreground hover:opacity-90 disabled:opacity-40 disabled:cursor-not-allowed transition shadow-[var(--shadow-glow)]"
            >
              <Send className="size-4" />
            </button>
          </form>
        </div>

        <p className="text-[11px] text-muted-foreground text-center mt-3">
          AI responses are approximate. Prices may vary across platforms.
        </p>
      </main>
    </div>
  );
}

function MessageBubble({ role, content }: { role: "user" | "assistant"; content: string }) {
  const isUser = role === "user";
  return (
    <div className={`flex items-start gap-2.5 ${isUser ? "flex-row-reverse" : ""}`}>
      <div
        className={`grid place-items-center size-8 rounded-full shrink-0 ${
          isUser ? "bg-primary text-primary-foreground" : "bg-primary/10 text-primary"
        }`}
      >
        {isUser ? <UserIcon className="size-4" /> : <Bot className="size-4" />}
      </div>
      <div
        className={`max-w-[88%] sm:max-w-[80%] rounded-2xl px-3 sm:px-4 py-2 sm:py-2.5 text-sm leading-relaxed ${
          isUser
            ? "bg-primary text-primary-foreground rounded-tr-sm"
            : "bg-secondary text-foreground rounded-tl-sm"
        }`}
      >
        <div className="prose prose-sm max-w-none prose-p:my-1 prose-ul:my-1 prose-ol:my-1 prose-strong:text-current prose-headings:text-current">
          <ReactMarkdown>{content}</ReactMarkdown>
        </div>
      </div>
    </div>
  );
}
