const { Router } = require('express');
const userController = require('../controllers/userController');

const router = Router();

router.get('/threads', userController.getThreads);

module.exports = router;