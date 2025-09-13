import express from "express";
import cors from "cors";
import { NlpManager } from "node-nlp";
import gtts from "gtts";   // ✅ lowercase
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(cors());
app.use(express.json());

const manager = new NlpManager({ languages: ["en"] });

async function trainNLP() {
  manager.addDocument("en", "hello", "greet.hello");
  manager.addDocument("en", "hi there", "greet.hello");
  manager.addDocument("en", "goodbye", "greet.bye");
  manager.addDocument("en", "bye", "greet.bye");
  manager.addDocument("en", "friend", "greet.fr");


  manager.addAnswer("en", "greet.hello", "Hello! How can I help you?");
  manager.addAnswer("en", "greet.bye", "Goodbye, have a nice day!");
  manager.addAnswer("en", "greet.fr", "Arham is my friend");

  await manager.train();
  console.log("✅ NLP model trained");
}

trainNLP();

// Process text
app.post("/process", async (req, res) => {
  try {
    const { text } = req.body;
    console.log("📥 Received text:", text);

    const response = await manager.process("en", text);
    const reply = response.answer || text;

    console.log("🤖 Reply:", reply);

    const filePath = path.join(__dirname, `output-${Date.now()}.mp3`);
    const speech = new gtts(reply, "en");

    speech.save(filePath, (err) => {
      if (err) {
        console.error("❌ gTTS error:", err);
        return res.status(500).send("Error generating speech");
      }

      res.sendFile(filePath, (err) => {
        if (err) {
          console.error("❌ sendFile error:", err);
        }

        setTimeout(() => fs.unlink(filePath, () => {}), 5000);
      });
    });
  } catch (err) {
    console.error("❌ Error in /process:", err);
    res.status(500).send("Server error");
  }
});

app.listen(5000, () => console.log("🚀 Server running on http://localhcost:5000"));
