var jwt = require('jsonwebtoken');

const JWT_KEY = 'bestmirrorisafriend';

const fetchfriend = (req, res, next) => {
    // get the user from the jwt token and add id to req object
    let success=false;
    const token = req.header("friendshipToken");
    if (!token) {
        return res.status(401).send({success, error: "Please authenticate using a valid friendship token" })
    }
    try {
        const tokendata = jwt.verify(token, JWT_KEY); // verify token to JWT_SECRET
        req.friendship = tokendata.friendship;     // saving tokendata.friendship in req.friendship
    } catch (error) {
        return res.status(401).send({success, error: "Please authenticate using a valid token" })
    }
    next();
}

module.exports = fetchfriend;