import mongoose from "mongoose";
import jwt from "jsonwebtoken"

const userModel = new mongoose.Schema({
    displayName: {
        type: String,
        required: true,
        // unique: true,
        lowercase: true,
        trim: true, 
        index: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowecase: true,
        trim: true, 
    },
    firstName: {
        type: String,
        required: true,
        trim: true, 
        index: true
    },
    lastName: {
      type: String,
      trim: true, 
      index: true
    },
    avatar: {
        type: String, // cloudinary url
        required: true,
        default: 'https://icons.veryicon.com/png/o/miscellaneous/standard/avatar-15.png'
    },
    tasks: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Task"
        }
    ],
    refreshToken: {
        type: String
    }
  },
  {
      timestamps: true
  }
)

userModel.methods.generateAccessToken = function() {
  return jwt.sign(
    {
      _id: this._id,
      email: this.email,
      username: this.username,
      firstName: this.firstName,
      lastname:this.lastname
    },
    process.env.ACCESS_TOKEN_SECRET || 'hahha',
    { expiresIn: process.env.ACCESS_TOKEN_EXPIRY || '1d' }
  )
}

userModel.methods.generateRefreshToken = function() { 
  return jwt.sign(
    { _id: this._id },
    process.env.REFRESH_TOKEN_SECRET || 'hahhaasd',
    { expiresIn: process.env.REFRESH_TOKEN_EXPIRY|| '10d' }
  )
}
const User = mongoose.model("User", userModel)

export default User