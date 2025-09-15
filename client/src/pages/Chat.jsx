import ChatWindow from "../components/ChatWindow";
import MicControls from "../components/MicControls";
import { useSpeechChat } from "../hooks/useSpeechChat";
import "../styles/chat.css";

export default function Chat() {
  const {
    messages,
    transcript, listening, resetTranscript, browserSupportsSpeechRecognition,
    start, stop, send,
    sending, error
  } = useSpeechChat({ ttsLang: "en-US" });

  if (!browserSupportsSpeechRecognition) {
    return <p className="unsupported">Your browser does not support speech recognition.</p>;
  }

  return (
    <div className="container">
      <h2>Voice → Rasa → Text</h2>

      <div className="transcript">
        <div className="transcript-title"><b>Live transcript:</b></div>
        <div className="transcript-body">{transcript || "…"}</div>
      </div>

      <MicControls
        listening={listening}
        onStart={() => start()}
        onStop={() => stop()}
        onReset={() => resetTranscript()}
        onSend={() => send()}
        disabled={sending}
      />

      {error && <div className="error">Error: {error}</div>}

      <h3>Conversation</h3>
      <ChatWindow messages={messages} />
    </div>
  );
}
