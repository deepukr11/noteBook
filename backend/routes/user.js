const express = require('express');
const router = express.Router();
const User = require('../models/User');
const fetchuser = require('../midleware/fetchuser');
const { encrypt, decrypt } = require('n-krypta');


// ROUTE 1: Find User by id using: POST "./routes/user/finduserById"  loging require
router.post('/findUserById', fetchuser, async (req, res) => {
    let success = false;
    try {
        const findId = req.body.id;  // this id = The persion we want to find
        const user = await User.findById(findId).select("id");

        if (!user) {                                // if user not exist
            return res.status(404).json({ success, error: "User Note Found" })
        }
        // if User exist  
        success = true;
        res.json({ success, user });

    } catch (error) {
        console.error(error.messese);
        res.status(500).send({success, error: "Internal server error"});
    }
});
 

// ROUTE 2: Find User by Email using: POST "./routes/user/finduserByEmail"  loging require
router.post('/findUserByEmail', fetchuser, async (req, res) => {
    let success = false;
    try {
        const findEmail = req.body.email;  // this email = The persion we want to find
        const encrypted_email = encrypt(findEmail, findEmail);
         
        const user = await User.findOne({email: encrypted_email}).select("-password").select("-date");
        if (!user) {                                // if user not exist
            return res.status(404).json({ success, error: "User Note Found" })
        }
        // if User exist 
        const name = decrypt(user.name, findEmail);
        const email = decrypt(user.email, findEmail);
        const userId = user.id;
        success = true; 
        res.json({ success, userId, name, email });

    } catch (error) {
        console.error(error.messese);
        res.status(500).send({success, error: "Internal server error"});
    }
});






module.exports = router