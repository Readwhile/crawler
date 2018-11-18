const mongoose = require('mongoose');
const { extract } = require('article-parser');

const articleSchema = new mongoose.Schema({
  url: { type: String, required: true, unique: true },
  title: { type: String, index: true },
  slug: { type: String, index: true },
  description: { type: String, index: true },
  content: { type: String, index: true },
  domain: { type: String, index: true },
  author: { type: String, index: true },
  published: { type: Date },
  image: { type: String },
  canonicals: { type: [String] },
  processed: { type: Boolean, default: false }
});

articleSchema.index({
  title: 'text',
  slug: 'text',
  description: 'text',
  content: 'text',
  author: 'text'
});

articleSchema.methods.process = article => {
  extract(article.url)
    .then(result => {
      article.title = result.title;
      article.slug = result.alias;
      article.description = result.description;
      article.content = result.content;
      article.domain = result.domain;
      article.author = result.author;
      article.published = result.published;
      article.canonicals = result.canonicals;
      article.processed = true;
      article.save();
    })
    .catch(err => console.log(err));
};

articleSchema.post('save', async article => {
  console.log('i am running');
  if (!article.processed) {
    await article.process(article);
    console.log('post article parsing running');
  }
});

module.exports = mongoose.model('Article', articleSchema);
