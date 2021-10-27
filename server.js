const express = require("express");
const path = require("path");

const PORT = process.env.port || 3001;

const app = express();
// need to create
const api = require("./routes/index.js");

// Middleware for parsing JSON and urlencoded data
app.use(express.json());
app.use(express.urlencoded({ extensions: true }));
app.use("/api", api);

app.use(express.static("public"));

app.get("/", (req, res) => res.sendFile(path.join(__dirname, "/public/")));

app.get("/notes", (req, res) =>
  res.sendFile(path.join(__dirname, "/public/notes.html"))
);

app.listen(PORT, () => {
  console.log("App listening at http://localhost:${PORT}");
});
