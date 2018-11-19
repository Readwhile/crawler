const express = require('express');

const router = express.Router();
const articleController = require('../controller/articleController');

router.get('/status', articleController.status);
router.post('/article/add', articleController.add);
router.post('/article/delete/:_id', articleController.delete);
router.get('/article/:_id', articleController.getArticleById);
router.get('/search', articleController.search);

module.exports = router;
