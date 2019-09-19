const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const keys = require('../config/keys');
const mongoose = require('mongoose');

const User = mongoose.model('users');

passport.serializeUser((user, done) => {
    // user.id is the id assigned by mongo for $oid, not the googleid or the profile id
    // identifies the user stored in the database
    done(null, user.id);
})

passport.deserializeUser((id, done) => {
    User.findById(id).then(
        foundUser=>{
            done(null, foundUser);
        }
    )
})

passport.use(new GoogleStrategy({
    clientID: keys.googleClientID,
    clientSecret: keys.googleClientSecret,
    callbackURL: '/auth/google/callback'
    }, async (accessToken, refreshToken, profile, done) => {
        const existingUser = await User.findOne({googleID: profile.id})
        if(existingUser){
            return done(null, existingUser)
        }
        const newUser = await new User ({googleID: profile.id}).save()
        done(null, newUser)
    })
);
