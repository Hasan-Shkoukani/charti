const express = require('express');
const router = express.Router();

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const GEMINI_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent`;

// we are asking the ai, to give us a response suitable for the frontend library "ReactFlow", and return it for usage in frontend
const buildPrompt = (input, type) => `
Generate a flowchart in JSON format with "nodes" and "edges" arrays, suitable for ReactFlow.
Only return valid JSON. Do not include markdown or explanation.

${type === 'code' ? 'Code:' : 'Description:'}
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