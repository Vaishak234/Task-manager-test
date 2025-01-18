import mongoose from "mongoose";


const TaskSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    title: {
        type: String,
        required: [true, 'title required'],
    },
    description: {
        type: String,
        required: [true, 'description required'],
    },
   
    priority: {
        type: String,
        enum: ['high', 'medium', 'low'],
        default: 'low'
    },
    dueDate: {
        type: Date,
        default: Date.now
    },
    status: {
        type: String,
        enum: ['pending', 'progress', 'completed'],
        default: 'pending'
    }

}, { timestamps: true })

const TaskModel = mongoose.model("Task", TaskSchema)


// adding single field index for single fields for filtering each field efficently
TaskSchema.index({ priority: 1});
TaskSchema.index({ status: 1});
TaskSchema.index({ dueDate: 1});


// adding compound inex for filter with multiple fields
TaskSchema.index({ priority: 1, status: 1, dueDate: 1 });

export default TaskModel
