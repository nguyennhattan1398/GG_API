// npm install express passport passport-google-oauth20
// npm install nodemon
// npm install googleapis@39 --save
const express = require("express");

const passport = require("passport");

const GoogleStrategy = require("passport-google-oauth20").Strategy;

const app = express();

const key = require("./keys.json");
const { Authenticator, authenticate } = require("passport");


const PORT = process.env.PORT || 3001

passport.use( new GoogleStrategy({
                clientID: key.web.client_id,
                clientSecret: key.web.client_secret,
                callbackURL: "/auth/google/callback"
                },

                (accessToken, refreshToken, profile, done) =>{
                    console.log("access_token", accessToken);
                    console.log("refeshToken", refreshToken);
                    console.log("profile", profile)
                    console.log("email_address", profile._json.email);
                    console.log("user name", profile.displayName);
                    console.log("avatar", profile._json.picture);
                    

              
                    
                    console.log("done", done);
                }))

app.get('/auth/google',
  passport.authenticate('google',
  
  { scope: 
      [ 'https://www.googleapis.com/auth/user.gender.read',
      'https://www.googleapis.com/auth/user.birthday.read',
      'https://www.googleapis.com/auth/userinfo.profile',
      ,  ] }
));

app.get( '/auth/google/callback', 
    passport.authenticate( 'google', 
    
    { 
        successRedirect: '/auth/google/success',
        failureRedirect: '/auth/google/failure'
}
));


app.listen(PORT,()=>{
    console.log("server running "+ PORT);
})