// Import JWT
const jwt = require('jsonwebtoken');

// Check for token
exports.LoggedIn = (req, res, next) => {
    const token = req.header("auth-token"); // Get token from header
    if (!token) return res.status(401).send("Access denied!");  // If token is missing
    try{
        const verified = jwt.verify(token, process.env.JWT_SECRET); // Verify token
        req.user = verified;    // Verified user 
        next(); // Procceed
    }catch(err){
        res.status(400).send("Invalid token!");
    }
}
