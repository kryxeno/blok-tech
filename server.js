const express = require("express");
const { MongoClient, ServerApiVersion } = require("mongodb");

const uri = "mongodb+srv://default:default@blok-tech.lidqbyt.mongodb.net/?retryWrites=true&w=majority";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    await client.connect();
    const database = client.db("sample_mflix");
    const movies = database.collection("movies");
    // Query for a movie that has the title 'The Room'
    const query = { title: "De Tim" };
    const options = {
      // sort matched documents in descending order by rating
      sort: { "imdb.rating": -1 },
      // Include only the `title` and `imdb` fields in the returned document
      projection: { _id: 0, title: 1, imdb: 1 },
    };
    const movie = await movies.findOne(query, options);
    // since this method returns the matched document, not a cursor, print it directly
    app.get("/movie", (req, res) => {
      res.send(movie);
    });
  } finally {
    await client.close();
  }
}
run().catch(console.dir);

const app = express();
const port = 3000;
app.use(express.static("public"));

app.set("views", "./views");
app.set("view engine", "ejs");

app.get("/", (req, res) => {
  res.render("index", { text: "Boter" });
});

app.get("/info", (req, res) => {
  res.send("boter");
});

app.get("/about", (req, res) => {
  res.send("boter");
});

app.get("*", (req, res) => {
  res.send("what??? 404!!!!!!!!!!!");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
