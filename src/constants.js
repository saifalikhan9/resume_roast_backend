import { HarmBlockThreshold, HarmCategory } from "@google/genai";

const Tones = {
  soft: "soft",
  hard: "hard",
  dark: "dark",
  motivational: "motivational",
};

const Roles = {
  friend: "friend",
  interviewer: "interviewer",
  comedian: "comedian",
  memer: "memer",
};

const languages = {
  hindi: "hindi",
  english: "english",
};

const safetySettings = [
  {
    category: HarmCategory.HARM_CATEGORY_HARASSMENT,
    threshold: HarmBlockThreshold.BLOCK_NONE,
  },
  {
    category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
    threshold: HarmBlockThreshold.BLOCK_NONE,
  },
  {
    category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
    threshold: HarmBlockThreshold.BLOCK_NONE,
  },
  {
    category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
    threshold: HarmBlockThreshold.BLOCK_NONE,
  },
];

export const constants = {
  Roles,
  Tones,
  languages,
  safetySettings,
};
