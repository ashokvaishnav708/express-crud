import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import { Item } from "./models/items";

dotenv.config();
const mongodbConnString = process.env.MONGODB_CONN_STRING;

const app = express();

app.use(express.urlencoded({ extended: true }));

const port: number = 3000;

mongoose
  .connect(mongodbConnString || "")
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

app.get("/get-items", (req, res) => {
  Item.find()
    .then((items) => {
      res.render("index", { items });
    })
    .catch((err) => console.log(err));
});

app.post("/create-item", (req, res) => {
  const item = new Item(req.body);
  item
    .save()
    .then(() => res.redirect("/"))
    .catch((err) => console.log(err));
});

app.get("/", (req, res) => {
  res.redirect("/get-items");
});

app.get("/add-item", (req, res) => {
  res.render("add-item");
});

app.get("/items/:id", (req, res) => {
  const id = req.params.id;
  Item.findById(id).then((item) => res.render("item-detail", { item }));
});

app.delete("/items/:id", (req, res) => {
  const id = req.params.id;
  Item.findByIdAndDelete(id)
    .then(() => res.json({ redirect: "/get-items" }))
    .catch((err) => console.log(err));
});

app.put("/items/:id", (req, res) => {
  const id = req.params.id;
  Item.findByIdAndUpdate(id, req.body)
    .then(() => res.json({ msg: "Updated Successfully" }))
    .catch((err) => console.log(err));
});

app.use((req, res) => {
  res.render("error");
});
