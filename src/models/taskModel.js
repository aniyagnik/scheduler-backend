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
  description:{  
    type: String,
    require:true
  },
  priority:{  
    type: String,
    enum: ["high", "mid",'low'],
    require:true
  }, 
  // type  - value
  // 1. once  - 01/01/2025 // task on date d.toLocaleDateString()
  // 2 daily - 1 // default
  // 3. weekly- 1|2|3|4|5|6|7 // day number, mon-1,tue-2,wed-3,thu-4,fri-5,sat-6,sun-7
  // 4. weekday- 12345 // day number, mon-1,tue-2,wed-3,thu-4,fri-5,sat-6,sun-7
  // 5. monthly - 01 // date of month
  // custom - add this in version 2 
  repetition:{
    type:{
      type: String,
      enum:['once','daily','weekly','monthly','weekday'],
      require:true
    },
    value:{
      type: String,
      require:true
    }
  },
  status: {
    type: String,
    enum: ["ongoing", "halt",'complete'],
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
//   priority:high, 
//   repetition:{type:daily,value:'1'},
//   status: 'ongoing',
//   type: 'measurable', 
//   unit: 'hours', 
//   targetType: 'atleast', 
//   target: 10, 
//   score: [{date:'01/01/2024',points:4},{date:'02/01/2024',points:8}], 
//   timePeriod:['sfsdfsdf2','213eqwdd','12qewdasas'],
// }