
import express from "express";
import { connection, collectionName } from "./dbconfig.js";
import cors from "cors";
import { ObjectId } from "mongodb";
import jwt from "jsonwebtoken";
import cookieParser from "cookie-parser";
const JWT_SECRET="Google";
const app = express();
app.use(express.json());
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}));
app.use(cookieParser());
//login
app.post("/login", async (req, resp) => {
  const userData = req.body;

  if (userData.email && userData.password) {
    const db = await connection();
    const usersCollection = db.collection("users");

    const result = await usersCollection.findOne({
      email: userData.email,
      password: userData.password
    });

    if (result) {
      jwt.sign(
        {email:userData.email},
  JWT_SECRET,
  { expiresIn: "5d" },
  (error, token) => {
    if (error) {
      return resp.send({
        success: false,
        msg: "Token generation failed",
      });
    }

    resp.cookie("token", token, {
      httpOnly: true,
      sameSite: "lax",
    });

    resp.send({
      success: true,
      msg: "login done",
      token,
    });
  }
  );
   }}
})
//       jwt.sign(
//         userData,
//         "Google",
//         { expiresIn: "5d" },
//         (error, token) => {
//           resp.cookie({
//             success: true,
//             msg: "login done",
//             token
//           });
//         }
//       );
//     } else {
//       resp.json({
//         success: false,
//         msg: "user not found"
//       });
//     }
//   } else {
//     resp.json({
//       success: false,
//       msg: "login not done"
//     });
//   }
// });
//signup
app.post("/signup", async (req, resp) => {
  const userData = req.body;
  if (userData.email && userData.password) {
    const db = await connection();
    const usersCollection = db.collection("users");
    const result = await usersCollection.insertOne(userData);

    if (result.acknowledged) {
      jwt.sign(
        {email: userData.email},
        JWT_SECRET,
        "Google",
        { expiresIn: "5d" },
        (error, token) => {
          if (error) {
            return resp.send({
              success: false,
              msg: "Token generation failed",
            });
          }
          resp.send({
            success: true,
            msg: "signup done",
            token,
          });
        }
      );
    } else {
      resp.send({
        success: false,
        msg: "signup not done",
      });
    }
  }
});
// Add-Task
app.post("/add-task", verifyJWTToken, async (req, resp) => {
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
// tasks
app.get("/tasks", verifyJWTToken, async (req, resp) => {
  const db = await connection();

  const collection = db.collection(collectionName);

  const result = await collection.find().toArray();

  if (result) {
    resp.send({
      message: "Task list fetched",
      success: true,
      result,
    });
  } else {
    resp.send({
      message: "Error",
      success: false,
    });
  }
});
// task id
app.get("/task/:id", verifyJWTToken, async (req, resp) => {
  const db = await connection();
  const collection = db.collection(collectionName);

  const result = await collection.findOne({
    _id: new ObjectId(req.params.id),
  });

  if (result) {
    resp.send({
      message: "Task fetched",
      success: true,
      result,
    });
  } else {
    resp.send({
      message: "Task not found",
      success: false,
    });
  }
});
// update take put
app.put("/task/:id", verifyJWTToken, async (req, resp) => {
  const db = await connection();
  const collection = db.collection(collectionName);
  const result = await collection.updateOne(
    {
      _id: new ObjectId(req.params.id),
    },
    {
      $set: {
        title: req.body.title,
        description: req.body.description,
      },
    }
  );

  resp.send({
    message: "Task updated",
    success: true,
    result,
  });
});
//delete
app.delete("/delete/:id", verifyJWTToken, async (req, resp) => {
  const db = await connection();
  const collection = db.collection(collectionName);

  const id = req.params.id;

  const result = await collection.deleteOne({
    _id: new ObjectId(id),
  });

  if (result) {
    resp.send({
      message: "Task deleted",
      success: true,
      result,
    });
  } else {
    resp.send({
      message: "Error not delete",
      success: false,
    });
  }
});
app.delete("/delete-multiple", verifyJWTToken, async (req, resp) => {
  console.log("DELETE MULTIPLE HIT");

  console.log(req.body);

  const db = await connection();
  const collection = db.collection(collectionName);

  const ids = req.body;

  console.log("Delete IDs:", ids);

  const deleteTaskIds = ids.map((item) => new ObjectId(item));

  const result = await collection.deleteMany({
    _id: {
      $in: deleteTaskIds,
    },
  });

  if (result) {
    resp.send({
      message: "Tasks deleted",
      success: true,
      result,
    });
  } else {
    resp.send({
      message: "Tasks not deleted",
      success: false,
    });
  }
});
function verifyJWTToken(req, resp, next) {
  const token = req.cookies['token'];

  if (!token) {
    return resp.status(401).send({
      success: false,
      msg: "Login required",
    });
  }

  jwt.verify(token, 'Google', (error, decoded) => {
    if (error) {
      return resp.send({
        msg: "invalid token",
        success: false
      })
    }
    req.user=decoded;
    next()
  })
}
app.listen(3200, () => {
  console.log("Server running on http://localhost:3200");
});