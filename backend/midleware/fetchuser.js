var jwt = require('jsonwebtoken');

const JWT_SECRET = 'iamhashindia';

const fetchuser = (req, res, next) => {
    // get the user from the jwt token and add id to req object
    let success=false;
    const token = req.header("auth-token");
    if (!token) {
        return res.status(401).send({success, error: "Please authenticate using a valid token" })
    }
    try {
        const data = jwt.verify(token, JWT_SECRET); // verify token to JWT_SECRET
        req.user = data.user;
    } catch (error) {
        return res.status(401).send({success, error: "Please authenticate using a valid token" })
    }
    next();
}

module.exports = fetchuser;