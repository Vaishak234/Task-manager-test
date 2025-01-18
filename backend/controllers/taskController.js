import mongoose from 'mongoose';
import asyncHandler from 'express-async-handler';
import { createTask, getTasks, deleteTask, updateTask, filterTask } from '../services/taskService.js';
import { taskSchema } from '../validations/tasksSchema.js';

// Controller to get all tasks for a user
export const getAllTasksController = asyncHandler(async (req, res) => {
    // Convert userId from request to a MongoDB ObjectId
    const userId = new mongoose.Types.ObjectId(req.userId);
    
    // Check if userId is valid
    if (!userId) return res.status(404).json({ message: "User is not valid", success: false });

    // Fetch all tasks for the user
    const allTasks = await getTasks(userId);

    // Return the tasks in the response
    return res.status(200).json({ message: "Tasks fetched successfully", success: true, data: allTasks });
});

// Controller to create a new task
export const createTaskController = asyncHandler(async (req, res) => {
    const { title, description , status, priority, dueDate } = req.body;
    const userId = new mongoose.Types.ObjectId(req.userId);
    

    // Check if all required fields are provided
    const {error} = taskSchema.validate(req.body)

    if(error){
        return res.status(400).json({ message: error.details[0].message, success: false})
    }

    // Check if userId is valid
    if (!userId) return res.status(404).json({ message: "User is not valid", success: false });

    // Create a new task
    const newTask = await createTask({ title, description, status, priority, dueDate, userId });
    
    const data = {
        _id:newTask._id,
        title:newTask.title,
        description:newTask.description,
        status:newTask.status,
        priority:newTask.priority,
        dueDate:newTask.dueDate
    }

    // Return success message
    return res.status(200).json({ message: "Task created successfully", success: true,data });
});


// Controller to update an existing task
export const updateTaskController = asyncHandler(async (req, res) => {
    
    // validate the request body
    const { error } = taskSchema.validate(req.body)

    if (error) {
        return res.status(400).json({ message: error.details[0].message, success: false })
    }
    const {  title, description,  status, priority, dueDate } = req.body;
    

    const taskId = req.params.id;
    const userId = new mongoose.Types.ObjectId(req.userId);



    // Check if userId is valid
    if (!userId) return res.status(404).json({ message: "User is not valid", success: false });

    // Update the task
    const editTask = await updateTask({ taskId, title, description,  status, priority, dueDate }, userId);

    // Return success message
    return res.status(200).json({ message: "Task edited successfully", success: true });
});

// Controller to delete a task
export const deleteTaskController = asyncHandler(async (req, res) => {
    const taskId = req.params.id;
    const userId = new mongoose.Types.ObjectId(req.userId);

    // Check if taskId is provided
    if (!taskId) return res.status(404).json({ message: "Please select a valid task", success: false });

    // Check if userId is valid
    if (!userId) return res.status(404).json({ message: "User is not valid", success: false });

    // Delete the task
    const task = await deleteTask(taskId, userId);
    console.log(task);
    
    // Return success message
    return res.status(200).json({ message: "Task deleted successfully", success: true });
});


export const filterTaskController = asyncHandler(async (req, res) => {
    
    const { status, priority, endDate, startDate } = req.query
    const userId = new mongoose.Types.ObjectId(req.userId);

    let query = {}

    if(status){
        query.status = status
    }

    if(priority){
        query.priority = priority
    }

    if (startDate) {
        dateFilter.$gte = new Date(startDate);
    }

     if (endDate) {
        dateFilter.$lte = new Date(endDate); 
    }
    

    const filteredTask = await filterTask(query,userId)
   
    // Return success message
    return res.status(200).json({ message: "Task filtered successfully", success: true , data:filteredTask});
});