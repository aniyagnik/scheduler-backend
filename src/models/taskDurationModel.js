import mongoose from "mongoose";

const taskDurationModel = new mongoose.Schema({
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

const TaskDuration = mongoose.model('Duration',taskDurationModel);

export default TaskDuration;

// ex doc
// {
// 	date: 01/01/2024,
// 	taskDuration:[8:00,10:00,16:00,20:00,22:00,23:00]
// }