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
    const companyUser = await db.getAllData("match", "company_user");
    const filteredUsers = users.filter(
      (user) => !companyUser[0].viewedApplications.includes(user._id.toString())
    );

    res.render("index", { filteredUsers });
  });

  app.get("/match", async (req, res) => {
    users = await db.getAllData("match", "users");
    const companyUser = await db.getAllData("match", "company_user");
    const filteredUsers = users.filter(
      (user) => !companyUser[0].viewedApplications.includes(user._id.toString())
    );
    res.render("match", { filteredUsers });
  });

  app.get("/contacts", async (req, res) => {
    users = await db.getAllData("match", "users");
    const companyUser = await db.getAllData("match", "company_user");
    const filteredUsers = users.filter((user) =>
      companyUser[0].savedApplications.includes(user._id.toString())
    );
    res.render("contacts", { filteredUsers });
  });

  // error handling
  app.get("*", (req, res) => {
    res.send("404 | Page not found");
  });

  app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
  });
})();
