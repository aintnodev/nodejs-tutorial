// const http = require("http");

// const server = http.createServer((req, res) => {
//   res.statusCode = 200;
//   res.setHeader("Content-Type", "text/html");
//   res.end("<h1>Hello Bhai!!</h1>");
// });

// server.listen(3000, "127.0.0.1", () => {
//   console.log("Server is up and running...");
// });

// const { v4: uuidv4 } = require("uuid");
// import { v4 as uuidv4 } from "uuid";

// console.log(uuidv4());

const express = require("express");
const app = express();
const PORT = 3000;

app.get("/", (req, res) => {
  res.send("This is a GET request.");
});

app.post("/", (req, res) => {
  res.send("This is a POST request.");
});

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}.`);
});
