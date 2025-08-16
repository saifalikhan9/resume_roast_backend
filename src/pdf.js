import pdf from "pdf-parse";
export async function pdf_Text(path) {
  try {
    
    const result = await pdf(path);
    return result?.text;
  } catch (error) {
    console.error(error,"not able to extract text form pdf")
  }
}
