import { useRef, useState } from "react";
import SpeechRecognition, { useSpeechRecognition } from "react-speech-recognition";
import { sendToAssistant } from "../services/api";
import { getSenderId } from "../utils/senderId";

export function useSpeechChat({ ttsLang = "en-US" } = {}) {
  const { transcript, listening, resetTranscript, browserSupportsSpeechRecognition } =
    useSpeechRecognition();
  const [messages, setMessages] = useState([]);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");
  const senderRef = useRef(getSenderId());

  const start = () => SpeechRecognition.startListening({ continuous: true, language: "en-US" });
  const stop = () => SpeechRecognition.stopListening();

  const speak = (text) => {
    if (!text || !("speechSynthesis" in window)) return;
    const u = new SpeechSynthesisUtterance(text);
    u.lang = ttsLang;
    window.speechSynthesis.speak(u);
  };

  const send = async () => {
    stop();
    const text = transcript.trim();
    if (!text) return;

    setMessages((m) => [...m, { id: crypto.randomUUID?.(), from: "user", text, at: Date.now() }]);
    setSending(true);
    setError("");

    try {
      const data = await sendToAssistant({ text, sender: senderRef.current });

      const botTexts = (data?.messages || [])
        .map((m) => m?.text)
        .filter(Boolean);

      const reply = (botTexts.length ? botTexts.join("\n") : data?.replyText || "…").trim();

      setMessages((m) => [...m, { id: crypto.randomUUID?.(), from: "bot", text: reply, at: Date.now() }]);
      speak(reply);
      resetTranscript();
    } catch (e) {
      setError(e.message);
      setMessages((m) => [...m, { id: crypto.randomUUID?.(), from: "bot", text: "⚠️ Couldn’t reach the assistant.", at: Date.now() }]);
    } finally {
      setSending(false);
    }
  };

  return {
    messages, setMessages,
    transcript, listening, resetTranscript, browserSupportsSpeechRecognition,
    start, stop, send,
    sending, error
  };
}
