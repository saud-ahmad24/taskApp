const express = require('express');
const jwt = require('jsonwebtoken');
const { getAllTasks, createTask, updateTask, deleteTask } = require('../controllers/taskController');
const {authenticateToken } = require("../helper")

const router = express.Router();

router.get('/', authenticateToken, getAllTasks);
router.post('/', authenticateToken, createTask);
router.put('/:taskId', authenticateToken, updateTask);
router.delete('/:taskId', authenticateToken, deleteTask);

module.exports = router;
