const express = require('express');
const GetTasksController = require('../controllers/GetTasks.controller');
const AddTaskController = require('../controllers/AddTask.controller');

const router = new express.Router();

router.get('/tasks', GetTasksController);
router.put('/tasks', AddTaskController);

module.exports = router;