const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;

const User = require('../modules/user/user.model');
const bcrypt = require('bcryptjs');


// Passport configuration
passport.use(new LocalStrategy({ usernameField: 'email' },
    async (email, password, next) => {
        try {
            const user = await User.findOne({ email }).lean();
            if (!user || !await bcrypt.compare(password, user.password)) {
                return next(null, false, { message: 'Incorrect email or password.' });
            }
            return next(null, user);
        } catch (err) {
            return next(err);
        }
}));

const opts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_SECRET
};

passport.use(new JwtStrategy(opts, (jwt_payload, next) => {
    User.findById(jwt_payload.id)
        .then(user => next(null, user))
        .catch(err => next(err, false));
}));


const isAuthenticated = (req, res, next) => {
    passport.authenticate('jwt', { session: false }, (err, user, info) => {
        if (err || !user) {
            return res.status(401).json({
                message: info ? info.message : 'User is not authenticated.',
                user
            });
        }

        req.user = user;
        return next();
      })(req, res, next);
}

module.exports = {passport, isAuthenticated};
