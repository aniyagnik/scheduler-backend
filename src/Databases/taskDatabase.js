import {Task} from '../schemas/index.js'


// get all documents from the collection
const getAllTasks = () => 
  Task.find({})
    .then((result) => {
      console.log('all Tasks retrived successfully, db ',result);
      return result;
    })
    .catch((err) => {
      console.error('Error in getting all Tasks, db ', err);
      return err;
    });

 // get document by id from the collection
const getTaskById = (taskId) => 
  Task.findById(taskId)
    .then((result) => {
      console.log('Task retrived by id successfully, db ',result);
      return result;
    })
    .catch((err) => {
      console.error('Error in getting all Tasks, db ', err);
      return err;
    });   

// Insert document into the collection
const addTask = (task) => 
  Task.create(task)
    .then((result) => {
      console.log('Task inserted successfully, db ',result);
      return result;
    })
    .catch((err) => {
      console.error('Error inserting Task, db ', err);
      return err;
    });


// delete all document from the collection
const updateTaskById = (updatedTask) => 
  Task.findByIdAndUpdate(updatedTask._id,updatedTask)
    .then((result) => {
      console.log('Task updated successfully, db ',result);
      return result;
    })
    .catch((err) => {
      console.error('Error in updating task, db ', err);
      return err;
    });

// delete document from the collection
const deleteTask = (taskId) => 
  Task.deleteOne({_id:taskId})
    .then((result) => {
      console.log('Task deleted successfully, db ',result);
      return result;
    })
    .catch((err) => {
      console.error('Error deleting Task, db ', err);
      return err;
    });

// delete all document from the collection
const deleteAllTasks = () => 
  Task.deleteMany()
    .then((result) => {
      console.log('All Tasks deleted successfully, db ',result);
      return result;
    })
    .catch((err) => {
      console.error('Error deleting all Tasks, db ', err);
      return err;
    });


export {
  getAllTasks,
  getTaskById,
  addTask,
  updateTaskById,
  deleteTask,
  deleteAllTasks
}