const express = require('express');
const router = express.Router();

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const GEMINI_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent`;

// we are asking the ai, to give us a response sui
// table for the frontend library "ReactFlow", and return it for usage in frontend
const buildPrompt = (input, type) => `
IMPORTANT RULES:
1. Validate the input type first.
   - If the user selected "text" but the input is clearly code (e.g., contains symbols like { }, const, function, etc.), respond with this exact JSON: { "error": "Input appears to be code but was marked as text." }
   - If the user selected "code" but the input is clearly natural language, respond with this exact JSON: { "error": "Input appears to be text but was marked as code." }

2. If the input type is correct, generate a flowchart in JSON format with two arrays: "nodes" and "edges", suitable for ReactFlow.

3. Only return valid JSON. Do not include markdown, explanations, or extra text.

Input Type: ${type}
User Input:
${input}
`;


router.post('/generate', async (req, res) => {
  const { input, type } = req.body;
  if (!input || !type) {
    return res.status(400).json({ error: 'Missing input or type' });
  }

  try {
    const prompt = buildPrompt(input, type);
    const response = await fetch(`${GEMINI_URL}?key=${GEMINI_API_KEY}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [
          {
            role: 'user',
            parts: [{ text: prompt }],
          },
        ],
      }),
    });

    const result = await response.json();
    console.log('[GEMINI RAW RESPONSE]', JSON.stringify(result, null, 2));

    const text = result.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!text) {
      throw new Error('No usable text from Gemini response');
    }

    // slicing to make sure our output is 100% json data, incase the AI messed up
    const jsonStart = text.indexOf('{');
    const jsonEnd = text.lastIndexOf('}');
    const jsonString = text.slice(jsonStart, jsonEnd + 1);

    const parsed = JSON.parse(jsonString);
    res.json({ flowchart: parsed });
  } catch (err) {
    console.error('Gemini API error:', err.message);
    res.status(500).json({ error: 'Failed to generate flowchart' });
  }
});

// we pass the json data to frontend, and then feed it to reactflow

module.exports = router;