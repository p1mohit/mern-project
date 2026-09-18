
import express from "express";
import { connection, collectionName } from "./dbconfig.js";
import cors from "cors";
import { ObjectId } from "mongodb";

const app = express();

app.use(express.json());
app.use(cors());

// Add-Task
app.post("/add-task", async (req, resp) => {
  const db = await connection();
  const collection = db.collection(collectionName);
  const result = await collection.insertOne(req.body);

  if (result) {
    resp.send({
      message: "New task added",
      success: true,
      result,
    });
  } else {
    resp.send({
      message: "New task not added",
      success: false,
    });
  }
});
//tasks
app.get("/tasks", async (req, resp) => {
  const db = await connection();
  const collection = db.collection(collectionName);
  const result = await collection.find().toArray();
  if (result) {
    resp.send({ message: "Task list fetched", success: true,result,});
  } else {
    resp.send({message: "Error", success: false,});
  }
});
//delete
app.delete("/delete/:id", async (req, resp) => {
  const db = await connection();
  const id = req.params.id
  const collection = db.collection(collectionName);
  const result = await collection.deleteOne({_id:new ObjectId(id)})
  if (result) {
    resp.send({ message: "Task deleted", success: true,result,
    });
  } else {
    resp.send({message: "Error", success: false,});
  }
});
//home
app.get("/", (req, resp) => {
  resp.send({
    message: "done",
    success: true,
  });
});

app.listen(3200, () => {
  console.log("Server running on http://localhost:3200");
});
