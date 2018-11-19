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

exports.delete = async (req, res) => {
  return res.json(await Article.findOneAndRemove({ _id: req.params._id }));
  return res.json({ deleted: req.params._id });
};

exports.add = (req, res) => {
  const { url } = req.body;
  const article = new Article({ url });
  article.save();
  return res.json({ _id: article._id });
};

exports.search = async (req, res) => {
  const query = req.query.q;
  console.log(query);
  if (query) {
    const articles = await Article.find({
      $text: {
        $search: query
      }
    });
    return res.json(articles);
  }
  return res.json({});
};
