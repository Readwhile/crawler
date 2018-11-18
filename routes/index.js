const express = require('express');

const router = express.Router();
const articleController = require('../controller/articleController');

router.get('/status', articleController.status);
router.post('/add', articleController.add);
router.get('/:_id', articleController.getArticleById);
router.get('/search', articleController.search);

module.exports = router;
