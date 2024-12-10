import passport from 'passport'
import GoogleStrategy from 'passport-google-oidc'

import {ApiError, ApiResponse} from "../utils/index.js"
import { User} from "../models/index.js"

const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET

const googleAuth = passport.authenticate('google',{
	scope:['email','profile'],
	accessType: 'offline',
	approvalPrompt: 'force'
})

const loginUser = async (request, aToken, profile, done) => {
  const username=profile.displayName, email=profile.emails[0].value
  let user = await User.findOne({email})

  if (!user) {
    const createdUser = await User.create({
      firstName:profile.name.givenName,
      lastName:profile.name.familyName,
      email, 
      username: username.toLowerCase()
    })
    if (!createdUser) {
      throw new ApiError(500, "Something went wrong while registering the user")
    }
    user = createdUser
  }
  const accessToken = await generateAccessAndRefereshTokens(user._id)
  user={
    id:user._id,
    displayName:user.displayName,
    email:user.email,
    accessToken:accessToken
  }
  return done(null, user);
}

const logoutUser = async(req, res) => {
  await User.findByIdAndUpdate(
    req.user._id,
    {
        $unset: {
            refreshToken: 1 // this removes the field from document
        }
    },
    {
        new: true
    }
  )
  req.session.destroy()
  return res
  .status(200)
  .json(new ApiResponse(200, {}, "User logged Out"))
}

const refreshAccessToken = async (req, res) => {
  const incomingRefreshToken = req.cookies.refreshToken || req.body.refreshToken
  if (!incomingRefreshToken) {
      throw new ApiError(401, "unauthorized request")
  }
  try {
      const decodedToken = jwt.verify(
          incomingRefreshToken,
          process.env.REFRESH_TOKEN_SECRET
      )
      const user = await User.findById(decodedToken?._id)
      if (!user) {
          throw new ApiError(401, "Invalid refresh token")
      }
      if (incomingRefreshToken !== user?.refreshToken) {
          throw new ApiError(401, "Refresh token is expired or used")   
      }
      const options = {
          httpOnly: true,
          secure: true
      }
      const {accessToken, newRefreshToken} = await generateAccessAndRefereshTokens(user._id)
      return res
      .status(200)
      .cookie("accessToken", accessToken, options)
      .cookie("refreshToken", newRefreshToken, options)
      .json(
          new ApiResponse(
              200, 
              {accessToken, refreshToken: newRefreshToken},
              "Access token refreshed"
          )
      )
  } catch (error) {
      throw new ApiError(401, error?.message || "Invalid refresh token")
  }
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
  console.log(`in Serialize User `)
  // The USER object is the "authenticated user" from the done() in authUser function.
  // serializeUser() will attach this user to "req.session.passport.user.{user}", so that it is tied to the session object for each session.  
  done(null, user)
} )

passport.deserializeUser((user, done) => {
  console.log(`in Deserialized User `)
  // This is the {user} that was saved in req.session.passport.user.{user} in the serializationUser()
  // deserializeUser will attach this {user} to the "req.user.{user}", so that it can be used anywhere in the App.
  done (null, user)
}) 

const generateAccessAndRefereshTokens = async(userId) =>{
  try {
    const user = await User.findById(userId.toString())
    const accessToken = user.generateAccessToken()
    const refreshToken = user.generateRefreshToken()

    user.refreshToken = refreshToken
    await user.save({ validateBeforeSave: false })

    return accessToken
  } catch (error) {
    console.log(error)
    throw new ApiError(500, "Something went wrong while generating referesh and access token")
  }
}

export {
  googleAuth,
  loginUser,
  logoutUser,
  refreshAccessToken
}