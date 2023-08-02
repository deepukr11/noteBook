const express = require('express');
const User = require('../models/User');
const router = express.Router();
const bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
const fetchuser = require('../midleware/fetchuser');
const { body, validationResult } = require('express-validator');

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
        // check wether the user with the same email exists already 
        let user = await User.findOne({ email: req.body.email })
        if (user) {
            const already = true;
            return res.status(400).json({already, error: "This email already exists." })
        }

        const salt = await bcrypt.genSaltSync(10); //creating salt for protect password
        const hashPass = await bcrypt.hashSync(req.body.password, salt); //add salt in hash password

        user = await User.create({    //create user
            name: req.body.name,
            email: req.body.email,
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
    const {email,password}=req.body;  //get email and password from request

    try {
        let user = await User.findOne({email}); // get user detailes from database

        if(!user){                                // if user not exist
            return res.status(400).json({ success, error: "Please try to login with correct credentials" })
        }
                                 // if user exist 
        const passwordCopare = await bcrypt.compare(password , user.password); // compare login password correct or not
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

})
 
  

module.exports = router