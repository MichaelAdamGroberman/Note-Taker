// Require Express and Path
const express = require("express");
const path = require("path");

// define express app and port to use
const app = express();
const PORT = process.env.PORT || 3001;

const api = require("./routes/index.js");

// Middleware for parsing JSON and urlencoded data
app.use(express.json());
app.use(express.urlencoded({ extensions: true }));
app.use("/api", api);
app.use(express.static("public"));

// GET method when user goes to the domain
app.get("/", (req, res) => res.sendFile(path.join(__dirname, "/public/")));

// GET method for Notes, takes the user to the notes page
app.get("/notes", (req, res) =>
  res.sendFile(path.join(__dirname, "/public/notes.html"))
);
// Listen for api requests on defined port and print to the console
app.listen(PORT, () => {
  console.log("App running at http://localhost:${PORT}");
});
