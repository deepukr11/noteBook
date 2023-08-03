import React, { useContext } from 'react'
import noteContext from '../context/notes/noteContext';
import Swal from  'sweetalert2';

const NoteItems = (props) => {

    const contextValue = useContext(noteContext);
    const { deleteNote } = contextValue; // import deletenote function through context

    const { note, updateNote } = props;
    const handleDeleteNote =  () => { 
        props.setProgress(0);
        Swal.fire({
            title: 'Are you sure?',
            text: "You want to Delete this Note!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
          }).then(async(result) => {
            props.setProgress(50);
            if (result.isConfirmed) {
                props.setProgress(80);
                await deleteNote(note._id);
                props.setProgress(90);
                props.showAlert("Deleted Successfully", "danger");
                props.setProgress(99);
            }
            props.setProgress(100);
          })
    }

    return (
        <div className='col-md-4'>
            <div className="card mt-3">
                <div className="card-body">
                    <div className="d-flex">
                        <i className="fa-solid fa-trash-can fa-sm ms-auto" onClick={handleDeleteNote} />
                        <div className="mx-2"></div>
                        <i className="fa-solid fa-pen-to-square fa-lg" onClick={() => updateNote(note)} />
                    </div>
                    <h5 className="card-title"><strong>{note.title}</strong></h5>
                    <p className="card-text">{note.description}</p>
                </div>
                <div className="mx-3 mb-1 ms-auto">{note.tag}</div>
            </div>
            <div className="date">{new Date(note.date).toGMTString()}</div>
        </div>
    )
}

export default NoteItems;
