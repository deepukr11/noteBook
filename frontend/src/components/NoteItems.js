import React, { useContext } from 'react'
import noteContext from '../context/notes/noteContext';
import Swal from  'sweetalert2';
import {decrypt} from 'n-krypta';

const NoteItems = (props) => {

    const contextValue = useContext(noteContext);
    const { deleteNote } = contextValue; // import deletenote function through context

    const { note, updateNote } = props;

    let key = localStorage.getItem('token').slice(80,100);
    const decrypted_title = decrypt(note.title, key);
    const decrypted_description = decrypt(note.description, key);
    const decrypted_tag = decrypt(note.tag, key);

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
          }).then((result) => {
            props.setProgress(50);
            if (result.isConfirmed) {
                props.setProgress(80);
                deleteNote(note._id);
                props.setProgress(90);
                // props.showAlert("Deleted Successfully", "danger");
                Swal.fire({
                    position: 'top',
                    icon: 'warning',
                    title: 'Deleted Successfully',
                    showConfirmButton: false,
                    timer: 1600
                  })
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
                    <h5 className="card-title"><strong>{decrypted_title}</strong></h5>
                    <p className="card-text">{decrypted_description}</p>
                </div>
                <div className="mx-3 mb-1 ms-auto">{decrypted_tag}</div>
            </div>
            <div className="date">{new Date(note.date).toGMTString()}</div>
        </div>
    )
}

export default NoteItems;
