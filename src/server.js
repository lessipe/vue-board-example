const express = require('express');
const bodyParser = require('body-parser');
const database = require('./database');

const app = express();
const port = process.env.PORT || 4500;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/test', function(req, res) {
  res.send('ok');
});

app.get('/article', function(req, res) {
  const page = req.query.page;
  const articles = database.getArticles(page - 1);

  res.send(articles);
});

app.post('/article', function(req, res) {
  const title = req.body.title;
  const content = req.body.content;

  const article = database.createArticle({
    title,
    content
  });

  res.send(article);
});

app.put('/article/:id', function(req, res) {
  const id = req.params.id;
  const title = req.body.title;
  const content = req.body.content;

  const article = database.updateArticle({
    title,
    content
  }, id);

  res.send(article);
});

app.delete('/article/:id', function(req, res) {
  const id = req.params.id;

  database.removeArticle(id);

  res.send('ok');
});

app.listen(port, () => console.log(`Server listening on port ${port}`));