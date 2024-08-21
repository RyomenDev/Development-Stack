import React, { useState, useEffect } from "react";
import axios from "axios";

const AddNoteForm = ({ onAddNote, note }) => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

//   useEffect(() => {
//     if (note) {
//       setTitle(note.title);
//       setBody(note.body);
//     }
//   }, [note]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post("http://localhost:3001/add", { title, body });
      onAddNote({ title, body });
      setTitle(""); // Reset title field
      setBody(""); // Reset body field
    } catch (error) {
      console.error("Error adding note:", error);
    }
  };

  return (
    <div>
      <h2>Add Note</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>
            Title:
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </label>
        </div>
        <div>
          <label>
            Body:
            <textarea value={body} onChange={(e) => setBody(e.target.value)} />
          </label>
        </div>
        <button type="submit">Add Note</button>
      </form>
    </div>
  );
};

export default AddNoteForm;
