import express from 'express';
import * as dotenv from 'dotenv'
import cors from 'cors' 
import helmet from 'helmet'
import session from 'express-session'
import passport from 'passport'
import mongoose from 'mongoose';

import { loginController} from "./Controllers/index.js"

const app = express();
const PORT = process.env.PORT || '8080'
const SECRET = process.env.SECRET

dotenv.config({ 
  path: '../.env'
})

app.use(session({
  secret: SECRET,
  resave: false ,
  saveUninitialized: true ,
}))


app.use(cors({
  origin:process.env.CORS_ORIGIN
})); 

app.use(express.json())
app.use(passport.initialize()) 
app.use(helmet()); 

app.use( (req,res,next) =>{
  console.log('handling request : ',req.url+" with method "+req.method);
  next();
})

import {taskRouter} from './routes/index.js'

app.use("/api/v1/task/",taskRouter)

app.get('/dashboard', loginController.checkAuthenticated ,(req,res) => {
  console.log('in dashboard')
  res.status(200).send('in dashboard')
})

app.get('/auth/google',passport.authenticate('google',{scope:['email','profile']}))
  
app.get('/auth/google/callback',passport.authenticate('google', {successRedirect: '/dashboard',failureRedirect: '/'}));

app.post("/logout", (req,res) => {
  req.logOut()
  res.redirect("/")
  console.log("User Logged out")
})

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

mongoose.connect(process.env.MONGO_URL)
  .then(result => console.log('connected to Mongodb'))
  .catch(err => console.error('error in connecting to mongodb, ',err));

export default app;