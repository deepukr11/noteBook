const express = require('express');
const router = express.Router();
const Requests = require('../models/Requests');
const Friends = require('../models/Friends');
var jwt = require('jsonwebtoken');
const fetchuser = require('../midleware/fetchuser');
const fetchfriend = require('../midleware/fetchfriend');
const { encrypt} = require('n-krypta');

const JWT_KEY = 'bestmirrorisafriend';

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
            const user2email = encrypt(req.body.user2email, req.user.id);
            const friend = new Friends({
                user1: request.user1,            // first user ID
                user2: req.user.id,              // second user ID
                user1e: request.user1e,          // first user email
                user2e: user2email               // second user email
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
        const user1friends = await Friends.find({ user1: req.user.id });  // fetching all friends of user1 from database
        const user2friends = await Friends.find({ user2: req.user.id });  // fetching all friends of user2 from database
        const friends = user1friends.concat(user2friends);    // user1friends + user2friends
        res.json(friends);

    } catch (error) {
        const servererr = true;
        res.status(500).send({ servererr, error: "Internal server error" });
    }
});


// ROUTE 3: get friend Detailes using: post "/routes/friends/getFriend"  loging require

router.post('/getFriend/:id', fetchuser, async (req, res) => {
    try {
        const friend = await Friends.findById(req.params.id);
        if (!friend) {
            return res.status(404).send("Not Found");   // check that friend is present or not in database
        }
        const data = {
            friendship: {
                id: req.params.id
            }
        }
        const friendshipToken = jwt.sign(data, JWT_KEY); // generate token
        res.json({ friend, friendshipToken });

    } catch (error) {
        const servererr = true;
        res.status(500).send({ servererr, error: "Internal server error" });
    }

});



// ROUTE 4: Unfriend  using: DELETE "./routes/friends/cancelRequest"  loging require

router.delete('/unfriend', fetchuser, fetchfriend, async (req, res) => {
    try {
        // find the Friends to which user wants to Unfriend
        let friend = await Friends.findById(req.friendship.id);
        if (!friend) {
            return res.status(404).send("Not Found");   // check that friend is present or not in database
        }
        // Delete friend of user                   
        await Friends.findByIdAndDelete(req.friendship.id);

        res.json({ "Success": "Unfriended" });

    } catch (error) {
        console.error(error.messese);
        res.status(500).send("Internal server error");
    }
});







module.exports = router