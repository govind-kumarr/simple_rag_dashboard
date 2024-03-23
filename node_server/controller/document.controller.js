/**
 * pdf-parse
 * json files
 * text files
 * csv files
 *
 */

import { PDFLoader } from "langchain/document_loaders/fs/pdf";

export async function createDocsFromFile(fileObj) {
  const { path, type } = fileObj;
  let docs = [];
  console.log({ path, type });
  // if (type === "application/pdf") {
  //   const loader = new PDFLoader(path);
  //   docs = await loader.load();
  // }
  // if (type === "application/pdf") {
  // }
  // if (type === "application/pdf") {
  // }
  // if (type === "application/pdf") {
  // }
}
