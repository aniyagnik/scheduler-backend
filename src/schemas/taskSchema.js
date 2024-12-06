import mongoose from 'mongoose';

const taskSchema = new mongoose.Schema({
  title: String, // task name
  priority:Number, // priority
  startDate: { type: Date, default: Date.now() }, 
  endDate: { type: Date, default: Date.now() },
  type: {
    type: String,
    enum: ["measurable", "yes or no"],
  }, // measurable or yes/no
  unit: String, // hours,rep, kms etc. can be null 
  targetType: {
    type: String,
    enum: ["atleast", "atmost"],
  }, // atleast or atmost
  target: String, // target value 
  score: [Number], // score achieved
  pointsAssigned: Number, // points earned by partial/complete fulfillment of task
  // points gained can be calculated by score[i]/target * pointsAssigned
});

const Task = mongoose.model('Task', taskSchema);

export default Task;