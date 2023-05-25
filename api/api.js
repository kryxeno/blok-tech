const express = require("express");
const router = express.Router();
const faker = require("../server/faker");
const db = require("../utils/database");
const client = require("../server");

router.get("/api/user/:id", (req, res) => {
  const users = db.getAllData("match", "users");
  const user = users.find((user) => user.id === req.params.id);
  res.json(user);
});

router.post("/api/generate-applicants/:amount", (req, res) => {
  const applicants = faker.createFakeApplicants(req.params.amount);
  const insert = db.insertMany("match", "users", applicants);
  if (!insert) {
    res.json({ success: false });
    return;
  }
  res.json({ data: applicants, success: true });
});

module.exports = router;
