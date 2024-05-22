import React, { useEffect, useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import Note from "./Note";
import CreateArea from "./CreateArea";
import { dkeeper } from "../../../declarations/dkeeper";

function App() {

  useEffect(() => {
    console.log("i am triggereds")
    fetchData();
  }, [])

  const fetchData = async () => {
    const notesArray = await dkeeper.readNotes();
    setNotes(notesArray);
  }

  const [notes, setNotes] = useState([]);

  async function addNote(newNote) {
    try {
      if(!newNote.content.length){
        throw "Content cannot be empty";
      }
      await dkeeper.createNote(newNote.title, newNote.content)
      setNotes(prevNotes => {
        return [newNote, ...prevNotes];
      }); 
    } catch (error) {
      console.log(error)
      alert("Failed to add note. Error: " + error)
    }
  }

  async function deleteNote(id) {
    try {
      await dkeeper.removeNote(id)
    setNotes(prevNotes => {
      return prevNotes.filter((noteItem, index) => {
        return index !== id;
      });
    });
    } catch (error) {
      console.log(error)
      alert("Failed to delete note")
    }
  }

  return (
    <div>
      <Header />
      <CreateArea onAdd={addNote} />
      {notes.map((noteItem, index) => {
        return (
          <Note
            key={index}
            id={index}
            title={noteItem.title}
            content={noteItem.content}
            onDelete={deleteNote}
          />
        );
      })}
      <Footer />
    </div>
  );
}

export default App;
