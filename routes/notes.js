const notesRouter = require("express").Router();
const fs = require("fs");
const util = require("util");
// npm package to generate unique ID's because we are using a simple JSON document as the db (MONGO and SQL automatically create a unique ID for you)
const { v4: uuidv4 } = require("uuid");

// defining fs and util functions
const readFromFile = util.promisify(fs.readFile);
const writeToFile = (destination, content) =>
  fs.writeFile(destination, JSON.stringify(content, null, 4), (err) =>
    err ? console.error(err) : console.info(`\nData written to ${destination}`)
  );
const readAndAppend = (content, file) => {
  fs.readFile(file, "utf8", (err, data) => {
    if (err) {
      console.error(err);
    } else {
      const parsedData = JSON.parse(data);
      parsedData.push(content);
      writeToFile(file, parsedData);
    }
  });
};
// GET Route method for retrieving all the notes in a JSON payload
notesRouter.get("/", (req, res) => {
  readFromFile("./db/db.json").then((data) => res.json(JSON.parse(data)));
});

// POST Route method for creating a new note
notesRouter.post("/", (req, res) => {
  // print the POST payload to the console
  console.log("POST PAYLOAD", req.body);
  const { title, text } = req.body;
  // if the POST has a valid payload, create a new note by appending the db.json document
  if (req.body) {
    const newNote = {
      id: uuidv4(),
      title,
      text,
    };
    readAndAppend(newNote, "./db/db.json");
    res.json;
    ("Note appended successfully");
  } else {
    res.error("Error adding/appending note");
  }
});

// DELETE Route method for a specific note
notesRouter.delete("/:id", (req, res) => {
  // Define the specific note ID to remove
  const noteID = req.params.id;
  // read the json file and grab all the data
  readFromFile("./db/db.json")
    // Parse the data in the JSON
    .then((data) => JSON.parse(data))
    .then((json) => {
      //   Filter the parsed data for all note ID's, except for noteID (specific note), and then store the parsed data as a new constant
      const appendedDB = json.filter((note) => note.id !== noteID);

      // Save the data to the db.json file
      writeToFile("./db/db.json", appendedDB);

      // Send a response for the api request
      res.json("Note has been successfully deleted");
    });
});

// export as module to use elsewhere in the app
module.exports = notesRouter;
