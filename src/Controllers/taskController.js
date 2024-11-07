import {taskDatabase} from "../Databases/index.js"

const addNewTask =(task) =>{
    try {  
      return taskDatabase.addSingleTask(task)
        .then((result) =>result)
        .catch((err) =>  {
          console.error('Error adding tasks to db in catch, controller:', err);
        });
    } catch (err) {
        console.error('Error adding tasks to db :', err);
    }
}

export {
    addNewTask
};