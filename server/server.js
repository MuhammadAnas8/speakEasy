import express from "express";

const app = express();


// No CORS needed when using Vite proxy (same-origin from the browser POV)
app.use(express.json());

// Point to your local Rasa server
const PORT = process.env.PORT || 5000;
const HOST = "0.0.0.0";
const RASA_URL = process.env.RASA_URL || "http://localhost:5005";

app.get("/", (_req, res) => res.send("OK"));

//logger
app.use((req, _res, next) => {
  console.log(">>", req.method, req.originalUrl);
  next();
});

// Health check to confirm Node -> Rasa connectivity
app.get("/api/health", async (_req, res) => {
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
    const message = (text || "").trim();
    if (!message) return res.status(400).json({ error: "Missing 'text'" });

    const upstream = await fetch(`${RASA_URL}/webhooks/rest/webhook`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ sender, message }),
    });

    if (!upstream.ok) {
      return res.status(502).json({
        error: "rasa_upstream_error",
        status: upstream.status,
        body: await upstream.text(),
      });
    }

    const messages = await upstream.json(); // array from Rasa
    const replyText = messages.map(m => m?.text).filter(Boolean).join("\n").trim();

    res.json({ replyText, messages });
  } catch (err) {
    console.error("Rasa proxy error:", err);
    res.status(500).json({ error: "proxy_failed", message: String(err) });
  }
});

// Bind to 0.0.0.0 so Vite (and LAN testing) can reach it
app.listen(PORT, HOST, () => {
  console.log(`🚀 API listening on http://${HOST}:${PORT}`);
});
