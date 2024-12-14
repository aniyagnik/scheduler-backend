import mongoose from 'mongoose';

const taskModel = new mongoose.Schema({
  userId:{  // task is made by user
    type:mongoose.Schema.Types.ObjectId,
    ref:'User'
  }, 
  title: {  // task name
    type: String,
    require:true
  }, 
  // type  - value
  // once  - 01/01/2025 // task on date
  // daily - 01/01/2024 // starts from date
  // weekly- 1,2,3,4 // day number, mon-1,tue-2,wed-3,thu-4,fri-5,sat-6,sun-7
  // month - 01 // date of month
  repetition:{
    type: String,
    enum:['once','daily','weekly','month'],
    require:true
    
  },
  startFrom:{
    type:Date,
    default:Date.now()
  },
  endFrom:{ //req for once
    type:Date,
    default:new Date(86400000000000)
  },
  priority:{  
    type: String,
    enum: ["high", "mid",'low'],
    require:true
  },
  status: {
    type: String,
    enum: ["ongoing", "halt",'complete','yet to start'],
    require:true
  },
  type: { // measurable or yes/no
    type: String,
    enum: ["measurable", "yes or no"],
    require:true
  }, 
  unit: { // hours,rep, kms etc. null if type = yes|no
    type: String,
  }, 
  targetType: { // atleast or atmost, only required if type is measurable null if type = yes|no
    type: String,
    enum: ["atleast", "atmost"],
  }, 
  target: { // target value, only required if type is measurable. null if type = yes|no
    type: Number,
    require:true
  }, 
  score: [  // score achieved, if type is yes|no, points-1(done), points-0(not done) 
    {
      date:{
        type:Number
      },
      points:{
        type:Number
      }
    }
  ], 
  // points gained can be calculated by score[i]/target * pointsAssigned
  storeTimePeriod: {  // whether to store time of task or not
    type: Boolean,
    require:true
  }, 
  timePeriod:[  // store when task was in progress during a day
    {
      type: mongoose.Schema.Types.ObjectId,
      ref:'TestDuration'
    },
  ]
});

const Task = mongoose.model('Task', taskModel);

export default Task;

// ex doc
// {
//   userId:'sd423wder23', 
//   title: 'study', 
//   repetition:type:'daily',
//   startFrom:'01/01/2025',
//   endFrom:'29/11/4707',
//   priority:high, 
//   status: 'yet to start',
//   type: 'measurable', 
//   unit: 'hours', 
//   targetType: 'atleast', 
//   target: 10, 
//   score: [{date:'01/01/2024',points:4},{date:'02/01/2024',points:8}], 
//   storeTimePeriod: true, 
//   timePeriod:['sfsdfsdf2','213eqwdd','12qewdasas'],
// }