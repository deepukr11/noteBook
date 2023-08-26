const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Requests = require('../models/Requests');
const Friends = require('../models/Friends');
const fetchuser = require('../midleware/fetchuser');
const { encrypt, decrypt } = require('n-krypta');


// ROUTE 1: Find User by id using: POST "./routes/user/finduserById"  loging require
router.post('/findUserById', fetchuser, async (req, res) => {
    let success = false;
    let relation = "Follow";
    let reqfrndId = "";
    try {
        const findId = req.body.id;  // this id = The persion we want to find
        const user = await User.findById(findId).select("id");

        if (!user) {                                // if user not exist
            return res.status(404).json({ success, error: "User Note Found" })
        }

        if (req.user.id == findId) {
            success = true;
            relation = "View"
            return res.json({ success, relation, reqfrndId, user });
        }

        // to check that user, got requeste
        let User1 = await Requests.findOne({ user1: findId });
        let User2 = await Requests.findOne({ user2: req.user.id });
        if (User1 && User2) {
            relation = "Accept"; 
            reqfrndId = User2.id;           
        }
        else {
            // to check that user, sent request
            User2 = await Requests.findOne({ user2: findId });
            User1 = await Requests.findOne({ user1: req.user.id });
            if (User1 && User2) {
                relation = "Requested"; 
                reqfrndId = User2.id;
            }
            else {

                // to check that user, friend
                let friend2 = await Friends.findOne({ user2: findId });
                let friend1 = await Friends.findOne({ user1: req.user.id });
         
                if (friend1 && friend2) {
                    relation = "Friend";
                    reqfrndId = friend2.id;                   
                }

                else {
                    friend1 = await Friends.findOne({ user1: findId });
                    friend2 = await Friends.findOne({ user2: req.user.id });                    
                    if (friend1 && friend2) {
                        relation = "Friend";
                        reqfrndId = friend2.id;                       
                    }
                }
            }
        }

        success = true;
        res.json({ success, relation, reqfrndId, user });

    } catch (error) {
        res.status(500).send({ success, error: "Internal server error" });
    }
});


// ROUTE 2: Find User by Email using: POST "./routes/user/finduserByEmail"  loging require
router.post('/findUserByEmail', fetchuser, async (req, res) => {
    let success = false;
    let relation = "Follow";
    let reqfrndId = "";
    try {
        const findEmail = req.body.email;  // this email = The persion we want to find
        const encrypted_email = encrypt(findEmail, findEmail);

        const user = await User.findOne({ email: encrypted_email }).select("-password").select("-date");
        if (!user) {                                // if user not exist
            return res.status(404).json({ success, error: "User Note Found" })
        }
        let findId = user.id;
        
        if (req.user.id === findId) {
            const name = decrypt(user.name, findEmail); 
            const email = decrypt(user.email, findEmail);
            success = true;
            relation = "View"
            return res.json({ success, relation, reqfrndId, findId, name, email });
        }

        // to check that user, got requeste
        let User1 = await Requests.findOne({ user1: findId });
        let User2 = await Requests.findOne({ user2: req.user.id });

        if (User1 && User2) {
            relation = "Accept"; 
            reqfrndId = User2.id;                
        }
        else {
            // to check that user, sent request
            User2 = await Requests.findOne({ user2: findId });
            User1 = await Requests.findOne({ user1: req.user.id });
            if (User1 && User2) {
                relation = "Requested";
                reqfrndId = User2.id;                
            }
            else {
                // to check that user, friend

                let friend2 = await Friends.findOne({user2 : findId});
                let friend1 = await Friends.findOne({ user1: req.user.id});

                if (friend1 && friend2) {
                    relation = "Friend";
                    reqfrndId = friend2.id;
                }
                else {
                    friend1 = await Friends.findOne({ user1: findId });
                    friend2 = await Friends.findOne({ user2: req.user.id });                    
                    if(friend1 && friend2){
                        relation = "Friend";                        
                        reqfrndId = friend2.id;
                    }
                    
                }
            }
        }
        // if User exist 
        const name = decrypt(user.name, findEmail);
        const email = decrypt(user.email, findEmail);
        success = true;
        res.json({ success, relation, reqfrndId, findId, name, email });

    } catch (error) {
        res.status(500).send({ success, error: "Internal server error" });
    }
});



// ROUTE 2: Find User by Email using: POST "./routes/user/findUserName"  loging require
router.post('/findUserName/:id', fetchuser, async (req, res) => {
    let success = false;
    try {
        const findEmail = req.body.email;  // this email = The persion we want to find

        const user = await User.findById(req.params.id).select("-password").select("-date");
      
        if (!user) {                                // if user not exist
            return res.status(404).json({ success, error: "User Note Found" })
        }
        const name = decrypt(user.name, findEmail);
        // const email = decrypt(user.email, findEmail);
        success = true;
        res.json({ success, name});

    } catch (error) {
        res.status(500).send({ success, error: "Internal server error" });
    }
});









module.exports = router