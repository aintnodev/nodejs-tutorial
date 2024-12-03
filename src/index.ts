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

import Customer from "./models/customers";
import { Request, Response } from "express";

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

app.get("/", (req: Request, res: Response) => {
  res.send(customer);
});

app.get("/api/customers", async (req: Request, res: Response) => {
  // console.log(await mongoose.connection.db.listCollections().toArray());
  try {
    const result = await Customer.find();
    res.json({ customers: result });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

app.get("/api/customers/:id", async (req: Request, res: Response) => {
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

app.get("/api/orders/:id", async (req: Request, res: Response) => {
  console.log(req.params.id);
  const orderId = req.params.id;
  try {
    const order = await Customer.findOne({ "orders._id": orderId });
    if (order) {
      res.json(order);
    } else {
      res.status(404).json({ error: "order not found" });
    }
  } catch (e) {
    console.log(e.message);
    res.status(500).json({ error: "something went wrong" });
  }
});

app.put("/api/customers/:id", async (req: Request, res: Response) => {
  try {
    const customerId = req.params.id;
    const customer = await Customer.findOneAndReplace(
      { _id: customerId },
      req.body,
      { new: true },
    );
    console.log(customer);
    res.json({ customer });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

app.patch("/api/customers/:id", async (req: Request, res: Response) => {
  try {
    const customerId = req.params.id;
    const customer = await Customer.findOneAndUpdate(
      { _id: customerId },
      req.body,
      { new: true },
    );
    console.log(customer);
    res.json({ customer });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

app.patch("/api/orders/:id", async (req: Request, res: Response) => {
  console.log(req.params);
  const orderId = req.params.id;
  req.body._id = orderId;
  try {
    const result = await Customer.findOneAndUpdate(
      { "orders._id": orderId },
      { $set: { "orders.$": req.body } },
      { new: true },
    );
    console.log(result);
    if (result) {
      res.json(result);
    } else {
      res.status(404).json({ error: "something went wrong" });
    }
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

app.delete("/api/customers/:id", async (req: Request, res: Response) => {
  try {
    const customerId = req.params.id;
    const result = await Customer.deleteOne({ _id: customerId });
    res.json({ deletedCount: result.deletedCount });
  } catch (e) {
    res.status(505).json({ error: "something went wrong" });
  }
});

app.post("/", (req: Request, res: Response) => {
  res.send(customer);
});

app.post("/api/customers", async (req: Request, res: Response) => {
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
