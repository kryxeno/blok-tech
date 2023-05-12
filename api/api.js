const app = express();

app.get("/api/user/:id", (req, res) => {
  const users = db.getAllData(client, "match", "users");
  const user = users.find((user) => user.id === req.params.id);
  res.json(user);
});
