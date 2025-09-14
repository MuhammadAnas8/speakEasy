import express from "express";
import cors from "cors";
// If Node < 18: npm i node-fetch && import fetch from "node-fetch";

const app = express();

app.use(cors({
  origin: ["http://localhost:5173"], // <-- your Vite dev URL
  credentials: true
}));
app.use(express.json());

const RASA_URL = process.env.RASA_URL || "http://localhost:5005";

// Health check to confirm Node -> Rasa connectivity
app.get("/api/health", async (req, res) => {
  try {
    const r = await fetch(`${RASA_URL}/status`);
    const body = await r.json();
    res.json({ ok: true, rasa: body });
  } catch (e) {
    res.status(503).json({ ok: false, error: String(e) });
  }
});

// Main chat proxy
app.post("/api/chat", async (req, res) => {
  try {
    const { text, sender = "anon" } = req.body || {};
    if (!text?.trim()) return res.status(400).json({ error: "Missing 'text'" });

    const upstream = await fetch(`${RASA_URL}/webhooks/rest/webhook`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ sender, message: text.trim() })
    });

    if (!upstream.ok) {
      return res.status(502).json({
        error: "rasa_upstream_error",
        status: upstream.status,
        body: await upstream.text()
      });
    }

    const messages = await upstream.json(); // array from Rasa
    const replyText = messages.map(m => m.text).filter(Boolean).join("\n").trim();

    res.json({ replyText, messages });
  } catch (err) {
    console.error("Rasa proxy error:", err);
    res.status(500).json({ error: "proxy_failed", message: String(err) });
  }
});

app.listen(5000, () => console.log("🚀 API running on http://localhost:5000"));
