const express = require("express");
const db = require("./utils/database");
const app = express();
const port = 3000;
app.use(express.static("public"));

app.set("views", "./views");
app.set("view engine", "ejs");

let client;
let users = [];

(async () => {
  try {
    client = await db.connectDatabase();
    users = await db.getAllData(client, "match", "users");
  } catch (error) {
    console.log(error);
  }

  app.get("/:id", (req, res) => {
    const user = users.find((user) => user.user_id === req.params.id);
    res.render("index", { user });
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
