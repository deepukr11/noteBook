import React, { useContext, useEffect, useRef, useState } from 'react'
import noteContext from '../context/notes/noteContext';
import NoteItems from './NoteItems';
import { useHistory} from 'react-router-dom';
import { Link } from "react-router-dom";
import Swal from  'sweetalert2';

const Notes = (props) => {

  const contextValue = useContext(noteContext);
  let history = useHistory();
 
  const { notes, getNotes, editNote } = contextValue;

  useEffect(() => {
    if (localStorage.getItem('token')) {
      getNotes();
    }
    else {
      history.push("/");
    }
    // eslint-disable-next-line
  }, [])

  const [note, setNote] = useState({ id: "", etitle: "", edescription: "", etag: "" });

  const ref = useRef(null);
  const refClose = useRef(null);

  const updateNote = (currentNote) => {
    props.setProgress(0)
    ref.current.click()
    setNote({ id: currentNote._id, etitle: currentNote.title, edescription: currentNote.description, etag: currentNote.tag })
  }

  const handleUpdate =  (e) => {
    props.setProgress(50);
    editNote(note.id, note.etitle, note.edescription, note.etag);
    props.setProgress(70);
    refClose.current.click();
    props.setProgress(80)
    // showAlert("Updated Successfully", "success");
    Swal.fire({
      position: 'top',
      icon: 'success',
      title: 'Updated Successfully',
      showConfirmButton: false,
      timer: 2500
    })
    props.setProgress(100)
  }
  const onChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value })
  }

  return (
    <div className='login-bg-img Buttoncolor container'>
      <div className="container">
        <br />
        <div className="modal-footer mt-5">        {/* Add note buttone */}
          <Link className=" btn fa-solid Buttoncolor fa-circle-plus fa-beat fa-2xl mt-4  ms-auto" to="/addnote" />
        </div>

        <i ref={ref} className="fa-solid fa-plus fa-2xl mt-4 me-5 ms-auto d-none" data-bs-toggle="modal" data-bs-target="#exampleModal"></i>
        <div className="modal fade texte-dit-color" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div className="modal-dialog ">
            <div className="modal-content bg-img text ">
              <div className="modal-header">
                <h1 className="modal-title fs-5 " id="exampleModalLabel"><strong>Edit Note</strong></h1>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div className="modal-body  ">
                <form>
                  <div className="mb-3 mt-2">
                    <label htmlFor="etitle" className="form-label"><strong>Title:</strong></label>
                    <input type="text" className="form-control" id="etitle" name="etitle" value={note.etitle} aria-describedby="emailHelp" onChange={onChange} />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="edescription" className="form-label"><strong>Description:</strong></label>
                    <input type="text" className="form-control" id="edescription" value={note.edescription} name="edescription" onChange={onChange} />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="etag" className="form-label"><strong>Tag:</strong></label>
                    <input type="text" className="form-control" id="etag" value={note.etag} name="etag" onChange={onChange} />
                  </div>
                </form>
              </div>
              <div className="modal-footer">
                <button type="button" ref={refClose} className="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                <button type="button" onClick={handleUpdate} className="btn btn-outline-light text">Update Note</button>
              </div>
            </div>
          </div>
        </div>




        <h2 className='container'><strong>Your Notes</strong></h2>
        <div className='row my-2'>
          <div className="container mx-4">
            {notes.length === 0 && `No Note to Display`}
          </div>
          {notes.map((note) => {
            return <NoteItems key={note._id} setProgress={props.setProgress} updateNote={updateNote} note={note}/>
          })}

        </div>
      </div>
      <br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
      <br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
    </div>
  )
}

export default Notes
