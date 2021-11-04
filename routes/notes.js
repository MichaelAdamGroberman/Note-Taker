const notesRouter = require('express').Router();
const { readFromFile, readAndAppend, writeToFile } = require ('');

// GET Route method for retrieving all the notes in a JSON payload  
notesRouter.get('/', (req, res) => {
    readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)));
});

// POST Route method for creating a new note
notesRouter.post('/', (req,res) => {
    // print the POST payload to the console 
    console.log('POST PAYLOAD', req.body);
    const {title, text} = req.body;
    // if the POST has a valid payload, create a new note by appending the db.json document
    if(req.body) {
        const newNote = {
            id: uuidv4(),
            title,
            text
        },
    }
})