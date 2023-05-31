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

router.post("/api/delete-applicant/:id", async (req, res) => {
  const response = await db.deleteOne(
    "match",
    "company_user",
    "savedApplications",
    req.params.id
  );
  if (!response) {
    res.json({ success: false });
    return;
  }
  res.json({ success: true });
});

router.post("/contacts", async (req, res) => {
  const response = await db.deleteOne(
    "match",
    "company_user",
    "savedApplications",
    req.body.userId
  );
  if (!response) {
    res.send("Error updating database");
    return;
  }
  res.redirect("/contacts");
});

router.post("/api/generate-applicants/:amount", async (req, res) => {
  const applicants = faker.createFakeApplicants(req.params.amount);
  const insert = await db.insertMany("match", "company_user", applicants);
  if (!insert) {
    res.json({ success: false });
    return;
  }
  res.json({ data: applicants, success: true });
});

// fallback route for no js
router.post("/", async (req, res) => {
  const applicants = faker.createFakeApplicants(req.body.amount);
  const insert = await db.insertMany("match", "users", applicants);
  if (!insert) {
    res.send("Error updating database");
    return;
  }
  res.redirect("/");
});

router.post("/api/update-seen/:id", async (req, res) => {
  if (!req.params.id) {
    res.json({ success: false });
    return;
  }
  const update = await db.updateOne(
    "match",
    "company_user",
    "viewedApplications",
    req.params.id
  );
  if (!update) {
    res.json({ success: false });
    return;
  }
  res.json({ success: true });
});

router.post("/api/update-saved/:id", async (req, res) => {
  if (!req.params.id) {
    res.json({ success: false });
    return;
  }
  const update = await db.updateOne(
    "match",
    "company_user",
    "savedApplications",
    req.params.id
  );
  const update2 = await db.updateOne(
    "match",
    "company_user",
    "viewedApplications",
    req.params.id
  );
  if (!update || !update2) {
    res.json({ success: false });
    return;
  }
  res.json({ success: true });
});

// fallback route for no js
router.post("/match", async (req, res) => {
  console.log(req.body);
  const update = await db.updateOne(
    "match",
    "company_user",
    "viewedApplications",
    req.body.userId
  );
  if (req.body.type === "saved") {
    const update2 = await db.updateOne(
      "match",
      "company_user",
      "savedApplications",
      req.body.userId
    );
    if (!update2) {
      res.send("Error updating database");
      return;
    }
  }
  if (!update) {
    res.send("Error updating database");
    return;
  }
  res.redirect("/match");
});

module.exports = router;
