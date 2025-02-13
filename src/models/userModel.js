import mongoose from "mongoose";
import Task from './taskModel.js';

const userModel = new mongoose.Schema({
  displayName: {
    type: String,
    required: true,
    lowercase: true,
    trim: true, 
    index: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowecase: true,
    trim: true, 
  },
  firstName: {
    type: String,
    required: true,
    trim: true, 
    index: true
  },
  lastName: {
    type: String,
    trim: true, 
    index: true
  },
  avatar: {
    type: String,
    required: true,
    default: 'https://icons.veryicon.com/png/o/miscellaneous/standard/avatar-15.png'
  },
  // UCT - if someone from india makes dayStartAt - 00:00(12:00 am), 
  // then we store 19:30(7:30pm) as dayStartsAt because india is 5:30 ahead UCT(00:00-5:30)
  newDayStartsAt: { // 5:00 / 22:00 (adjust acc. to UCT)- trigger function operates at 00:00 UCT to collect todays tasks
    type: Date, 
    default: '19:30'
  },
  allTasks: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Task"
    }
  ],
  todaysTasks: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Task"
    }
  ],
})
.pre('save', function(next) {
  // Only update currencyModifiedAt when currency changes
  if (this.isModified('newDayStartsAt')) {
    const currDate = new Date
    // current UTC time 
    const currTime = parseInt(currDate.getUTCHours())*60+parseInt(currDate.getUTCMinutes())
    const runAtTime = parseInt(this.newDayStartsAt.split(':')[0])*60+parseInt(this.newDayStartsAt.split(':')[1])
    this.dayStartsAt = new Date();
    setTimeout(getTodaysTask,(runAtTime-currTime)*60*1000,this._id)
  }
  next();
});

// get user todays todo tasks from database - save it in userController
const getTodaysTask = async (userId)=>{
  let user = User.findByIdAndUpdate(userId)
  const currDate = new Date
  // current UTC time 
  const currTime = currDate.getUTCHours()+':'+currDate.getUTCMinutes()
  if(user.newDayStartsAt!=currTime) return;

  const allTask = Task.find({userId,status:'ongoing'})
  const taskIds = allTask.filter(task=>{
    const taskType = task.repetition.type
    if(taskType=='daily') return task._id
    else if((taskType=='once') && 
    (currDate.toLocaleDateString() == task.repetition.value))
      return task._id
    else if((taskType=='weekly') && 
    (currDate.getDay().toString() == task.repetition.value))
      return task._id
    else if((taskType=='monthly') && 
    (currDate.getDate().toString() == task.repetition.value))
      return task._id
    else if((taskType=='weekday') && 
    (currDate.getDay().toString() != 6) && 
    (currDate.getDay().toString() != 7))
      return task._id
  })
  user = User.findByIdAndUpdate(userId,{todaysTasks:taskIds})
  setTimeout(getTodaysTask,24*60*60*1000)
  return;
}
const User = mongoose.model("User", userModel)

export default User

// ex doc
// {
//   displayName: 'abc xyz',
//   email: 'abc.xyz@gmail.com',
//   firstName: 'abc',
//   lastName: 'xyz',
//   avatar: 'https://icons.veryicon.com/png/o/miscellaneous/standard/avatar-15.png',
//   newDayStartsAt: '5:00',
//   tasks: ['asafa1231sr','we213qweqw','21esadasdasd'],
// }