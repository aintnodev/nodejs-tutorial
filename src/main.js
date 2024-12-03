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
const mongoose = require("mongoose");
const dotenv = require("dotenv");

const Customer = require("./models/customers");
const cors = require("cors");

const app = express();

dotenv.config();
mongoose.set("strictQuery", false);

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const PORT = process.env.PORT || 3000;

const customer = new Customer({
  name: "new customer",
  industry: "music",
});

// customer.save();

app.get("/", (req, res) => {
  res.send(customer);
});

app.get("/api/customers", async (req, res) => {
  // console.log(await mongoose.connection.db.listCollections().toArray());
  try {
    const result = await Customer.find();
    res.json({ customers: result });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

app.get("/api/customers/:id", async (req, res) => {
  console.log({
    requestParams: req.params,
    requestQuery: req.query,
  });
  try {
    const { id: customerId } = req.params;
    console.log(customerId);
    const customer = await Customer.findById(customerId);
    if (!customer) {
      res.status(404).json({ error: "user not found" });
    }
    res.json({ customer });
  } catch (e) {
    res.status(500).json({ error: "something went wrong" });
  }
});

app.put("/api/customers/:id", async (req, res) => {
  try {
    const customerId = req.params.id;
    const result = await Customer.replaceOne({ _id: customerId }, req.body);
    console.log(result);
    res.json({ updatedCount: result.modifiedCount });
  } catch (e) {
    res.status(500).json({ error: "something went wrong" });
  }
});

app.delete("/api/customers/:id", async (req, res) => {
  try {
    const customerId = req.params.id;
    const result = await Customer.deleteOne({ _id: customerId });
    res.json({ deletedCount: result.deletedCount });
  } catch (e) {
    res.status(505).json({ error: "something went wrong" });
  }
});

app.post("/", (req, res) => {
  res.send(customer);
});

app.post("/api/customers", async (req, res) => {
  console.log(req.body);
  const customer = new Customer(req.body);
  try {
    await customer.save();
    res.status(201).json({ customer });
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
});

const start = async () => {
  try {
    await mongoose.connect(process.env.CONNECTION);

    app.listen(PORT, () => {
      console.log(`App listening on port ${PORT}.`);
    });
  } catch (e) {
    console.log(e.message);
  }
};

start();

// class Person {
//   constructor(fname, age) {
//     this.fname = fname;
//     this.age = age;
//   }

//   name() {
//     console.log(this.fname);
//   }

//   pAge() {
//     console.log(this.age);
//   }
// }

// const ishu = new Person("ishu", 7);
// ishu.name();
// ishu.pAge();
