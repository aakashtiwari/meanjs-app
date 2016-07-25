// 'use strict';
//
// /**
//  * Module dependencies
//  */
// var mongoose = require('mongoose'),
//   Schema = mongoose.Schema;
//
// /**
//   *Comment Schema
//   */
// var CommentSchema = new mongoose.Schema({
//   content: {
//     type: String,
//     default: '',
//     trim: true
//   },
//   post: { type: mongoose.Schema.Types.ObjectId, ref: 'Article' }
// });
//
// mongoose.model('Comments', CommentSchema);
