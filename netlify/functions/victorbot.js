// netlify/functions/victorbot.js

export async function handler(event) {
  // Solo aceptar POST
  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      body: "Method Not Allowed",
    };
  }

  try {
    // Leer el cuerpo
    const body = JSON.parse(event.body || "{}");
    const message = (body.message || "").trim();

    if (!message) {
      return {
        statusCode: 400,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ error: "Mensaje vacío." }),
      };
    }

    // Leer API key de Netlify
    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) {
      console.error("Falta OPENAI_API_KEY en Netlify.");
      return {
        statusCode: 500,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          reply:
            "No encuentro la clave de OpenAI en el servidor. Habla con el administrador de la página.",
        }),
      };
    }

    // Llamar a la nueva API /v1/responses con GPT-4.1-mini
    const openaiRes = await fetch("https://api.openai.com/v1/responses", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "gpt-4.1-mini",
        instructions:
          "Eres VictorBot, asistente del negocio de publicidad 'Victor Anuncios' en Arequipa. " +
          "Respondes SIEMPRE en español, con tono amable y profesional. " +
          "Ayudas a los clientes con dudas sobre letreros luminosos, letreros 3D, gigantografías, viniles, " +
          "diseño gráfico y servicios de Victor Anuncios. " +
          "IMPORTANTE: No te presentes ni saludes con frases como 'Hola', 'Soy VictorBot', 'Gracias por contactarte', etc. " +
          "Asume que la conversación ya está en curso y responde directamente a la pregunta. " +
          "Si el usuario responde solo 'sí', 'no', 'ok' u otras respuestas cortas, trátalo como una continuación de la conversación y responde en consecuencia, sin reiniciar el saludo.",
        input: message,
        max_output_tokens: 300,
      }),
    });

    const rawText = await openaiRes.text();

    if (!openaiRes.ok) {
      // Aquí veremos el error real en los logs de Netlify
      console.error("Error OpenAI:", openaiRes.status, rawText);

      return {
        statusCode: 200,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          reply:
            "En este momento tengo un problema para generar la respuesta. " +
            "Por favor, inténtalo de nuevo en unos minutos o escríbeme por WhatsApp.",
        }),
      };
    }

    let data;
    try {
      data = JSON.parse(rawText);
    } catch (e) {
      console.error("No puedo parsear la respuesta de OpenAI:", rawText);
      return {
        statusCode: 200,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          reply:
            "Recibí una respuesta extraña del servidor de IA. Intenta nuevamente en un momento, por favor.",
        }),
      };
    }

    // La Responses API entrega el texto final en output_text
    const reply =
      data.output_text ||
      data.output?.[0]?.content?.[0]?.text ||
      "Por ahora no puedo responder, inténtalo nuevamente.";

    return {
      statusCode: 200,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ reply }),
    };
  } catch (error) {
    console.error("ERROR VictorBot:", error);
    return {
      statusCode: 200,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        reply:
          "Ocurrió un error interno en VictorBot. Por favor, inténtalo otra vez en unos minutos.",
      }),
    };
  }
}
