const Article = require('../models/Article');

exports.status = async (req, res) => {
  const processedArticles = await Article.find({ processed: true }).count();
  const unProcessedArticles = await Article.find({ processed: false }).count();
  console.log(processedArticles, unProcessedArticles);
  return res.json({
    unProcessedArticles,
    processedArticles
  });
};

exports.getArticleById = async (req, res) => {
  const article = await Article.findOne({ _id: req.params._id });
  return res.json(article);
};

exports.add = (req, res) => {
  const url = req.body.url;
  const article = new Article({ url });
  article.save();
  return res.json({ _id: article._id });
};

exports.search = async (req, res) => {
  const { query } = req.query;
  if (query) {
    const articles = await article.find(
      {
        $text: {
          $search: req.query.q
        }
      },
      {
        score: { $meta: 'textscore' }
      }
    );
    res.json(articles);
  }
  res.json({});
};