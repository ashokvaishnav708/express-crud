import express from "express";
import mongoose from "mongoose";
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const port: number = 3000;

const mongodbConnString = process.env.MONGODB_CONN_STRING;

mongoose
  .connect(mongodbConnString)
  .then(() => console.log("Connected to mongoDB"))
  .catch((err) => console.log("Error connecting to mongoDB: ", err));

app.set("view engine", "ejs");

app.listen(port, (error) => {
  if (error) {
    console.log("Error: ", error);
  } else {
    console.log(`Server started on localhost at port ${port}`);
  }
});

app.get("/", (req, res) => {
  const items: { name: string; price: number }[] = [
    { name: "mobile phone", price: 1000 },
    { name: "book", price: 30 },
    { name: "computer", price: 2000 },
  ];
  res.render("index", { items });
});

app.get("/add-item", (req, res) => {
  res.render("add-item");
});

app.use((req, res) => {
  res.render("error");
});
