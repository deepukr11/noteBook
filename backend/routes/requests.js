const express = require('express');
const router = express.Router();
const Requests = require('../models/Requests');
const User = require('../models/User');
const fetchuser = require('../midleware/fetchuser');
const { encrypt, decrypt} = require('n-krypta');




// ROUTE 1: Send a new Request using: POST "./routes/requests/sendRequest"  loging require

router.post('/sendRequest', fetchuser, async (req, res) => {
     let success = false;
     try {
          const { user2, user1email, user2e, name2 } = req.body;
          const user1Name = await User.findById(req.user.id).select("name");
          const decryptedName1 = decrypt(user1Name.name, user1email);
          const name1 = encrypt(decryptedName1, req.user.id);
          const user1e = encrypt(user1email, req.user.id); 
          // adding a new Request of user
          const request = new Requests({
               user1: req.user.id,  // Request Sender ID
               user2,               // Request Receiver ID
               user1e,              // Request Sender email
               name1,
               user2e,               // Request Receiver email
               name2
          })
          const saveRequest = await request.save();  // saving Request in database
          success = true;
          res.json({success, saveRequest});

     } catch (error) {
          console.error(error.messese);
          res.status(500).send({success, error: "Internal server error"});
     }
});


// ROUTE 2: get all the Sender Request using: GET "./routes/requests/fetchSenderRequest"  loging require

router.get('/fetchSenderRequest', fetchuser, async (req, res) => {
     try {
          const senderRequest = await Requests.find({ user1: req.user.id }).sort({date: -1}); // fetching all request of sender from database
          res.json(senderRequest);

     } catch (error) {
          res.status(500).send("Internal server error");
     }
});


// ROUTE 3: get all the Receiver Request using: GET "./routes/requests/fetchReceiverRequest"  loging require

router.get('/fetchReceiverRequest', fetchuser, async (req, res) => {
     try {
          const receiverRequest = await Requests.find({ user2: req.user.id }).sort({date: -1});  // fetching all request of receiver from database
          res.json(receiverRequest);
     } catch (error) {
          console.error(error.messese);
          res.status(500).send("Internal server error");
     }
});


// ROUTE 4: ignore/cancel request  using: DELETE "./routes/requests/cancelRequest"  loging require

router.delete('/cancelRequest/:id', fetchuser, async (req, res) => {
     try {
          // find the request to which user wants to Cancel
          let request = await Requests.findById(req.params.id);

          if (!request) {
               return res.status(404).send("Not Found");   // check that Request is present or not in database
          }

          if (request.user1.toString() == req.user.id) {       // check correct user (user delete only his Request)
               // Delete request for sender                   // request.user1.toString() gives user id of perticular sender Request
               request = await Requests.findByIdAndDelete(req.params.id)
               res.json({ "Success": "Request has be Cancelled", request: request});
          }
          else if(request.user2.toString() == req.user.id){
               // Delete request Receiver                     // request.user2.toString() gives user id of perticular Receiver Request
               request = await Requests.findByIdAndDelete(req.params.id)
               res.json({ "Success": "Request has be Ignored", request: request});
          }
          else{
               return res.status(401).send("Not Allowed");  
          }

     } catch (error) {
          console.error(error.messese);
          res.status(500).send("Internal server error");
     }
});




module.exports = router