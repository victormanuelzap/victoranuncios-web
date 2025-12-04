import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST({ request }) {
  try {
    const { message } = await request.json();

    if (!message) {
      return new Response(JSON.stringify({ error: "Mensaje vacío." }), {
        status: 400,
      });
    }

    const completion = await client.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: "Eres VictorBot..." },
        { role: "user", content: message },
      ],
    });

    return new Response(
      JSON.stringify({ reply: completion.choices[0].message.content }),
      { status: 200 }
    );
  } catch (error) {
    console.error("ERROR:", error);
    return new Response(
      JSON.stringify({ error: "Error en el servidor." }),
      { status: 500 }
    );
  }
}
