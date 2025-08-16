import PDFParser from 'pdf2json';
import fs from 'fs';
import https from 'https';

async function parsePDF(pdfParse) {
  const pdfParser = new PDFParser(this, 1);
  console.log(pdfParse);
  
  pdfParser.setMaxListeners(1);

  return new Promise((resolve, reject) => {
    const onDataError = (errData) => {
      pdfParser.removeAllListeners("pdfParser_dataError");
      reject(errData.parserError);
    };

    const onDataReady = () => {
      pdfParser.removeAllListeners("pdfParser_dataReady");
      resolve(pdfParser.getRawTextContent());
    };

    pdfParser.on("pdfParser_dataError", onDataError);
    pdfParser.on("pdfParser_dataReady", onDataReady);

    if (pdfParse.url) {
      const url = pdfParse.url;
      const tempFilePath = "temp.pdf";

      // Download the PDF file
      const fileStream = fs.createWriteStream(tempFilePath);
      https.get(url, (response) => {
        response.pipe(fileStream);
        response.on("end", () => {
          fileStream.close();

          // Read the file into a buffer
          fs.readFile(tempFilePath, (err, data) => {
            if (err) {
              reject(err);
            } else {
              const buffer = Buffer.from(data);
              pdfParser.parseBuffer(buffer);

              // Delete the temporary file after parsing
              fs.unlink(tempFilePath, (err) => {
                if (err) console.error(`Failed to delete temp file: ${err.message}`);
              });
            }
          });
        });
      }).on('error', (err) => {
        fs.unlink(tempFilePath, () => {}); // Delete the file if an error occurs
        reject(err);
      });

    } else if (pdfParse.buffer) {
      pdfParser.parseBuffer(pdfParse.buffer);
    }
  });
}

export default parsePDF;
