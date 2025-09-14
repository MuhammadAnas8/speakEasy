import axios from "axios";

const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:5000";

export const api = axios.create({
  baseURL: API_BASE,
  timeout: 15000,
  headers: { "Content-Type": "application/json" },
});


export async function sendToAssistant({ text, sender }) {
  const { data } = await api.post("/api/chat", { text, sender });
  return data; // { replyText, messages }
}

export async function health() {
  const { data } = await api.get("/api/health");
  return data;
}
