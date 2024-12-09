const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const {passport} = require('../../config/passport');
const User = require('./user.model');

module.exports = {
    async signup(req, res, next) {
        try {
            const { firstName, lastName, phone, email, password } = req.body;
            let user = await User.findOne({ email });
            if (user) {
                return res.status(400).json({message: 'User already registered with this email.'});
            }
            user = new User({ firstName, lastName, phone, email, password });
            const newUser = await user.save();
            const leanUser = newUser.toObject();
    
            // Generate token
            const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '2h' });
            const {password: psw, ...rest} = leanUser;
            res.status(201).json({ token, ...rest });
        } catch (err) {
            next(err);
        }
    },

    async login(req, res, next) {
        passport.authenticate('local', { session: false }, (err, user, info) => {
            if (err || !user) {
                return res.status(400).json({
                    message: info ? info.message : 'Login failed',
                    user
                });
            }
    
            const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '2h' });
            const {password, ...rest} = user;
            res.status(200).json({ token, ...rest });
        })(req, res, next);
    },

    async updateUser(req, res, next) {
        const {id} = req.params;
        try {
            const { password, ...restBody } = req.body;
            const encPassword = password ? await bcrypt.hash(password, 12) : password;
            let user = await User.findByIdAndUpdate(id, { ...restBody, encPassword }, {new: true}).lean();
            if (!user) {
                return res.json({message: 'User not found'});
            }
    
            const {password: psw, ...rest} = user;
            res.status(200).json({message: 'User updated successfully.', ...rest });
        } catch (err) {
            next(err);
        }
    },

    async getUser(req, res, next) {
        const {id} = req.params;
        try {
            let user = await User.findById(id).lean();
            if (!user) {
                return res.json({message: 'User not found'});
            }
    
            const {password, ...rest} = user;
            res.status(200).json({message: 'User fetched successfully.', ...rest });
        } catch (err) {
            next(err);
        }
    }
}