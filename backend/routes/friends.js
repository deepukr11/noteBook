const express = require('express');
const router = express.Router();
const Requests = require('../models/Requests');
const Friends = require('../models/Friends');
const User = require('../models/User');
var jwt = require('jsonwebtoken');
const fetchuser = require('../midleware/fetchuser');
const { encrypt, decrypt} = require('n-krypta');


// ROUTE 1: Accept a new Request using: POST "/routes/friends/acceptRequest"  loging require

router.post('/acceptRequest/:id', fetchuser, async (req, res) => {
    let success = false;
    try {
        // find the request to which user wants to Cancel
        let request = await Requests.findById(req.params.id);
        if (!request) {
            return res.status(404).send("Not Found");   // check that Request is present or not in database
        }
        if (request.user2.toString() == req.user.id) {  // request.user2.toString() gives user id of perticular Request Receiver 
            // adding new friend
            let user2email = "";
            let user2Name = "";
            if(request.user2e){
                user2email =  request.user2e;
                user2Name = request.name2;
            }
            else{
                const user2 = await User.findById(req.user.id).select("name");
                const decryptedName1 = decrypt(user2.name, req.body.user2email);
                user2email = encrypt(req.body.user2email, req.user.id);
                user2Name = encrypt(decryptedName1, req.user.id);
            }

            const friend = new Friends({
                user1: request.user1,            // first user ID
                user2: req.user.id,              // second user ID
                user1e: request.user1e,          // first user email
                name1: request.name1,
                user2e: user2email,               // second user email
                name2: user2Name

            })
            const saveFriend = await friend.save();  // saving Friend in database
            success = true;
            res.json({ success, saveFriend });
        }
        else {
            return res.status(401).send({ success, msg: "Not Allowed" });
        }

    } catch (error) {
        const servererr = true;
        res.status(500).send({ servererr, error: "Internal server error" });
    }
});


// ROUTE 2: get all the Friends using: GET "/routes/friends/fetchFriends"  loging require

router.get('/fetchFriends', fetchuser, async (req, res) => {
    try {
        const user1friends = await Friends.find({ user1: req.user.id }).sort({date: -1});  // fetching all friends of user1 from database
        const user2friends = await Friends.find({ user2: req.user.id }).sort({date: -1});  // fetching all friends of user2 from database
        const friends = user1friends.concat(user2friends);    // user1friends + user2friends
        res.json(friends);

    } catch (error) {
        const servererr = true;
        res.status(500).send({ servererr, error: "Internal server error" });
    }
});

// ROUTE 4: Unfriend  using: DELETE "./routes/friends/cancelRequest"  loging require

router.delete('/unfriend/:id', fetchuser, async (req, res) => {
    try {        
        // Delete friend of user                   
        await Friends.findByIdAndDelete(req.params.id);
        const success = true;

        res.json({ success, msg : "Unfriended" });

    } catch (error) {
        console.error(error.messese);
        res.status(500).send("Internal server error");
    }
});



module.exports = router