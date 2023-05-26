const express = require("express");
const router = express.Router();
const faker = require("../server/faker");
const db = require("../utils/database");
router.use(express.json());

// Parse URL-encoded request bodies
router.use(express.urlencoded({ extended: true }));

router.get("/api/user/:id", async (req, res) => {
  const users = await db.getAllData("match", "users");
  const user = users.find((user) => user.id === req.params.id);
  res.json(user);
});

router.post("/api/generate-applicants/:amount", async (req, res) => {
  const applicants = faker.createFakeApplicants(req.params.amount);
  const insert = await db.insertMany("match", "users", applicants);
  if (!insert) {
    res.json({ success: false });
    return;
  }
  res.json({ data: applicants, success: true });
});

router.post("/api/update-seen", async (req, res) => {
  console.log(req.body.id);
  const update = await db.updateOne(
    "match",
    "company_user",
    "viewedApplications",
    req.body.id
  );
  if (!update) {
    res.json({ success: false });
    return;
  }
  res.json({ success: true });
});

router.post("/api/update-saved", async (req, res) => {
  console.log(req.body.id);
  const update = await db.updateOne(
    "match",
    "company_user",
    "savedApplications",
    req.body.id
  );
  if (!update) {
    res.json({ success: false });
    return;
  }
  res.json({ success: true });
});

module.exports = router;
