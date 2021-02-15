const express = require('express');
const bodyParser = require('body-parser');
const ejs = require('ejs');

const app = express();
const port = process.env.PORT || 3000;

const connection = require('./assets/db/connection');
const Posts = require('./assets/db/Post');
const Comments = require('./assets/db/Comments');

app.use(express.static('public'));
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.get('/', (req, res) => {
  Posts.findAll({
    raw: true,
    order: [
      ['id', 'desc']
    ]
  }).then((posts) => {
    res.render('index', {
      posts: posts
    })
  });
});

app.get('/newpost', (req, res) => {
  res.render('newpost');
})
app.post('/savepost', (req, res) => {
  var title = req.body.title;
  var body = req.body.body

  Posts.create({
    title: title,
    body: body,
  }).then(() => {
    res.redirect('/');
  });
});

app.get('/post/:id', (req, res) => {
  var id = req.params.id;

  Posts.findOne({
    where: {
      id: id,
    },
  }).then((post) => {
    if (post != undefined) {
      Comments.findAll({
        where: {
          postID: post.id,
        },
        raw: true,
        order: [['id', 'desc']],
      }).then((comments) => {
        res.render('post', {
          post: post,
          comments: comments,
        });
      });
    }else{
      res.redirect('/');
    }
  });
});
app.post('/savecomment', (req, res) => {
  var authorname = req.body.authorname;
  var comment = req.body.comment;
  var postID = req.body.postID;

  Comments.create({
    authorname: authorname,
    comment: comment,
    postID: postID,
  }).then(() => {
    res.redirect('/post/' + postID);
  });
})

app.listen(port, (error) => {
  if (error) {
    console.error('Erro ao iniciar o servidor ', error)
  } else {
    console.log('Servidor rodando em localhost:', port)
  }
})