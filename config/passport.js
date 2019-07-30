// var passport = require("passport");
// var GoogleStrategy = require("passport-google-oauth").OAuth2Strategy;
// passport.serializeUser(function(user, done) {
//   done(null, user);
// });
// passport.deserializeUser(function(user, done) {
//   done(null, user);
// });
// passport.use(
//   new GoogleStrategy(
//     {
//       clientID: "1016935393851-duns3pih1cn8q1am141cd3e2loj3mklq.apps.googleusercontent.com",
//       clientSecret: "4XfoVJQT7oossCMyA_y3tzGO",
//       callbackURL: "http://localhost:4500/auth/google/callback"
//     },
//     function(accessToken, refreshToken, profile, done) {
//       var userData = {
//         email: profile.emails[0].value,
//         name: profile.displayName,
//         token: accessToken
//       };
//       done(null, userData);
//     }
//   )
// );
