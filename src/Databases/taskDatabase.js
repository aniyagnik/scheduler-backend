import {Task} from '../schemas/index.js'

// Insert single documents into the collection
const addSingleTask = (task) => 
  Task.create(task)
    .then((result) => {
      console.log('Task inserted successfully ',result);
      return "Single Task added";
    })
    .catch((err) => {
      console.error('Error inserting Task ', err);
      return "Internal Server Error";
    });


// Insert multiple documents into the collection
const addMultipleTask = (tasks)=>
  Task.insertMany(tasks)
    .then((result) => {
      console.log('Tasks inserted successfully ',result);
      return "Multiple Tasks added";
    })
    .catch((err) => {
      console.error('Error inserting Tasks ', err);
      return "Internal Server Error";
    });

export {
  addSingleTask,
  addMultipleTask,
}