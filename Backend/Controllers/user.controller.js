const userModel = require('../Models/user.model');
const userService = require('../Services/user.service');
const { validationResult } = require('express-validator');
const blacklistedTokenSchema = require('../Models/blacklistTokens.model');

module.exports.registerUser = async(req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { fullname, email, password } = req.body;

    const isUserAlreadyRegistered = await userModel.findOne({ email });
    if (isUserAlreadyRegistered) {
        return res.status(400).json({ message: 'User already registered' });
    }

    const hashedPassword = await userModel.hashPassword(password);

    const user = await userService.createUser({ 
        firstname: fullname.firstname, lastname: fullname.lastname, email, password: hashedPassword })
    
    const token = user.generateAuthToken();

    res.status(201).json({ user, token });
}

module.exports.loginUser = async(req, res, next) => {

    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    const user = await userModel.findOne( { email } ).select('+password');

    if(!user){
        return res.status(401).json({ message: "Invalid email or password" });
    }

    const isMatch = await user.comparePassword(password);

    if(!isMatch){
        return res.status(401).json({ message: "Invalid email or password" });
    }

    const token = user.generateAuthToken();

    res.cookie('token', token);

    res.status(200).json({user, token});
}

module.exports.getProfile = async(req, res, next) => {

    res.status(200).json({ user: req.user });
}

module.exports.logoutUser = async(req, res, next) => {
    res.clearCookie('token');
    const token = req.cookies.token || req.headers.authorization.split(' ')[1];
    await blacklistedTokenSchema.create({ token });
    res.status(200).json({ message: 'Logged out successfully!' });
}