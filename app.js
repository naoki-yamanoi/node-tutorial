const express = require("express");
const app = express();
const taskRoute = require("./routes/tasks");
const connectDB = require("./db/connect");
require("dotenv").config();
// jsonを使う
app.use(express.json());
// index.htmlを指定
app.use(express.static("./public"));

const PORT = 3000;

// ルーティング設計
app.use("/api/v1/tasks", taskRoute);

// DBと接続
const start = async () => {
  try {
    await connectDB(process.env.MONGO_URL);
    app.listen(PORT, console.log("サーバー起動"));
  } catch (err) {
    console.log(err);
  }
}

start();
