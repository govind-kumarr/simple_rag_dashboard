import { OpenAI } from "@langchain/openai";
import { RetrievalQAChain } from "langchain/chains";
import { ChromaClient } from "chromadb";

import config from "config";
import { getVectorStore } from "./chroma.controllers.js";

const chromaUrl = config.get("chroma.url");
const openAIApiKey = config.get("chroma.openai_api_key");
const client = new ChromaClient({ path: chromaUrl });
console.log({ chromaUrl });
export class QA_Manager {
  constructor(collectionName) {
    this.model = new OpenAI({
      temperature: 0,
      openAIApiKey,
      modelName: "gpt-4-1106-preview",
      // streaming: true,
    });
    this.collectionName = collectionName;
  }
  async initializeChain() {
    const vectorStore = await getVectorStore(this.collectionName);
    const model = this.model;
    const vectorStoreRetriever = vectorStore.asRetriever();
    this.chain = RetrievalQAChain.fromLLM(model, vectorStoreRetriever, {
      // verbose: true,
      // returnSourceDocuments: true,
      // streaming: true,
    });
  }

  setcollectionName(collectionName) {
    this.collectionName = collectionName;
  }

  async invokeChain(question) {
    const result = await this.chain.invoke({ query: question });
    return result;
  }
}

// const qa_manager = new QA_Manager("6608058949b4fa36b2e53a7f");
// qa_manager
//   .initializeChain()
//   .then((res) => {
//     return qa_manager.invokeChain("where is mritunjay heading?");
//   })
//   .then((res) => {
//     console.log(res)
//   })
//   .catch((err) => console.log(err));
