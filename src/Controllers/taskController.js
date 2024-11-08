import {taskDatabase} from "../Databases/index.js"

const getAllTasks = (task) => {
  try {  
    return taskDatabase.getAllTasks()
      .then((result) =>result)
      .catch((err) =>  {
        console.error('Error in getting all tasks in db in catch, controller:', err);
        return err;
      });
  } catch (err) {
      console.error('Error in getting all tasks to db :', err);
  }
}


const getTaskById = (taskId) => {
  try {  
    return taskDatabase.getTaskById(taskId)
      .then((result) =>result)
      .catch((err) =>  {
        console.error('Error in getting task by id in db in catch, controller:', err);
        return err;
      });
  } catch (err) {
      console.error('Error in getting task by id to db :', err);
  }
}

const addNewTask = (task) => {
    try {  
      return taskDatabase.addTask(task)
        .then((result) =>result)
        .catch((err) =>  {
          console.error('Error adding task to db in catch, controller:', err);
          return err;
        });
    } catch (err) {
        console.error('Error adding tasks to db :', err);
    }
}

const deleteTaskById = (taskId) => {
  try {  
    return taskDatabase.deleteTask(taskId)
      .then((result) =>result)
      .catch((err) =>  {
        console.error('Error deleting task from db in catch, controller:', err);
        return err;
      });
  } catch (err) {
      console.error('Error deleting tasks from db :', err);
  }
}

const deleteAllTasks = () => {
  try {  
    return taskDatabase.deleteAllTasks()
      .then((result) =>result)
      .catch((err) =>  {
        console.error('Error deleting task from db in catch, controller:', err);
        return err;
      });
  } catch (err) {
      console.error('Error deleting tasks from db :', err);
  }
}

export {
    getAllTasks,
    getTaskById,
    addNewTask,
    deleteTaskById,
    deleteAllTasks
};