import mongoose from "mongoose";

const taskDurationModel = new mongoose.Schema({
	taskId:{
		type: mongoose.Schema.ObjectId,
		ref:'Task'
	},
	date:{
		type: Date,
		require: true
	},
	taskDuration:[
		{
			type: String
		}
  ]
})

const TaskDuration = mongoose.model('TaskDuration',taskDurationModel);

export default TaskDuration;

// ex doc
// {
//  taskId: 'sdfsdfsdg'
// 	date: 01/01/2024,
// 	taskDuration:[8:00,10:00,16:00,20:00,22:00,23:00]
// }