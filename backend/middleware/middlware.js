const jwt = require('jsonwebtoken');

const authenticatUser = async ( req, res, next) => {
    try {
        const token = req.cookies.token;

        if(!token) return res.status(401).json({message: "Access Denied. No token."});

        const varifyToken = await jwt.verify(token, process.env.JWT_SECRET);
        req.user = varifyToken;

        next();
        
    } catch (error) {
        console.log("error in authentication user")
        return res.status(500).json({ message: 'Please login again' });
    }
}

module.exports = {authenticatUser};