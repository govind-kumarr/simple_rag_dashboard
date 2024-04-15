import { ChromaClient, OpenAIEmbeddingFunction } from "chromadb";
import { Chroma } from "@langchain/community/vectorstores/chroma";
import { OpenAIEmbeddings } from "@langchain/openai";
import { config } from "dotenv";

config();

const chromaUrl = process.env.CHROMA_URL;
const openAIApiKey = process.env.OPENAI_API_KEY;
const client = new ChromaClient({ path: chromaUrl });

export const getAllCollections = async () => {
  return await client.listCollections();
};

export const createCollection = async (name, metadata) => {
  return await client.createCollection({
    name,
    metadata: { ...metadata, sign: "emily" },
    embeddingFunction: OpenAIEmbeddingFunction({
      openai_api_key: openAIApiKey,
    }),
  });
};

export const getExistingCollection = async (name) => {
  return await client.getCollection({
    name,
    embeddingFunction: new OpenAIEmbeddingFunction({
      openai_api_key: openAIApiKey,
    }),
  });
};

export const deleteCollection = async (name, sure) => {
  if (sure) {
    return await client.deleteCollection({ name });
  }
};

export const addDocsToChroma = async (collectionName, docs) => {
  return await Chroma.fromDocuments(
    Array.isArray(docs) ? docs : [docs],
    new OpenAIEmbeddings({
      openAIApiKey,
    }),
    {
      collectionName,
      url: chromaUrl,
    }
  );
};

export const getVectorStore = async (collectionName) => {
  return await Chroma.fromExistingCollection(
    new OpenAIEmbeddings({ openAIApiKey }),
    {
      url: chromaUrl,
      collectionName,
    }
  );
};
