const express = require("express");
const cors = require("cors");

const yargs = require("yargs");
const {
  addNote,
  removeNote,
  listAllNotes,
  readNote,
  updateNote,
} = require("./app");

const app = express();
const PORT = 3001;
// Middleware to parse JSON bodies
app.use(express.json());
app.use(cors()); // Enable CORS

// Yargs setup for CLI commands
yargs.version("1.1.1");

yargs.command({
  command: "add",
  describe: "Add a new note",
  builder: {
    title: {
      describe: "Note title",
      type: "string",
      demandOption: true,
    },
    body: {
      describe: "Note body",
      type: "string",
      demandOption: true,
    },
  },
  handler: function ({ title, body }) {
    addNote(title, body);
  },
});

yargs.command({
  command: "delete",
  describe: "Delete a note",
  builder: {
    title: {
      describe: "Note title",
      type: "string",
      demandOption: true,
    },
  },
  handler: function ({ title }) {
    removeNote(title);
  },
});

yargs.command({
  command: "listNotes",
  describe: "List all notes",
  handler: function () {
    listAllNotes();
  },
});

yargs.command({
  command: "readNote",
  describe: "Read a note",
  builder: {
    title: {
      describe: "Note title",
      type: "string",
      demandOption: true,
    },
  },
  handler: function ({ title }) {
    const note = readNote(title);
    if (!note) {
      console.log("Note not found");
    } else {
      console.log(`${note.title}: ${note.body}`);
    }
  },
});

yargs.command({
  command: "updateNote",
  describe: "Update a note",
  builder: {
    title: {
      describe: "Note title",
      type: "string",
      demandOption: true,
    },
    body: {
      describe: "Note body",
      type: "string",
      demandOption: true,
    },
  },
  handler: function ({ title, body }) {
    updateNote(title, body);
  },
});

// Parse yargs arguments for CLI
yargs.parse();

// Express routes for API
app.get("/listNotes", (req, res) => {
  const notes = listAllNotes();
  res.json(notes);
});

app.post("/add", (req, res) => {
  const { title, body } = req.body;
  addNote(title, body);
  res.status(201).send("Note added");
});

app.delete("/delete/:title", (req, res) => {
  const { title } = req.params;
  removeNote(title);
  res.send("Note deleted");
});

app.get("/readNote/:title", (req, res) => {
  const { title } = req.params;
  const note = readNote(title);
  if (!note) {
    return res.status(404).send("Note not found");
  }
  res.json(note);
});

app.put("/updateNote/:title", (req, res) => {
  const { title } = req.params;
  const { body } = req.body;
  updateNote(title, body);
  res.send("Note updated");
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
