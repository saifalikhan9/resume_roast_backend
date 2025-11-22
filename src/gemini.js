import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";
dotenv.config();

const GEMINI_API_KEY = process.env.GEMINI_API_KEY || "";
const configuration = new GoogleGenAI(GEMINI_API_KEY);

const modelResponse = await configuration.models.list();
// console.log(modelResponse);
const model = configuration.models;
export default model;
