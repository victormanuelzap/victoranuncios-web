// netlify/functions/victorbot.js

const OPENAI_URL = "https://api.openai.com/v1/chat/completions";

exports.handler = async (event, context) => {
  // Solo aceptamos POST
  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      body: "Method Not Allowed",
    };
  }

  try {
    // Parsear el cuerpo
    const body = JSON.parse(event.body || "{}");
    const message = body.message?.trim();

    if (!message) {
      return {
        statusCode: 400,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          reply: "Escríbeme tu consulta para poder ayudarte 🙂.",
        }),
      };
    }

    // API KEY
    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) {
      console.error("NO HAY OPENAI_API_KEY configurada en Netlify.");
      return {
        statusCode: 500,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          reply:
            "Ahora mismo no tengo conexión con el motor de IA. Intenta más tarde.",
        }),
      };
    }

    // Llamada a OpenAI
    const response = await fetch(OPENAI_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [
          {
            role: "system",
            content:
              "Eres VictorBot, asistente del negocio de publicidad 'Victor Anuncios' en Arequipa. " +
              "Respondes de forma clara, amable y directa. Ayudas a cotizar letreros luminosos, letras 3D, gigantografías, vinilos, tarjetas y servicios de Victor Anuncios.",
          },
          { role: "user", content: message },
        ],
      }),
    });

    // Si OpenAI devuelve error, lo registramos
    if (!response.ok) {
      const errorText = await response.text();
      console.error("Error OpenAI:", response.status, errorText);

      return {
        statusCode: 500,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          reply:
            "Tuve un problema al generar la respuesta. Intenta de nuevo en un momento.",
        }),
      };
    }

    // Parsear la respuesta correcta
    const data = await response.json();
    console.log("Respuesta OpenAI:", JSON.stringify(data));

    const reply =
      data?.choices?.[0]?.message?.content?.trim() ||
      "No pude responder ahora mismo, pero puedes intentarlo de nuevo.";

    return {
      statusCode: 200,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ reply }),
    };
  } catch (error) {
    console.error("ERROR VictorBot:", error);
    return {
      statusCode: 500,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        reply:
          "Ha ocurrido un error inesperado en el servidor. Intenta nuevamente.",
      }),
    };
  }
};
