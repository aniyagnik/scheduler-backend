import mongoose from "mongoose";

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
  priorityPoints:{ // priority high-100 points, med - 70 points,low - 40 points
    type:[Number],
    default:[100,70,40]
  }
})
.pre('save', function(next) {
  // Only update currencyModifiedAt when currency changes
  if (this.isModified('newDayStartsAt')) {
    const currDate = new Date
    // current UTC time 
    const currTime = parseInt(currDate.getUTCHours())*60+parseInt(currDate.getUTCMinutes())
    const runAtTime = parseInt(this.newDayStartsAt.split(':')[0])*60+parseInt(this.newDayStartsAt.split(':')[1])
    this.dayStartsAt = new Date();
    setTimeout(getTodaysTask,(runAtTime-currTime)*60*1000)
  }
  next();
});

// get user todays todo tasks from database
const getTodaysTask = async (userId)=>{
  let user = User.findByIdAndUpdate(userId)
  const currDate = new Date
  // current UTC time 
  const currTime = currDate.getUTCHours()+':'+currDate.getUTCMinutes()
  if(user.newDayStartsAt!=currTime) return;

  const allTask = Task.find({userId,startDate:{$lte:currDate},endDate:{$gte:currDate}})
  const taskIds = allTask.filter(task=>task._id)
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