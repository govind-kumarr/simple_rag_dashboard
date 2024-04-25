import { OpenAI } from "@langchain/openai";
import {
  RetrievalQAChain,
  ConversationalRetrievalQAChain,
} from "langchain/chains";
import { ChromaClient } from "chromadb";
import { config } from "dotenv";
import { getVectorStore } from "./chroma.controllers.js";
import { BufferMemory, ChatMessageHistory } from "langchain/memory";
import { HumanMessage, AIMessage } from "langchain/schema";
import { ChatModel } from "../models/Chat.model.js";
import { connectToDb } from "../db/db.js";

config();

const chromaUrl = process.env.CHROMA_URL;
const openAIApiKey = process.env.OPENAI_API_KEY;
const client = new ChromaClient({ path: chromaUrl });

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
  async initializeChain(chatId) {
    const vectorStore = await getVectorStore(this.collectionName);
    const model = this.model;
    const vectorStoreRetriever = vectorStore.asRetriever();
    const history = await this.loadChatHistory(chatId);
    this.chain = ConversationalRetrievalQAChain.fromLLM(
      model,
      vectorStoreRetriever,
      {
        verbose: true,
        // returnSourceDocuments: true,
        // streaming: true,
        memory: new BufferMemory({
          memoryKey: "chat_history",
          chatHistory: history,
          getchatHistory: () => history,
        }),
      }
    );
  }

  setcollectionName(collectionName) {
    this.collectionName = collectionName;
  }

  async invokeChain(question) {
    const result = await this.chain.invoke({question });
    return result;
  }

  async loadChatHistory(chatId) {
    const chat = await ChatModel.find({ _id: chatId }).populate("messages");
    const { messages } = chat[0];
    const newMessages = messages.slice(-10).map((message) => {
      if (message.sender.toString() == "ai") {
        return new AIMessage(message.content);
      }
      return new HumanMessage(message.content);
    });
    return new ChatMessageHistory(newMessages);
  }
}
