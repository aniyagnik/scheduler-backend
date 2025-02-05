import {User} from '../models/index.js'
import {ApiError, ApiResponse} from "../utils/index.js"

// get all documents from the collection
const getAllUsers = async (req,res) =>{ 
  try{
    const users = await User.find({})
    return res
    .status(200)
    .json(new ApiResponse(
        200,
        users,
        "all users fetched successfully"
    ))
  } 
  catch(err) {
      console.error('Error in fetching all Users, ', err);
      throw new ApiError(500, "Internal Server Error")
  }
}

 // get document by id from the collection
const getUserById = async(req,res) =>{
  try{
    console.log(req.params)
    const user = await User.findById(req.params.id).populate({path: 'allTasks'})
    console.log(user)
    return res
    .status(200)
    .json(new ApiResponse(
        200,
        user,
        "user fetched successfully"
    ))
  }catch(err){
    console.log('Error in getting User by id, ', err);
    throw new ApiError(500, "Internal Server Error")
  }
} 

// update document from the collection
const updateUserById = async (req,res) => {
  try{
    let user=await User.findOneAndUpdate({_id:req.params.userId},req.body)
    return res
    .status(200)
    .json(new ApiResponse(
        200,
        user,
        "user updaated successfully"
    ))
  }catch(err){
    console.error('Error updating User, ', err);
    throw new ApiError(500, "Internal Server Error")
  }
} 

// delete document from the collection
const deleteUser = async (req,res) =>{
  try{
    const user = await User.deleteOne({_id:req.params.userId})
    return res
    .status(200)
    .json(new ApiResponse(
        200,
        user,
        "user deleted successfully"
    ))
  }catch(err){
    console.error('Error deleting User, ', err);
    throw new ApiError(500, "Internal Server Error")
  }
} 

export {
  getAllUsers,
  getUserById,
  updateUserById,
  deleteUser
}