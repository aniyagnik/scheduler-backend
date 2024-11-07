import {taskDatabase} from "../Databases/index.js"

const addNewTask =(task) =>{
    try {  
        taskDatabase.addSingleTask(task)
          .then((result) =>"success")
          .catch((err) =>  {
            console.error('Error adding tasks to db in catch,controller:', err);
            return "error";   
          });
        } catch (err) {
        console.error('Error adding tasks to db :', err);
        return 'Internal Server Error';
    }
}

export {
    addNewTask
};