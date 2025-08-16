import { constants } from "./constants.js";
import model from "./gemini.js";
import pdfParse from "pdf-parse";
import { getPrompt } from "./prompt_helper.js";


 const roastService = async (req, res) => {
  try {
    const { tone, role, language } = req.body;
    const resumeFile = req.file; 

    if (!resumeFile || !tone || !role || !language) {
      return res.status(400).json({ message: "Required fields are missing" });
    }

    const { text: resume_text } = await pdfParse(resumeFile.buffer);

    if (!resume_text) {
      return res.status(404).json({ message: "Resume text not generated" });
    }

    const prompt = getPrompt(tone, role, language);

    const content = [
      { role: "model", parts: [{ text: prompt }] },
      { role: "user", parts: [{ text: resume_text }] },
    ];

    const result = await model.generateContent({
      model: "gemini-1.5-flash-latest",
      contents: content,
      safetySettings: constants.safetySettings,
    });

    return res.status(200).json({ text: result.text });
  } catch (error) {
    console.error("❌ Roast service error:", error);
    return res.status(500).json({ message: error.message });
  }
};

export default roastService