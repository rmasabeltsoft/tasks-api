const express = require('express')
const GetToDoController = require('../controllers/GetTasks.controller')

const router = new express.Router()

router.get('/tasks', GetToDoController)

module.exports = router