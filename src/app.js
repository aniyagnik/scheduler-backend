import express from 'express';
import * as dotenv from 'dotenv'
import cors from 'cors' 
import helmet from 'helmet'

import {taskController} from "./Controllers/index.js"

dotenv.config()
const app = express();
const port = process.env.PORT || 4000;

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
    taskController.getAllTasks()
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
    .then(result=>res.status(200).json({ message: result }))
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

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});

export default app;