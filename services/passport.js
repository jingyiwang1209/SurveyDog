const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const key = require('../config/key');
const mongoose = require('mongoose');
const User = mongoose.model('users');


// 'user' is either that exisiting user or that new user
// 'id' is the id mongodb automatically generated.'user.id' is the shortcut to get the id
passport.serializeUser((user, done)=>{
    done(null, user.id);
});


// .Serialized user.id is stuffed into cookie in client side.
// see index.js

// 'id' here is the one in the cookie included in the client's request, and it is deserialized.
passport.deserializeUser((id, done)=>{
    User.findById(id).then((user)=>{
        done(null, user);
    });

});



passport.use(
    new GoogleStrategy(
        {
            clientID: key.googleClientID,
            clientSecret: key.googleClientSecret,
            callbackURL: "/auth/google/callback",
            proxy:true
        },
        async (accessToken, refreshToken, profile, done) => {
            // console.log(accessToken, refreshToken, profile);
            const existingUser = await User.findOne({ authId: profile.id });

            if (existingUser) {
                return done(null, existingUser);
            }
            const newUser = await new User({ authId: profile.id }).save();
            done(null, newUser);


        }
    )
);