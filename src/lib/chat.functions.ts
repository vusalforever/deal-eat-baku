import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const messageSchema = z.object({
  role: z.enum(["user", "assistant"]),
  content: z.string().min(1).max(4000),
});

const inputSchema = z.object({
  messages: z.array(messageSchema).min(1).max(40),
});

const SYSTEM_PROMPT = `Sən "DealEat AI" adlı köməkçisən — Bakı, Azərbaycandakı yemək çatdırılması üçün qiymət müqayisə platformasının köməkçisi.

Vəzifən:
- İstifadəçilərə Wolt, Bolt Food və Yango Deli platformaları arasında ən sərfəli yemək sifarişlərini tapmağa kömək et.
- Büdcə, kateqoriya (burger, pizza, kabab, suşi, döner, şirniyyat, qəhvə və s.), çatdırılma vaxtı və yer üzrə tövsiyələr ver.
- Cavabları HƏMİŞƏ Azərbaycan dilində ver.
- Qısa, dostyana və praktiki ol. Markdown istifadə et (qalın, siyahılar, emojilər).
- Real qiymətləri bilmirsənsə, təxmini AZN diapazonu göstər və "qiymətlər platformalarda dəyişə bilər" qeydini əlavə et.
- Hər zaman ən ucuz seçimi vurğula və hansı platformanın ümumiyyətlə daha sərfəli olduğunu izah et.`;

export const sendChatMessage = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => inputSchema.parse(data))
  .handler(async ({ data }) => {
    const apiKey = process.env.LOVABLE_API_KEY;
    if (!apiKey) {
      return { ok: false as const, error: "AI xidməti konfiqurasiya edilməyib." };
    }

    try {
      const res = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "google/gemini-3-flash-preview",
          messages: [
            { role: "system", content: SYSTEM_PROMPT },
            ...data.messages,
          ],
        }),
      });

      if (res.status === 429) {
        return { ok: false as const, error: "Çox sayda sorğu göndərildi. Bir az sonra yenidən cəhd edin." };
      }
      if (res.status === 402) {
        return { ok: false as const, error: "AI krediti bitib. Lovable workspace-də kredit əlavə edin." };
      }
      if (!res.ok) {
        const text = await res.text();
        console.error("AI gateway error:", res.status, text);
        return { ok: false as const, error: "AI cavab vermədi. Yenidən cəhd edin." };
      }

      const json = await res.json();
      const content = json?.choices?.[0]?.message?.content as string | undefined;
      if (!content) {
        return { ok: false as const, error: "Boş cavab gəldi." };
      }
      return { ok: true as const, content };
    } catch (err) {
      console.error("chat fn error:", err);
      return { ok: false as const, error: "Şəbəkə xətası baş verdi." };
    }
  });
