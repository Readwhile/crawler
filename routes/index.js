const express = require('express');

const router = express.Router();
const articleController = require('../controller/articleController');

router.get('/status', articleController.status);
router.post('/add', articleController.add);
router.get('/search', articleController.search);
router.get('/:_id', articleController.getArticleById);

module.exports = router;
