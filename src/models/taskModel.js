import mongoose from 'mongoose';

const taskModel = new mongoose.Schema({
  title: {
    type: String,
    require:true
  }, // task name
  priority:{
    type: Number,
    require:true
  }, // priority
  startDate: { type: Date, default: Date.now(),require:true }, 
  endDate: { type: Date, default: Date.now() },
  type: {
    type: String,
    enum: ["measurable", "yes or no"],
    require:true
  }, // measurable or yes/no
  unit: {
    type: String,
    require:true
  }, // hours,rep, kms etc. can be null 
  targetType: {
    type: String,
    enum: ["atleast", "atmost"],
    require:true
  }, // atleast or atmost
  target: {
    type: Number,
    require:true
  }, // target value 
  score: [Number], // score achieved
  pointsAssigned: Number, // points earned by partial/complete fulfillment of task
  // points gained can be calculated by score[i]/target * pointsAssigned
});

const Task = mongoose.model('Task', taskModel);

export default Task;