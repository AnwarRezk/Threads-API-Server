const { Router } = require('express');
const postController = require('../controllers/postController');

const router = Router();

router.post('/create', postController.createPost);
router.post('/publish', postController.publishPost);

module.exports = router;