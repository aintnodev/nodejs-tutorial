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

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const PORT = 3000;

const customers = [
  {
    fname: "Rick",
    lname: "Sanchez",
    reality: "c-137",
  },
  {
    fname: "Morty",
    lname: "Smith",
    reality: "c-137",
  },
  {
    fname: "Beth",
    lname: "Smith",
    reality: "c-131",
  },
  {
    fname: "Summer",
    lname: "Smith",
    reality: "c-131",
  },
  {
    fname: "Jerry",
    lname: "Smith",
    reality: "5126",
  },
];

app.get("/", (req, res) => {
  res.send("This is a GET request.");
});

app.get("/api/customers", (req, res) => {
  res.send({ customers: customers });
});

app.post("/", (req, res) => {
  res.send("This is a POST request.");
});

app.post("/api/customers", (req, res) => {
  console.log(req.body);
  res.send(req.body);
});

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}.`);
});
