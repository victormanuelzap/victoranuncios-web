
import OpenAI from "openai";

const client = new OpenAI({
  apiKey: import.meta.env.OPENAI_API_KEY,
});

export async function POST({ request }) {
  try {
    const { message } = await request.json();

    if (!message || typeof message !== "string") {
      return new Response(
        JSON.stringify({ error: "Mensaje inválido" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    const completion = await client.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content:
            "Eres VictorBot, asistente de Victor Anuncios en Arequipa. Ayudas a cotizar y orientar sobre letreros luminosos, 3D, toldos, gigantografías y publicidad exterior. Sé breve, claro y comercial.",
        },
        { role: "user", content: message },
      ],
      max_tokens: 250,
      temperature: 0.7,
    });

    const reply =
      completion.choices?.[0]?.message?.content ??
      "No pude generar una respuesta en este momento.";

    return new Response(JSON.stringify({ reply }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("Error en /api/chat:", err);
    return new Response(
      JSON.stringify({
        error: "Error interno",
        reply:
          "Tuve un problema al responder. Intenta de nuevo en unos minutos.",
      }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
