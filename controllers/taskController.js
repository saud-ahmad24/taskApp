const Task = require('../models/Task');

const getAllTasks = async (req, res) => {
    try {
        let query = { userId: req.userId };
        const searchQuery = req.query.q;

        if (searchQuery) {
            const searchRegex = new RegExp(searchQuery, 'i');
            query = {
                userId: req.userId,
                $or: [
                    { description: searchRegex },
                    { tags: searchRegex },
                    { tags: priority }
                ]
            };
        }

        const tasks = await Task.find(query);
        res.render('dashboard', { tasks });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


const createTask = async (req, res) => {
    try {
        const { description, priority, dueDate, tags } = req.body;
        const task = new Task({ userId: req.userId, description, priority, dueDate, tags });
        await task.save();
        res.redirect('/tasks');
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const updateTask = async (req, res) => {
    try {
        const { taskId } = req.params;
        const { description, priority, dueDate, completed, tags } = req.body;
        const updatedTask = await Task.findOneAndUpdate(
            { _id: taskId, userId: req.userId },
            { description, priority, dueDate, completed, tags },
            { new: true }
        );
        if (!updatedTask) {
            return res.status(404).json({ message: 'Task not found' });
        }
        res.redirect('/tasks');
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const deleteTask = async (req, res) => {
    try {
        const { taskId } = req.params;
        const deletedTask = await Task.findOneAndDelete({ _id: taskId, userId: req.userId });
        if (!deletedTask) {
            return res.status(404).json({ message: 'Task not found' });
        }
        res.redirect('/tasks');
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = { getAllTasks, createTask, updateTask, deleteTask };
