const express = require("express");
const db = require("./utils/database");
const faker = require("./server/faker");
const app = express();
const port = 3000;
app.use(express.static("public"));
const apiRoutes = require("./api/api");
app.use("/", apiRoutes);

app.set("views", "./views");
app.set("view engine", "ejs");

let client;
let users = [];

(async () => {
  try {
    client = await db.connectDatabase();
  } catch (error) {
    console.log(error);
  }

  app.get("/", async (req, res) => {
    users = await db.getAllData("match", "users");
    res.render("index", { users });
  });

  app.get("/match", async (req, res) => {
    users = await db.getAllData("match", "users");
    res.render("match", { users });
  });

  app.get("/info", (req, res) => {
    res.send("boter");
  });

  app.get("/about", (req, res) => {
    res.send("boter");
  });

  // error handling
  app.get("*", (req, res) => {
    res.send("404 | Page not found");
  });

  app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
  });
})();
