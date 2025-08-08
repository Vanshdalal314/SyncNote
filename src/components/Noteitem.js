import React, { useContext } from 'react'
import '../App.css';
import noteContext from '../context/notes/noteContext'


const Noteitem = (props) => {
    const context = useContext(noteContext)
    const { deleteNote } = context
    const { exportNote } = context
    const { note, updateNote } = props
    return (
        <div className="col-md-3" id={`note-${note._id}`}>
            <div className="card my-2">
                <div className="card-body">
                    <div className="d-flex align-items-center">
                        <h5 className="card-title overflow-hidden title-text">{note.title}</h5>
                    </div>
                    <div className="d-flex align-items-center">
                        <i className="fa-solid fa-tag"></i><h6 className="card-title mx-2 my-2">{note.tag}</h6>
                    </div>
                    <p className="card-text overflow-hidden description-text my-2 mx-2">{note.description}</p>
                    <div className="d-flex justify-content-end align-items-center">
                        <i className="fa-solid fa-trash mx-2 my-4" onClick={() => { deleteNote(note._id); props.showAlert(" Deleted Successfully", "success") }}></i>
                        <i className="fa-solid fa-pencil mx-2 my-4" onClick={() => { updateNote(note);}}></i>
                        <i class="fa-solid fa-download mx-2 my-4" onClick={() => { exportNote(note); props.showAlert(" Note Exported as PDF ", "success") }}></i>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Noteitem
