'use strict';

/**
 * Module dependencies
 */
var path = require('path'),
  mongoose = require('mongoose'),
  Article = mongoose.model('Article'),
  Comment = mongoose.model('Comment'),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller'));

/**
 * Create an comment
 */
var doAddComment = function(req, res, article) {
  article.comments.push({
    content: req.body.content,
    user: req.user
  });
  article.save();
  res.json(article);
};

exports.commentCreate = function (req, res) {
  var articleid = req.params.articleId;
  if (articleid) {
    Article.findById(articleid).select('comments').exec(function(err, article) {
      if (err) {
        console.log('error');
      } else {
        doAddComment(req, res, article);
      }
    });
  } else {
    console.log('some error');
  }
};

var doRemoveComment = function(req, res, article) {
  console.log(req.params.id);
  article.comments.id(req.params.id).remove();
  article.save();
  res.json(article);
};

exports.commentDelete = function (req, res) {
  console.log(req.params);
  var articleid = req.params.articleId;
  if (articleid) {
    Article.findById(articleid).select('comments').exec(function(err, article) {
      if (err) {
        console.log('error');
      } else {
        doRemoveComment(req, res, article);
      }
    });
  } else {
    console.log('some error');
  }
};
