const fs = require("fs");

const loadNotes = () => {
  try {
    const dataBuffer = fs.readFileSync("notes.json");
    const dataJson = dataBuffer.toString();
    return JSON.parse(dataJson);
  } catch (e) {
    return [];
  }
};

const saveNotes = (notes) => {
  const notesJson = JSON.stringify(notes);
  fs.writeFileSync("notes.json", notesJson);
};

const addNote = (title, body) => {
  const notes = loadNotes();
  const duplicateNote = notes.find((note) => note.title === title);

  if (duplicateNote) {
    console.log("Note title already exists.");
    return;
  }

  notes.push({ title, body });
  saveNotes(notes);
  console.log("Note added");
};

const removeNote = (title) => {
  const notes = loadNotes();
  const filteredNotes = notes.filter((note) => note.title !== title);

  if (notes.length > filteredNotes.length) {
    saveNotes(filteredNotes);
    console.log("Note deleted");
  } else {
    console.log("Note not found");
  }
};

const listAllNotes = () => {
  const notes = loadNotes();
  notes.forEach((note) => {
    console.log(`${note.title}: ${note.body}`);
  });
  return notes;
};

const readNote = (title) => {
  const notes = loadNotes();
  const note = notes.find((note) => note.title === title);
  return note;
};

const updateNote = (title, body) => {
  const notes = loadNotes();
  const noteIndex = notes.findIndex((note) => note.title === title);

  if (noteIndex === -1) {
    console.log("Note not found");
    return;
  }

  notes[noteIndex].body = body;
  saveNotes(notes);
  console.log("Note updated");
};

module.exports = {
  addNote,
  loadNotes,
  removeNote,
  listAllNotes,
  readNote,
  updateNote,
};
