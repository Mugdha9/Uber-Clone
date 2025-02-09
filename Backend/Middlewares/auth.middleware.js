const userModel = require('../Models/user.model');
const captainModel = require('../Models/captain.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const blacklistTokensModel = require('../Models/blacklistTokens.model');

module.exports.authUser = async(req, res, next) => {
    const token = req.cookies.token || req.headers.authorization?.split(' ')[1];
    if (!token) {
        return res.status(401).json({ error: 'You are not authenticated!' });
    }

    const isBlackListed = await blacklistTokensModel.findOne({ token });

    if (isBlackListed) {
        return res.status(401).json({ message: 'Unauthorized access' });
    }

    try{
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await userModel.findById(decoded._id);

        req.user = user;

        return next();
    }
    catch(error) {
        return res.status(401).json({ error: 'Unauthorized!' });
    }
}

module.exports.authCaptain = async(req, res, next) => {
    const token = req.cookies.token || req.headers.authorization?.split(' ')[1];
    if (!token){
        return res.status(401).json({ error: 'You are not a authenticated!'});
    }

    const isBlackListed = await blacklistTokensModel.findOne({ token });

    if (isBlackListed) {
        return res.status(401).json({ message: 'Unauthorized access' });
    }

    try{
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const captain = await captainModel.findById(decoded._id);
        req.captain = captain;

        return next();
    }catch(error){
        return res.status(401).json({ error: 'Unauthorized!' });
    }
} 