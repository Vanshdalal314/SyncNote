import React, { useContext, useState } from 'react'
import noteContext from '../context/notes/noteContext'

const CreateNote = (props) => {
    const context = useContext(noteContext)
    const { createNote } = context

    const [note, setNote] = useState({ title: "", description: "", tag: "" })
    const handleClick = (e) => {
        e.preventDefault()
        createNote(note.title, note.description, note.tag)
        setNote({ title: "", description: "", tag: "" })
        props.showAlert(" Note Created Successfully", "success")
    }
    const onChange = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value })
    }
    return (
        <div className="container mx-5 my-5">
            <h2>Add a note</h2>
            <form className="my-3">
                <div className="mb-3">
                    <label htmlFor="title" className="form-label">Title</label>
                    <input type="text" className="form-control" id="title" name="title" value={note.title} onChange={onChange} minLength={3} required />
                </div>
                <div className="mb-3">
                    <label htmlFor="description" className="form-label">Description</label>
                    <textarea type="textarea" className="form-control" id="description" row="4" name="description" value={note.description} onChange={onChange} minLength={3} required />
                </div>
                <div className="mb-3">
                    <label htmlFor="tag" className="form-label">Tag</label>
                    <input type="textarea" className="form-control" id="tag" name="tag" value={note.tag} onChange={onChange} />
                </div>

                <button disabled={note.title.length < 3 || note.description.length < 8} type="submit" className="btn btn-primary" onClick={handleClick}>Create Note</button>
            </form>
        </div>
    )
}

export default CreateNote
