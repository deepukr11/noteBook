import React, { useContext} from 'react'
import noteContext from '../context/notes/noteContext';

const NoteItems = (props) => {

    const contextValue = useContext(noteContext);
    const { deleteNote} = contextValue; // import deletenote function through context

    const { note, updateNote } = props;
    return (
        <div className='col-md-4'>
            <div className="card my-3">
                <div className="card-body">
                    <h5 className="card-title"><strong>{note.title}</strong></h5>
                    <p className="card-text">{note.description}</p>
                    
                    <i className="fa-solid fa-trash-can mt-3" onClick={()=>{deleteNote(note._id);
                     props.showAlert("Deleted Successfully", "success" )}}></i>
                    <i className="fa-solid fa-pen-to-square fa-lg mx-5 " onClick={()=>updateNote(note)}></i>
                </div>
                <div className="mx-3 mb-2 ms-auto">{note.tag}</div>
                
            </div>
        </div>
    )
}

export default NoteItems;
