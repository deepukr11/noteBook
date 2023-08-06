import { useState } from "react";
import NoteContext from "./noteContext";

const NoteState = (props) => {

  const Host = "https://notebookserver.onrender.com"

  const notesInitial = [];

  const [notes, setNote] = useState(notesInitial);
  

  // Get Notes
  const getNotes = async () => {
    const url = `${Host}/api/notes/fetchallnotes`
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem('token')
      },
    });

    const json = await response.json();
    setNote(json)
  }

  // Add Note
  const addNote = async (title, description, tag) => {
    const url = `${Host}/api/notes/addnote`
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem('token')
      },

      body: JSON.stringify({ title, description, tag }),
    });
    const json = await response.json();
    setNote(notes.concat(json));

  }


  // Delete Note
  const deleteNote = async (id) => {
    const url = `${Host}/api/notes/deletenote/${id}`
       
    const response = await fetch(url, {                 
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem('token')
      },

    });
    const newNotes = notes.filter((note) => { return note._id !== id });
    // eslint-disable-next-line   
    const json = await response.json();
    setNote(newNotes);
  }



  // Edit Note
  const editNote = async (id, title, description, tag) => {
    const url = `${Host}/api/notes/updatenote/${id}`   
    const response = await fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem('token')
      },

      body: JSON.stringify({title, description, tag}),
    });
    // eslint-disable-next-line   
    const json = await response.json();

     let newNote = JSON.parse(JSON.stringify(notes))
     
    for (let index = 0; index < newNote.length; index++) {
      const element = newNote[index];
      if (element._id === id) {
        newNote[index].title = title;
        newNote[index].description = description;
        newNote[index].tag = tag;
        break;
      }
    }
    setNote(newNote);
  }



  return (
    <NoteContext.Provider value={{ getNotes, notes, addNote, editNote, deleteNote }}>
      {props.children}
    </NoteContext.Provider>
  )
}

export default NoteState;