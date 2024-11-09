import express from 'express';
import * as dotenv from 'dotenv'
import cors from 'cors' 
import helmet from 'helmet'
import session from 'express-session'
import passport from 'passport'

import {taskController, loginController} from "./Controllers/index.js"

const app = express();
const PORT = process.env.PORT || 8080;
const SECRET = process.env.SECRET || 'secret'

dotenv.config()

app.use(session({
  secret: SECRET,
  resave: false ,
  saveUninitialized: true ,
}))

app.use(passport.initialize()) 
app.use(passport.session())

app.use(helmet()); 
app.use(cors()); 
app.use(express.json())

app.use( (req,res,next) =>{
  console.log('handling request : ',req.url+" with method "+req.method);
  next();
})

app.get('/', (req, res) => {
  res.send('Hello World!');
});

// get all task
app.get('/task', async (req, res) => {
  try {
    taskController.getAllTasks(req.body)
    .then(result=>res.status(200).json({ message: result }))
    .catch((err) => res.status(500).json({ message: 'Internal Server Error' }));
  } catch (err) {
    console.error('Error in getting all task/app.js:', err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// get task by id
app.get('/task/:id', async (req, res) => {
  try {
    taskController.getTaskById(req.params.id)
    .then(result=>{
      if(result==null) res.status(404).send("Task does not exists.")
      else res.status(200).json({ message: result })
    })
    .catch((err) => res.status(500).json({ message: 'Internal Server Error' }));
  } catch (err) {
    console.error('Error in getting  task by id/app.js:', err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// add new task
app.post('/task', async (req, res) => {
  try {
    taskController.addNewTask(req.body)
    .then(result=>res.status(200).send("Task added successfully"))
    .catch((err) => res.status(500).json({ message: 'Internal Server Error' }));
  } catch (err) {
    console.error('Error in adding task/app.js:', err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// update task
app.put('/task/update', async (req, res) => {
  try {
    taskController.updateTask(req.body)
    .then(result=>{
      console.log("asdas ",result)
      if(result==null) res.status(404).send("Task does not exists, no update")
      else res.status(200).send("Task updated successfully")  
    })
    .catch((err) => res.status(500).json({ message: 'Internal Server Error' }));
  } catch (err) {
    console.error('Error in adding task/app.js:', err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// delete task by id
app.delete('/task/delete/:id', async (req, res) => {
  try {
    taskController.deleteTaskById(req.params.id)
    .then(result=>res.status(200).send("Task deleted successfully"))
    .catch((err) => res.status(500).json({ message: 'Internal Server Error' }));
  } catch (err) {
    console.error('Error in deleting task/app.js:', err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// delete task by id
app.delete('/task/deleteAll', async (req, res) => {
  try {
    taskController.deleteAllTasks()
    .then(result=>res.status(200).send("All Tasks deleted successfully"))
    .catch((err) => res.status(500).json({ message: 'Internal Server Error' }));
  } catch (err) {
    console.error('Error in deleting all tasks/app.js:', err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

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

export default app;