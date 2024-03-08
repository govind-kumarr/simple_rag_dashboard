import { ChromaClient } from "chromadb";
import config from "config";

const chromaUrl = config.get("chroma.url");
const client = new ChromaClient({ path: chromaUrl });

export const getAllCollections = async () => {
  return await client.listCollections();
};

export const createCollection = async (name, metadata) => {
  return await client.createCollection({
    name,
    metadata: { ...metadata, sign: "emily" },
  });
};

export const getExistingCollection = async (name) => {
  return await client.getCollection({ name });
};

export const deleteCollection = async (name, sure) => {
  if (sure) {
    return await client.deleteCollection({ name });
  }
};


