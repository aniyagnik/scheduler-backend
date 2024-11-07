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

app.post('/task', async (req, res) => {
  try {
    taskController.addNewTask(req.body)
    .then(result=>{
      if(result) return res.status(200).send("Task added successfully")
      else return res.status(500).json({message:result})
    })

  } catch (err) {
    console.error('Error in adding task/app.js:', err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});

export default app;