const express = require('express');
const User = require('../models/User');
const router = express.Router();
const bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
const fetchuser = require('../midleware/fetchuser');
const { body, validationResult } = require('express-validator');
const { encrypt} = require('n-krypta'); 

const JWT_SECRET = 'iamhashindia';

// ROUTE 1: create user using: post "./routes/auth/createuser" no loging require
router.post('/createuser', [      //validation check
    body('name', 'enter a valid name').isLength({ min: 3 }),
    body('email', 'enter a valid email').isEmail(),
    body('password', 'Password must be atleast 5 characters').isLength({ min: 5 })
    
], async (req, res) => {  // if there are error => return bad reuest
    const errors = validationResult(req);
    let success = false;
    if (!errors.isEmpty()) {
        return res.status(400).json({success, errors: errors.array() });
    }

    try {

        let key = req.body.email;   // I have useed email as a key for encrypting

        const encrypted_name = encrypt(req.body.name, key);     // encrypting user data(name, email, password)
        const encrypted_email = encrypt(req.body.email, key);
        const encrypted_password = encrypt(req.body.password, key);
        key="";
        

        // check wether the user with the same email exists already 
        let user = await User.findOne({ email: encrypted_email })
        if (user) {
            const already = true;
            return res.status(400).json({already, error: "This email already exists." })
        }
         
        const salt = await bcrypt.genSaltSync(10); //creating salt for protect password
        const hashPass = await bcrypt.hashSync(encrypted_password, salt); //add salt in hash password //bcrypted paswword


        
        user = await User.create({    //create user
            name: encrypted_name,
            email: encrypted_email,
            password: hashPass,
        });

        const data = {
            user: {
                id: user.id
            }
        }
        const authToken = jwt.sign(data, JWT_SECRET);
        success = true;
        res.json({success, authToken });
        // res.json(user);

    } catch (error) {
        console.error(error.messese);
        res.status(500).send(success, "Internal server error");
    }
});

// ROUTE 2: login user using: post  "./routes/auth/login"  no loging require
router.post('/login', [      //validation check
    body('email', 'enter a valid email').isEmail(),
    body('password', 'Password can not be blanked').exists()

], async (req, res) => {  // if there are error => return bad reuest
     let success= false;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ success, errors: errors.array() });
    }
    
    try {

    let key = req.body.email;   // I have useed email as a key for encrypting
    const encrypted_email = encrypt(req.body.email, key);  // encrypting user data(name, email, password)
    const encrypted_password = encrypt(req.body.password, key);
    key="";

        let user = await User.findOne({email: encrypted_email}); // get user detailes from database
        if(!user){                                // if user not exist
            return res.status(400).json({ success, error: "Please try to login with correct credentials" })
        }
        // if user exist 
        // const passwordCompare = await bcrypt.compare(req.body.password , user.password); // compare login password correct or not
        const passwordCopare = await bcrypt.compare(encrypted_password , user.password); 
        if(!passwordCopare){
            return res.status(400).json({success, error: "Please try to login with correct credentials" })
        }
        

        const data = {     // if login password is correct
            user: {
                id: user.id
            }
        }
        const authToken = jwt.sign(data, JWT_SECRET);
        success = true;
        res.json({ success, authToken });

    } catch (error) {
        console.error(error.messese);
        const servererr = true;
        res.status(500).send(servererr, "Internal server error");
    }
})


// ROUTE 3: get logedin user Detailes using: post "./routes/auth/getuser"  loging require
router.post('/getuser', fetchuser, async (req, res) => {
try {
    const userId=req.user.id;
    const user = await User.findById(userId).select("-password");
    res.send(user)
} catch (error) {
    console.error(error.messese);
    res.status(500).send("Internal server error");
}

});
 
  

module.exports = router