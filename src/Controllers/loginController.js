import passport from 'passport'
import GoogleStrategy from 'passport-google-oidc'

import {ApiError, ApiResponse} from "../utils/index.js"
import { User} from "../models/index.js"

const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET


const loginUser = async (request, aToken, profile, done) => {
  const username=profile.displayName, email=profile.emails[0].value
  let user = await User.findOne({email})

  if (!user) {
    const createdUser = await User.create({
      firstName:profile.name.givenName,
      lastName:profile.name.familyName,
      displayName:profile.displayName,
      email, 
      username: username.toLowerCase()
    })
    if (!createdUser) {
      throw new ApiError(500, "Something went wrong while registering the user")
    }
    user = createdUser
  }

  return done(null, user._id);
}

//Use "GoogleStrategy" as the Authentication Strategy
passport.use(new GoogleStrategy({
  clientID: GOOGLE_CLIENT_ID,
  clientSecret: GOOGLE_CLIENT_SECRET,
  callbackURL: "http://localhost:8080/api/v1/user/auth/google/callback",
  scope: [
    'https://www.googleapis.com/auth/userinfo.profile',
    'https://www.googleapis.com/auth/userinfo.email'
  ],
  passReqToCallback: true
}, 
loginUser) 
);

passport.serializeUser( (user, done) => { 
console.log(`in Serialize User `,user)
// The USER object is the "authenticated user" from the done() in authUser function.
// serializeUser() will attach this user to "req.session.passport.user.{user}", so that it is tied to the session object for each session.  
// To serialize an object means to convert its state to a byte stream so way that the byte stream can be reverted back into a copy of the object.
done(null, user)
} )

passport.deserializeUser(async (userId, done) => {
console.log(`in Deserialized User `,userId)
const user = await User.findById(userId)
// This is the {user} that was saved in req.session.passport.user.{user} in the serializationUser()
// deserializeUser will attach this {user} to the "req.user.{user}", so that it can be used anywhere in the App.
done (null, user)
}) 

const googleAuth = passport.authenticate('google',{
	scope:['email','profile'],
	accessType: 'offline',
	approvalPrompt: 'force'
})

const logoutUser = async(req, res) => {
  if(!req.user) res.redirect('/')
  req.logout(err =>{
    if (err) return next(err); 
  })
  return res
  .status(200)
  .json(new ApiResponse(200, {}, "User logged Out"))
}

export {
  googleAuth,
  loginUser,
  logoutUser
}