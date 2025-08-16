import { constants } from "./constants.js";
import model from "./gemini.js";
import pdfParse from "pdf-parse";
import { getPrompt } from "./prompt_helper.js";

export const roasrService = async (req, res) => {
  try {
    const { tone, role, language } = req.body;
    const { resume } = req.files;

    if (!req.files && !resume && !tone && !role && !language) {
      return res.status(400).json({ message: "required fields are not found" });
    }

    const { text: resume_text } = await pdfParse(resume.data);

    if (!resume_text)
      return res.status(404).json({ message: "resume text is not generated" });

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
    console.error(error, "error");
  }
};
