import {Task} from '../schemas/index.js'
import {ApiError, ApiResponse} from "../utils/index.js"

// get all documents from the collection
const getAllTasks = async (req,res) =>{ 
  try{
    const tasks = await Task.find({})
    return res
    .status(200)
    .json(new ApiResponse(
        200,
        tasks,
        "all tasks fetched successfully"
    ))
  } 
  catch(err) {
      console.error('Error in fetching all Tasks, ', err);
      throw new ApiError(500, "Internal Server Error")
  }
}

 // get document by id from the collection
const getTaskById = async(req,res) =>{
  try{
    const task = await Task.findById(req.params.taskId)
    return res
    .status(200)
    .json(new ApiResponse(
        200,
        task,
        "task fetched successfully" // for task=null?????
    ))
  }catch{
    console.error('Error in getting all Tasks, ', err);
    throw new ApiError(500, "Internal Server Error")
  }
} 

// Insert document into the collection
const createTask = async(req,res) => {
  try{
    const newTask = req.body
    const task = await Task.create(newTask)
    return res
    .status(200)
    .json(new ApiResponse(
        200,
        task,
        "task created successfully"
    ))
  }catch(err){
    console.error('Error creating Task, ', err);
    throw new ApiError(500, "Internal Server Error")
  }
} 

// update document from the collection
const updateTaskById = async (req,res) => {
  try{
    let task=await Task.findOneAndUpdate({_id:req.params.taskId},req.body)
    return res
    .status(200)
    .json(new ApiResponse(
        200,
        task,
        "task updaated successfully"
    ))
  }catch(err){
    console.error('Error updating Task, ', err);
    throw new ApiError(500, "Internal Server Error")
  }
} 

// delete document from the collection
const deleteTask = async (req,res) =>{
  try{
    const task = await Task.deleteOne({_id:req.params.taskId})
    return res
    .status(200)
    .json(new ApiResponse(
        200,
        task,
        "task deleted successfully"
    ))
  }catch(err){
    console.error('Error deleting Task, ', err);
    throw new ApiError(500, "Internal Server Error")
  }
} 

export {
  getAllTasks,
  getTaskById,
  createTask,
  updateTaskById,
  deleteTask
}