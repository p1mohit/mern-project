import { MongoClient } from "mongodb";

const url = "mongodb://localhost:27017";

const dbName = "node-project";

export const collectionName = "ToDo";

const client = new MongoClient(url);

export const connection = async () => {
    await client.connect();
    console.log("MongoDB connected");

    return client.db(dbName);
};