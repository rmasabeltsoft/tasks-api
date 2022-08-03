const express = require('express');
const GetEmployeesController = require('../controllers/GetEmployees.controller');

const router = new express.Router();

router.get('/employees', GetEmployeesController);

module.exports = router;