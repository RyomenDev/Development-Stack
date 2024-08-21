import "./index.css";
import { useState } from "react";
import ReactDOM from "react-dom/client";
import AddNoteForm from "./src/components/AddNoteForm";
import NoteList from "./src/components/NoteList";

const App = () => {
  const [notes, setNotes] = useState([]);

  const handleAddNote = (newNote) => {
    // console.log(newNote);
    
    setNotes((prevNotes) => [...prevNotes, newNote]);
  };

  return (
    <>
      <h1>Notes Manager</h1>
      <AddNoteForm onAddNote={handleAddNote} notes={notes}/>
      <NoteList notes={notes} setNotes={setNotes}/>
    </>
  );
};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
