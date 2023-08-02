const express = require('express');
const router = express.Router();
const Notes = require('../models/Notes');
const fetchuser = require('../midleware/fetchuser');
const { body, validationResult } = require('express-validator');


// ROUTE 1: get all the notes using: GET "./routes/notes/fetchallnotes"  loging require
router.get('/fetchallnotes', fetchuser, async (req, res) => {
     try {
          const notes = await Notes.find({ user: req.user.id });  // fetching all notes of user from database
          res.json(notes);

     } catch (error) {
          console.error(error.messese);
          res.status(500).send("Internal server error");
     }
});


// ROUTE 2: Add a new note using: POST "./routes/notes/addnote"  loging require

router.post('/addnote', fetchuser, [     // validation check
     body('title', 'Enter a valid title').isLength({ min: 3 }),
     body('description', 'Description must be atleast 5 characters').isLength({ min: 5 })
], async (req, res) => {
     try {
          const { title, description, tag } = req.body;
          const errors = validationResult(req);    // if there are error => return bad reuest
          if (!errors.isEmpty()) {
               return res.status(400).json({ errors: errors.array() });
          }
          // adding a new note of user
          const note = new Notes({
               title, description, tag, user: req.user.id
          })
          const saveNote = await note.save();  // saving notes in database
          res.json(saveNote);

     } catch (error) {
          console.error(error.messese);
          res.status(500).send("Internal server error");
     }
})


// ROUTE 3: updating a note using: PUT "./routes/notes/updatenote"  loging require

router.put('/updatenote/:id', fetchuser, async (req, res) => {
     try {
          const { title, description, tag } = req.body;
          // create a new note
          const newNote = {};
          if (title) { newNote.title = title };
          if (description) { newNote.description = description };
          if (tag) { newNote.tag = tag };

          // find the note to be updated and update
          let note = await Notes.findById(req.params.id);

          if (!note) {
               return res.status(404).send("Not Found");   // check that note is present or not in database
          }
          if (note.user.toString() !== req.user.id) {       // check correct user (user update only his note)
               return res.status(401).send("Not Allowed");  // note.user.toString() give user id of perticular note
          }

          // updating note
          note = await Notes.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true });
          res.json(note);

     } catch (error) {
          console.error(error.messese);
          res.status(500).send("Internal server error");
     }
});


// ROUTE 4: Delete a note using: DELETE "./routes/notes/deletenote"  loging require


router.delete('/deletenote/:id', fetchuser, async (req, res) => {
     try {
          // find the note to which user wants to Delete
          let note = await Notes.findById(req.params.id);

          if (!note) {
               return res.status(404).send("Not Found");   // check that note is present or not in database
          }
          if (note.user.toString() !== req.user.id) {       // check correct user (user delete only his note)
               return res.status(401).send("Not Allowed");  // note.user.toString() give user id of perticular note
          }

          // Delete note
          note = await Notes.findByIdAndDelete(req.params.id)
          res.json({ "Success": "Note has be Deleted", note: note });

     } catch (error) {
          console.error(error.messese);
          res.status(500).send("Internal server error");
     }
});


module.exports = router