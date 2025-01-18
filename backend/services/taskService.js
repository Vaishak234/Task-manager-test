import TaskModel from "../models/taskModels.js";

// Function to get tasks for a specific user
export const getTasks = async (userId = '678a1df7751d3cd0a39ccaec') => {
    try {
        const tasks = await TaskModel.find({ userId });

        if (!tasks) throw new Error('Unexpected error occurred');

        return tasks;
    } catch (error) {
        console.log('Error in fetching tasks', error);
        throw error;
    }
};

// Function to create a new task
export const createTask = async (taskData) => {
    try {
        const newTask = await TaskModel.create(taskData);

        if (!newTask) throw new Error('Error in creating task');

        return newTask;
    } catch (error) {
        console.log('Error in creating task', error);
        throw error;
    }
};

// Function to update an existing task
export const updateTask = async (taskData, userId) => {
    try {
        const task = await TaskModel.updateOne({ userId, _id: taskData.taskId }, taskData);

        if (!task) throw new Error('Error in updating task');

        return task;
    } catch (error) {
        console.log('Error in updating task', error);
        throw error;
    }
};

// Function to delete a task
export const deleteTask = async (taskId, userId) => {
    try {
        const tasks = await TaskModel.deleteOne({ userId, _id: taskId });

        if (!tasks) throw new Error('Error in deleting task');

        return tasks;
    } catch (error) {
        console.log('Error in deleting task', error);
        throw error;
    }
};

// Function to filter a task
export const filterTask = async (query, userId) => {
    try {
        const tasks = await TaskModel.find({ userId, ...query });
       
        
        if (!tasks) throw new Error('Error in filtering task');

        return tasks;
    } catch (error) {
        console.log('Error in filtering task', error);
        throw error;
    }
};
