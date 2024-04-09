import { PDFLoader } from "langchain/document_loaders/fs/pdf";
import { DocxLoader } from "langchain/document_loaders/fs/docx";
import { PPTXLoader } from "langchain/document_loaders/fs/pptx";
import { TextLoader } from "langchain/document_loaders/fs/text";
import { CSVLoader } from "langchain/document_loaders/fs/csv";
import { JSONLoader } from "langchain/document_loaders/fs/json";

/**
 * pdf-parse
 * json files
 * text files
 * csv files
 *
 */

export async function createDocsFromFile(fileObj) {
  const { type, path } = fileObj;
  let docs = [];
  try {
    if (type === "application/pdf") {
      const loader = new PDFLoader(path);
      docs = await loader.load();
    }
    if (
      type ===
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
    ) {
      const loader = new DocxLoader(path);
      docs = await loader.load();
    }
    if (
      type ===
      "application/vnd.openxmlformats-officedocument.presentationml.presentation"
    ) {
      const loader = new PPTXLoader(path);
      docs = await loader.load();
    }
    if (type === "text/csv") {
      const loader = new CSVLoader(path);
      docs = await loader.load();
    }
    if (type === "text/plain") {
      const loader = new TextLoader(path);
      docs = await loader.load();
    }
    if (type === "application/json") {
      const loader = new JSONLoader(path);
      docs = await loader.load();
    }
    return docs;
  } catch (error) {
    console.log(error);
  }
}
