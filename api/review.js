// Função serverless (Vercel) que recebe o texto do navegador e chama a API do Google Gemini.
// A chave fica só aqui no servidor (variável de ambiente GEMINI_API_KEY), nunca no front-end.

const MODE_INSTRUCTIONS = {
  objetivar:
    "Reescreva o texto jurídico a seguir para torná-lo mais objetivo: reduza redundâncias, prolixidade e repetições, preservando integralmente o sentido, os fatos, valores, datas, nomes, números de processo e pedidos.",
  melhorar:
    "Melhore a redação jurídica do texto a seguir: aprimore a fluidez, os conectivos e o vocabulário jurídico, mantendo o registro formal, sem alterar fatos, valores, datas, nomes, números de processo ou pedidos.",
  completo:
    "Faça uma revisão completa do texto jurídico a seguir: corrija o português, formalize a linguagem, melhore a fluidez e os conectivos, e torne o texto mais objetivo — combinando todas essas melhorias. Preserve integralmente fatos, valores, datas, nomes, números de processo e pedidos.",
};

const SYSTEM_PROMPT = `Você é um assistente de redação jurídica em português do Brasil.
Regra de segurança inegociável: NUNCA altere nomes, datas, valores, números de processo, artigos de lei, fatos, pedidos ou quaisquer informações objetivas do texto original.
Responda APENAS com o texto revisado, sem comentários, sem explicações, sem aspas envolvendo o texto todo.`;

const GEMINI_MODEL = "gemini-2.5-flash";

module.exports = async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    res.status(204).end();
    return;
  }

  if (req.method !== "POST") {
    res.status(405).json({ error: "Método não permitido." });
    return;
  }

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    res.status(500).json({
      error: "Servidor sem chave de API configurada (GEMINI_API_KEY ausente).",
    });
    return;
  }

  let body = req.body;
  if (typeof body === "string") {
    try {
      body = JSON.parse(body);
    } catch {
      body = {};
    }
  }
  const { text, mode } = body || {};

  if (!text || typeof text !== "string" || !text.trim()) {
    res.status(400).json({ error: "Texto ausente." });
    return;
  }
  const instruction = MODE_INSTRUCTIONS[mode];
  if (!instruction) {
    res.status(400).json({ error: "Modo inválido." });
    return;
  }
  if (text.length > 20000) {
    res.status(400).json({ error: "Texto muito longo (limite: 20000 caracteres)." });
    return;
  }

  try {
    const url = `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent?key=${apiKey}`;
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        systemInstruction: {
          parts: [{ text: SYSTEM_PROMPT }],
        },
        contents: [
          {
            role: "user",
            parts: [
              {
                text: `${instruction}\n\nTexto original:\n"""\n${text}\n"""`,
              },
            ],
          },
        ],
        generationConfig: {
          maxOutputTokens: 4096,
          temperature: 0.3,
        },
      }),
    });

    if (!response.ok) {
      const errText = await response.text();
      res.status(502).json({ error: "Falha ao consultar a IA.", detail: errText });
      return;
    }

    const data = await response.json();
    const revised = (data.candidates?.[0]?.content?.parts || [])
      .map((part) => part.text || "")
      .join("")
      .trim();

    if (!revised) {
      res.status(502).json({ error: "A IA não retornou um resultado. Tente novamente." });
      return;
    }

    res.status(200).json({ result: revised });
  } catch (err) {
    res.status(500).json({ error: "Erro inesperado no servidor.", detail: String(err) });
  }
};
