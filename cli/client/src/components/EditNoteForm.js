import React, { useState, useEffect } from "react";
import axios from "axios";

const EditNoteForm = ({ note, onUpdateNote, setEditMode }) => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  useEffect(() => {
    if (note) {
      setTitle(note.title);
      setBody(note.body);
    }
  }, [note]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.put(`http://localhost:3001/updateNote/${title}`, { body });
      onUpdateNote({ title, body });
    } catch (error) {
      console.error("Error updating note:", error);
    }

    setEditMode(false); // Exit edit mode after saving
  };

  return (
    <div>
      <h2>Edit Note</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>
            Title:
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              disabled // Disable title input in edit mode
            />
          </label>
        </div>
        <div>
          <label>
            Body:
            <textarea value={body} onChange={(e) => setBody(e.target.value)} />
          </label>
        </div>
        <button type="submit">Save</button>
        <button type="button" onClick={() => setEditMode(false)}>
          Cancel
        </button>
      </form>
    </div>
  );
};

export default EditNoteForm;
