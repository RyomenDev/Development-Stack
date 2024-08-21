import React, { useState, useEffect } from "react";
import axios from "axios";
import EditNoteForm from "./EditNoteForm";

const NoteList = ({ notes, setNotes }) => {
  //   const [notes, setNotes] = useState([]);
  const [selectedNote, setSelectedNote] = useState(null);
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const result = await axios.get("http://localhost:3001/listNotes");
        setNotes(result.data);
      } catch (error) {
        console.error("Error fetching notes:", error);
      }
    };

    fetchNotes();
  }, []);

  const handleDelete = async (title) => {
    try {
      await axios.delete(`http://localhost:3001/delete/${title}`);
      setNotes((prevNotes) => prevNotes.filter((note) => note.title !== title));
    } catch (error) {
      console.error("Error deleting note:", error);
    }
  };

  const handleEdit = (note) => {
    setSelectedNote(note);
    setEditMode(true);
  };

  const handleUpdateNote = (updatedNote) => {
    setNotes((prevNotes) =>
      prevNotes.map((note) =>
        note.title === updatedNote.title ? updatedNote : note
      )
    );
    setEditMode(false);
  };

  return (
    <div>
      <ul>
        {notes.map((note) => (
          <li key={note.title}>
            <strong>{note.title}</strong>: {note.body}
            <button onClick={() => handleDelete(note.title)}>Delete</button>
            <button onClick={() => handleEdit(note)}>Edit</button>
          </li>
        ))}
      </ul>
      {editMode && (
        <EditNoteForm
          note={selectedNote}
          onUpdateNote={handleUpdateNote}
          setEditMode={setEditMode}
        />
      )}
    </div>
  );
};

export default NoteList;
