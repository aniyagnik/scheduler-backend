import passport from 'passport'
import GoogleStrategy from 'passport-google-oidc'

const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET

const authUser = (request, accessToken, refreshToken, profile, done) => {
  console.log("in auth", profile)
  console.log("done : ", done)
  console.log("accessToken : ", accessToken)
  console.log("refreshToken : ", refreshToken)
  return done(null, profile);
}

//Use "GoogleStrategy" as the Authentication Strategy
passport.use(new GoogleStrategy({
  clientID:     GOOGLE_CLIENT_ID,
  clientSecret: GOOGLE_CLIENT_SECRET,
  callbackURL: "http://localhost:8080/dashboard",
  passReqToCallback: true
}, authUser));

passport.serializeUser( (user, done) => { 
  console.log(`Serialize User: ${user}`)
  // The USER object is the "authenticated user" from the done() in authUser function.
  // serializeUser() will attach this user to "req.session.passport.user.{user}", so that it is tied to the session object for each session.  
  done(null, user)
} )

passport.deserializeUser((user, done) => {
  console.log(`Deserialized User : ${user}`)
  // This is the {user} that was saved in req.session.passport.user.{user} in the serializationUser()
  // deserializeUser will attach this {user} to the "req.user.{user}", so that it can be used anywhere in the App.
  done (null, user)
}) 

//Use the req.isAuthenticated() function to check if user is Authenticated
const checkAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) return next()
  res.redirect("/")
}

export {
    checkAuthenticated
}