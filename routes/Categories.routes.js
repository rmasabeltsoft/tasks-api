const express = require('express');
const GetCategoriesController = require('../controllers/GetCategories.controller');

const router = new express.Router();

router.get('/categories', GetCategoriesController);

module.exports = router;