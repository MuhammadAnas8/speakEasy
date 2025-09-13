import React from "react";
import SpeechRecognition, { useSpeechRecognition } from "react-speech-recognition";
import axios from "axios";

function App() {
  const { transcript, listening, resetTranscript } = useSpeechRecognition();

  if (!SpeechRecognition.browserSupportsSpeechRecognition()) {
    return <p>Your browser does not support speech recognition.</p>;
  }

/*  const handleSend = async () => {
    try {
      const response = await axios.post("http://localhost:5000/process", {
        text: transcript,
      }, { responseType: "blob" }); // expecting audio back

      const audioUrl = URL.createObjectURL(response.data);
      const audio = new Audio(audioUrl);
      audio.play();
    } catch (error) {
      console.error(error);
    }
  };
  */
 const handleSend = async () => {
try {
  const response = await axios.post("http://localhost:5000/process", {
  text: transcript,
  
});
alert("Cleaned text: " + response.data.cleanedText);
} catch (error) {
  console.error("errror: "+error); 
} 
}

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h2>Stammer-Free Voice Demo</h2>
      <p><b>Transcript:</b> {transcript}</p>
      <button onClick={SpeechRecognition.startListening}>🎤 Start</button>
      <button onClick={SpeechRecognition.stopListening}>⏹ Stop</button>
      <button onClick={resetTranscript}>🔄 Reset</button>
      <button onClick={handleSend}>🚀 Send to Backend</button>
      <p>{listening ? "Listening..." : "Click start to speak"}</p>
    </div>
  );
}

export default App;
