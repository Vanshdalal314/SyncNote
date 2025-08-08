import React, { useState } from "react";
import NoteContext from "./noteContext";
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

const NoteState = (props) => {
    const host = "http://localhost:4000"
    const [notes, setNotes] = useState([])

    // Get All notes
    const getNotes = async () => {
        const response = await fetch(`${host}/api/notes/fetchallnotes`, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token')
            },
        })
        const json = await response.json()
        setNotes(json)
    }
    // Create Note
    const createNote = async (title, description, tag) => {
        const response = await fetch(`${host}/api/notes/addnote/`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token')
            },
            body: JSON.stringify({ title, description, tag })
        })
        const note = await response.json()
        setNotes(notes.concat(note))
    }

    // Delete Note
    const deleteNote = async (id) => {
        const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
            method: "DELETE",
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token')
            }
        })
        const json = response.json()
        const newNotes = notes.filter((note) => { return note._id !== id })
        setNotes(newNotes)
    }

    // Export Note
    const exportNote = (note) => {
        const doc = new jsPDF();

        doc.setFontSize(18);
        doc.text(note.title, 10, 20);

        doc.setFontSize(12);
        doc.text(`Tag: ${note.tag}`, 10, 30);

        doc.setFontSize(14);
        doc.text("Description:", 10, 45);
        doc.setFontSize(12);

        const splitDesc = doc.splitTextToSize(note.description, 180);
        doc.text(splitDesc, 10, 55);

        doc.save(`${note.title || 'note'}.pdf`);
    };

    // Edit Note
    const editNote = async (id, title, description, tag) => {
        // API call
        const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token')
            },
            body: JSON.stringify({ title, description, tag })
        })

        let newNotes = JSON.parse(JSON.stringify(notes))
        for (let index = 0; index < newNotes.length; index++) {
            const element = newNotes[index];
            if (element._id === id) {
                newNotes[index].title = title
                newNotes[index].description = description
                newNotes[index].tag = tag
                break
            }

        }
        setNotes(newNotes)
        const json = await response.json()
    }

    return (
        <NoteContext.Provider value={{ notes, createNote, deleteNote, editNote, getNotes, exportNote }}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState