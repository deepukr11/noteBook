const express = require('express');
const router = express.Router();
const Messages = require('../models/Message');
const fetchuser = require('../midleware/fetchuser');
const { body, validationResult } = require('express-validator');
const { encrypt } = require('n-krypta');



// ROUTE 1: fetch all the Messages using: GET "./routes/messages/fetchMessages"  loging require
router.get('/fetchMessages/:chatID', fetchuser, async (req, res) => {
     try {
          const message = await Messages.find({ chatID: req.params.chatID }) // fetching all message of a chat from database
          res.json(message);

     } catch (error) {
          console.error(error.messese);
          res.status(500).send("Internal server error");
     }
});


// ROUTE 2: Add a new message using: POST "./routes/messages/sendMessage"  loging require

router.post('/sendMessage', fetchuser, [     // validation check
     body('text', 'Enter a valid text').isLength({ min: 1 })
], async (req, res) => {
     try {
          const errors = validationResult(req);    // if there are error => return bad reuest
          if (!errors.isEmpty()) {
               return res.status(400).json({ errors: errors.array() });
          } 
          // adding a new message of user
          const messageEncrypt = encrypt(req.body.text, req.user.id);
          const message = await Messages.create({
               chatID: req.body.chatID,
               senderID: req.user.id,
               text: messageEncrypt
          });
          res.json(message);

     } catch (error) {
          console.error(error.messese);
          res.status(500).send("Internal server error");
     }
})


// ROUTE 3: editing a message using: PUT "/routes/message/editMessage"  loging require

router.put('/editMessage/:id', fetchuser, [     // validation check
     body('text', 'Enter a valid text').isLength({ min: 1 })
], async (req, res) => {
     try {
          const errors = validationResult(req);    // if there are error => return bad reuest
          if (!errors.isEmpty()) {
               return res.status(400).json({ errors: errors.array() });
          }
          // find the message to be updated
          let message = await Messages.findById(req.params.id);
          if (!message) {
               return res.status(404).send("Not Found");   // check that message is present or not in database
          }
          if (message.senderID.toString() !== req.user.id) {       // only sender can edit his own msg
               return res.status(401).send("Not Allowed");
          }
          const messageEncrypt = encrypt(req.body.text, req.user.id);
          // edit message
          await Messages.findByIdAndUpdate(req.params.id,
               {
                    $set: { text: messageEncrypt }
               },
               { new: true });
               const edited = true;
          res.json(edited);

     } catch (error) {
          console.error(error.messese);
          res.status(500).send("Internal server error");
     }
});


// ROUTE 4: Delete a message using: DELETE "./routes/messages/deleteMessage"  loging require

router.delete('/deleteMessage/:id', fetchuser, async (req, res) => {
     try {
          // find the message to which user wants to Delete
          let message = await Messages.findById(req.params.id);

          if (!message) {
               return res.status(404).send("Not Found");   // check that message is present or not in database
          }
          if (message.senderID.toString() !== req.user.id) {       // only sender can edit his own msg
               return res.status(401).send("Not Allowed");
          } 
          // Delete message
          await Messages.findByIdAndDelete(req.params.id);
          const deleted = true;
          res.json({deleted})
     } catch (error) {
          console.error(error.messese);
          res.status(500).send("Internal server error");
     }
});


module.exports = router