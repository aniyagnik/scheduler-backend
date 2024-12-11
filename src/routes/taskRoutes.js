import { Router } from 'express';
import {
    getAllTasks,
    getTaskById,
    createTask,
    updateTaskById,
    deleteTask,
} from "../Controllers/taskController.js"
// import {verifyJWT} from "../middlewares/index.js"

const router = Router();
//router.use(verifyJWT); 

router.post("/",createTask);    //create a new task 
router.get("/",getAllTasks);   // get all the task. convert it to all the task of the user
router.get("/:taskId",getTaskById);  //fetch a task
router.put("/:taskId",updateTaskById);  //update a task
router.delete("/:taskId",deleteTask);   //delete a particular task given its id

export default router