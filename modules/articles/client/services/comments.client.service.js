(function () {
  'use strict';

  angular
    .module('comments.services')
    .factory('CommentService', CommentsService);

  CommentsService.$inject = ['$resource'];

  function CommentsService($resource) {
    return $resource('api/comments/:commentId', {
      commentId: '@_id'
    }, {
      update: {
        method: 'PUT'
      }
    });
  }
}());
