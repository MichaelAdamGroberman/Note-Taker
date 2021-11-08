// require Express package
const express = require("express");

// Import the notes module
const notesRouter = require("./notes");
// initiate express application
const app = express();

app.use("/notes", notesRouter);

// export app as module to use elsewhere in the application
module.exports = app;
