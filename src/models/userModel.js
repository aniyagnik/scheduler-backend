import mongoose from "mongoose";
import jwt from "jsonwebtoken"

const userModel = new mongoose.Schema({
  displayName: {
    type: String,
    required: true,
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
    type: String,
    required: true,
    default: 'https://icons.veryicon.com/png/o/miscellaneous/standard/avatar-15.png'
  },
  dayStartsAt: { // 5:00 / 22:00 (adjust acc. to server location)- trigger function operates at 5:00 to define scores of tasks for previous date  
    type: String, 
    default: '5:00'
  },
  tasks: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Task"
    }
  ],
  priorityPoints:{ // priority high-100 points, med - 70 points,low - 40 points
    type:[Number],
    default:[100,70,40]
  },
  refreshToken: {
    type: String
  }
})

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

// ex doc
// {
//   displayName: 'abc xyz',
//   email: 'abc.xyz@gmail.com',
//   firstName: 'abc',
//   lastName: 'xyz',
//   avatar: 'https://icons.veryicon.com/png/o/miscellaneous/standard/avatar-15.png',
//   dayStartsAt: '5:00',
//   tasks: ['asafa1231sr','we213qweqw','21esadasdasd'],
//   refreshToken: 'sdfsdfsdfgjhsfbkajsfd9283174nc12834983cy4124u'
// }