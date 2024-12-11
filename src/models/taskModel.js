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
  repetition:{
    type: String,
    enum:['once','daily','weekly','month'],
    require:true
  },
  priority:{  // priority
    type: Number,
    require:true
  }, 
  startDate: { 
    type: Date, 
    default: Date.now(),
  }, 
  endDate: { 
    type: Date, 
    default: Date.now() 
  },
  type: { // measurable or yes/no
    type: String,
    enum: ["measurable", "yes or no"],
    require:true
  }, 
  unit: { // hours,rep, kms etc. can be null 
    type: String,
    require:true
  }, 
  targetType: { // atleast or atmost
    type: String,
    enum: ["atleast", "atmost"],
    require:true
  }, 
  target: { // target value 
    type: Number,
    require:true
  }, 
  storeTimePeriod: {  // whether to store time of task or not
    type: Boolean,
    require:true
  }, 
  timePeriod:[  // store when task was in progress during a day
    {
      type: mongoose.Schema.Types.ObjectId,
      ref:'TestDuration'
    },
  ],
  status: {
    type: String,
    enum: ["ongoing", "halt",'complete','yet to start'],
    require:true
  },
  score: [  // score achieved
    {
      date:{
        type:Number
      },
      points:{
      type:Number
      }
    }
  ], 
  pointsAssigned: { // points earned by partial/complete fulfillment of task
    type:Number
  }, 
  // points gained can be calculated by score[i]/target * pointsAssigned
});

const Task = mongoose.model('Task', taskModel);

export default Task;

// ex doc
// {
//   userId:'sd423wder23', 
//   title: 'study', 
//   repetition:'daily',
//   priority:1, 
//   startDate: '01/01/2025', 
//   endDate: '01/01/2111',
//   type: 'atmost', 
//   unit: 'hours', 
//   targetType: 'atleast', 
//   target: 10, 
//   storeTimePeriod: true, 
//   timePeriod:['sfsdfsdf2','213eqwdd','12qewdasas'],
//   status: 'yet to start',
//   score: [{date:'01/01/2024',points:4},{date:'02/01/2024',points:8}], 
//   pointsAssigned: 100
// }