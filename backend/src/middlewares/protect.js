const util = require('util')
const jwt = require('jsonwebtoken')
const {User} = require("../models");

const verifyToken = util.promisify(jwt.verify)

module.exports = async (req, res, next) => {
    const token = req.headers.authorization ? req.headers.authorization.split(' ')[1] : null;

    if (!token) {
        return res.status(401).json({message: 'You need a token'});
    }

    try {
        const decoded = await verifyToken(token, 'hector')
        const user = await User.findById(decoded.id)
        if (!user) {
            res.status(403).json({message: 'Invalid token'});
        }
        req.body.user = user;
        next();
    } catch (error) {
        res.status(403).json({message: 'Invalid token'})
    }
}
