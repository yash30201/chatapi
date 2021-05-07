const jwt = require('jsonwebtoken');
const {jwt_SECRET_KEY} = require('../config/config');

const decode = async (req, res, next) => {
    if(!req.headers['authorization']){
        return res.status(400).json({success : false, message : 'No access token provided'});
    }
    const accessToken = req.headers.authorization.split(' ')[1];
    try {
        const decoded = jwt.verify(accessToken, jwt_SECRET_KEY);
        req.userId = decoded.user_id;
        return next();
    } catch (err) {
        return res.status(401).json({ success : false, error : error});
    }
}


module.exports = decode;