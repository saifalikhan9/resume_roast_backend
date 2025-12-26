import { constants } from "./constants.js";
import model from "./gemini.js";
import { getPrompt } from "./prompt_helper.js";
import parsePDF from "./pdfparse.js";

const roastService = async (req, res) => {
  try {
    const { tone, role, language } = await req.body;
    const resumeFile = req.file;

    if (!resumeFile || !tone || !role || !language) {
      res.status(400).json({ message: "Required fields are missing" });
    }

    const resume_text = await parsePDF({
      buffer: resumeFile.buffer,
      url: null,
    });
    if (!resume_text) {
      res.status(404).json({ message: "Resume text not generated" });
    }

    const prompt = getPrompt(tone, role, language);

    const content = [
      { role: "model", parts: [{ text: prompt }] },
      { role: "user", parts: [{ text: resume_text }] },
    ];

    const result = await model.generateContent({
      model: "gemini-2.0-flash",
      contents: content,
      safetySettings: constants.safetySettings,
    });

    return res.status(200).json({ text: result.text, credits: req?.userCredits });
  } catch (error) {
    console.error("❌ Roast service error:", error);
    return res.status(500).json({ message: error.message });
  }
};

export default roastService;
