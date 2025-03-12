const express = require('express');
const session = require('express-session');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const dotenv = require('dotenv');
const { profile } = require('console');
dotenv.config();

let PORT = process.env.PORT || 3000;
let app = express();

app.use(
  session({
    secret: 'secret',
    resave: false,
    saveUninitialized: true,
  }),
);

app.use(passport.initialize());
app.use(passport.session());

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: 'http://www.example.com/auth/google/callback',
    },
    (accessToken, refreshToken, profile, cb) => {
      return cb(err, profile);
    },
  ),
);

passport.serializeUser((profile, cb) => cb(null, profile));
passport.deserializeUser((profile, cb) => cb(null, profile));

app.get('/', (req, res) => {});

app.get('/auth/google', (req, res) => {});
app.get('/auth/google/callback', passport, (req, res) => {});
app.get('/user', (req, res) => {});

app.listen(PORT, () => {
  console.log('Server started on port', PORT);
});
