import mongoose from "mongoose";
import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import bodyParser from "body-parser";
import { verifyJWT } from "./src/utils/verifyJWT.js";
import loginRouter from "./src/routers/login.js";
import userRouter from "./src/routers/user.js";
import taskRouter from "./src/routers/task.js";

const app = express();
const PORT = process.env.PORT;

const allowedOrigins = ['http://localhost:5173', 'http://127.0.0.1:5173', 'https://kanbanboard-frontend.vercel.app']; // Frontend origins

app.use(
  cors({
    origin: function (origin, callback) {
      // Allow requests from specific origins or requests without an origin (e.g., Postman)
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
    credentials: true, 
  })
);

app.use(bodyParser.json({ limit: "4kb" }));
app.use(bodyParser.urlencoded({ extended: true, limit: "4kb" }));
app.use(express.static("public"));
app.use(cookieParser());

app.get("/",(req,res)=>{
  res.send("Hello from server");
})
app.use("/", loginRouter);
app.use("/user",verifyJWT,userRouter);
app.use("/task",verifyJWT,taskRouter);

mongoose
  .connect("mongodb+srv://nishthaa2003:nishthaa2003@kanbanboard.9jkk7.mongodb.net/?retryWrites=true&w=majority&appName=KanbanBoard")
  .then(() => {
    app.listen(PORT, () => {
      console.log("http://localhost:" + PORT);
    });
  })
  .catch((err) => {
    console.log(err);
  });
