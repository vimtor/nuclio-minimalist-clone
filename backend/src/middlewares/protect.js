const util = require('util')
const jwt = require('jsonwebtoken')
const {User} = require("../models");

const verifyToken = util.promisify(jwt.verify)

module.exports = async (req, res, next) => {
    const token = req.headers.authorization ? req.headers.authorization.split(' ')[1] : null;

    if (!token) {
        return res.status(401).json({error: 'You need a token'});
    }

    try {
        const decoded = await verifyToken(token, process.env.JWT_SECRET)
        const exists = await User.exists({_id: decoded.id})
        if (!exists) {
            res.status(403).json({error: 'Invalid token'});
            next()
        }
        req.userId = decoded.id;
        next();
    } catch (error) {
        res.status(403).json({error: 'Invalid token'})
    }
}
