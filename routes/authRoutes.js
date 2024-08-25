const { Router } = require('express');
const authController = require('../controllers/authController');

const router = Router();

router.get('/', authController.handleAuth);
router.get('/callback', authController.handleCallback);

module.exports = router;