// ************ Require's ************
const express = require('express');
const router = express.Router();

// ************ Controller Require ************
const mainController = require('../controllers/mainController');

// ************ Middleware Require ************
const adminValidationMiddleware = require('../middleware/admin');


/** GET ALL  */
router.get('/', mainController.index); 

/** ADMIN  */
router.get('/admin', adminValidationMiddleware, mainController.validation);

/** GET SEARCH  */
router.get('/search', mainController.search); 

module.exports = router;
