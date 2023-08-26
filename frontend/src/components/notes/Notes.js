import React, { useContext, useEffect, useRef, useState } from 'react'
import noteContext from '../../context/notes/noteContext';
import NoteItems from './NoteItems';
import { useHistory } from 'react-router-dom';
import { Link } from "react-router-dom";
import Swal from 'sweetalert2';
import { encrypt, decrypt } from 'n-krypta';

const Notes = (props) => {

  const contextValue = useContext(noteContext);
  let history = useHistory();

  const { notes, getNotes, editNote } = contextValue;

  useEffect(() => {
    if (localStorage.getItem('token')) {
      localStorage.removeItem('findBE');
      localStorage.removeItem('viewFriendProfile');
      localStorage.removeItem('friendshipToken');
      getNotes();
    }
    else {
      history.push("/");
    }
    // eslint-disable-next-line
  }, [])

  const [note, setNote] = useState({ id: "", etitle: "", edescription: "", etag: "" });

  let key = null;
  if (localStorage.getItem('token')) {
    key = localStorage.getItem('token').slice(80, 100);
  }
  else {
    history.push("/");
  }

  const ref = useRef(null);
  const refClose = useRef(null);

  const updateNote = (currentNote) => {
    props.setProgress(0)
    ref.current.click()

    if (localStorage.getItem('token')) {
      // decrypting data here
      const decrypted_title = decrypt(currentNote.title, key);
      const decrypted_description = decrypt(currentNote.description, key);
      const decrypted_tag = decrypt(currentNote.tag, key);
      setNote({ id: currentNote._id, etitle: decrypted_title, edescription: decrypted_description, etag: decrypted_tag })
    }
  }

  const handleUpdate = (e) => {

    if (localStorage.getItem('token')) {
      props.setProgress(50);
      const encrypted_title = encrypt(note.etitle, key);
      const encrypted_description = encrypt(note.edescription, key);
      const encrypted_tag = encrypt(note.etag, key);

      editNote(note.id, encrypted_title, encrypted_description, encrypted_tag);
    }
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
    <section className="vh-100">
      <div className='login-bg-img Buttoncolor'>
        <div className="container">
          <br /><br />
          <div className="modal-footer mt-2">        {/* Add note buttone */}
            <Link title="Add Note" className=" btn fa-solid Buttoncolor fa-circle-plus fa-beat fa-2xl mt-4  ms-auto" to="/addnote" />
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




          <h2 className='container'><strong>Your Note{notes.length > 1 && `s`}</strong></h2>
          <div className='row my-2'>
            <div className="container mx-4">
              {notes.length === 0 && `No Note to Display`}
            </div>
            {notes.map((note) => {
              return <NoteItems key={note._id} setProgress={props.setProgress} updateNote={updateNote} note={note} />
            })}

          </div>
        </div>
        <br />
      </div>
    </section>
  )
}

export default Notes
