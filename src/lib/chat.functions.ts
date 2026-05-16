import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const messageSchema = z.object({
  role: z.enum(["user", "assistant"]),
  content: z.string().min(1).max(4000),
});

const inputSchema = z.object({
  messages: z.array(messageSchema).min(1).max(40),
});

const SYSTEM_PROMPT = `You are "DealEat AI" — the assistant for a food delivery price comparison platform in Baku, Azerbaijan.

Your role:
- Help users find the best food deals across Wolt, Bolt Food, Yango Deli, and Direct restaurant ordering.
- Give recommendations based on budget, category (burger, pizza, kebab, sushi, doner, desserts, coffee, etc.), delivery time, and area.
- Always respond in English.
- Be concise, friendly, and practical. Use Markdown (bold, lists, emojis).
- If you don't know exact prices, give an approximate ₼ range and add "prices may vary across platforms".
- Always highlight the cheapest option and explain which platform generally offers better value.
- Currency in Baku is the Azerbaijani Manat (₼). Always use the ₼ symbol before prices.`;

export const sendChatMessage = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => inputSchema.parse(data))
  .handler(async ({ data }) => {
    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) {
      return { ok: false as const, error: "AI service is not configured." };
    }

    try {
      const res = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "gpt-4o-mini",
          messages: [
            { role: "system", content: SYSTEM_PROMPT },
            ...data.messages,
          ],
        }),
      });

      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        const errorCode = body?.error?.code as string | undefined;
        const errorType = body?.error?.type as string | undefined;
        console.error("OpenAI error:", res.status, body);

        if (res.status === 401) {
          return { ok: false as const, error: "API key is invalid." };
        }
        if (res.status === 429) {
          if (errorCode === "insufficient_quota" || errorType === "insufficient_quota") {
            return { ok: false as const, error: "No credits on the OpenAI account. Add credits at platform.openai.com." };
          }
          return { ok: false as const, error: "Too many requests. Please try again in a moment." };
        }
        return { ok: false as const, error: `AI did not respond (${res.status}). Please try again.` };
      }

      const json = await res.json();
      const content = json?.choices?.[0]?.message?.content as string | undefined;
      if (!content) {
        return { ok: false as const, error: "Empty response received." };
      }
      return { ok: true as const, content };
    } catch (err) {
      console.error("chat fn error:", err);
      return { ok: false as const, error: "Network error. Please try again." };
    }
  });
