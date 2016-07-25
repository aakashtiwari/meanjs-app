(function() {
  'use strict';
  angular
    .module('articles.services')
    .service('commentdata', commentdata);

  commentdata.$inject = ['$http'];
  function commentdata($http) {
    var addCommentById = function(articleid, data) {
      return $http.post('/api/articles/' + articleid + '/comments', data);
    };
    var removeCommentById = function(articleid, id) {
      return $http.delete('/api/articles/' + articleid + '/comments/' + id, id);
    };

    return {
      addCommentById: addCommentById,
      removeCommentById: removeCommentById
    };
  }

}());
