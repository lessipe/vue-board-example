const lodashId = require('lodash-id');
const path = require('path');
const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const moment = require('moment');

const adapter = new FileSync(path.resolve(__dirname, '..', 'db.json'));
const db = low(adapter);

db._.mixin(lodashId);

db.defaults({
  articles: []
}).write();

module.exports = {
  getArticles(page = 0) {
    const from = page * 10;
    
    return db.get('articles').value().slice(from, from + 10);
  },
  createArticle(article) {
    return db.get('articles').insert({
      ...article,
      created_at: moment().format('YYYY-MM-DD HH:mm:ss')
    }).write();
  },
  updateArticle(article, id) {
    return db.get('articles').find({
      id
    }).assign({
      ...article,
      id
    }).write();
  },
  removeArticle(id) {
    db.get('articles').remove({ id }).write();
  }
};