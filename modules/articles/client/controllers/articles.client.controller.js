(function () {
  'use strict';

  angular
    .module('articles')
    .controller('ArticlesController', ArticlesController);

  ArticlesController.$inject = ['$scope', '$state', 'articleResolve', 'commentdata', '$window', 'Authentication'];

  function ArticlesController($scope, $state, article, commentdata, $window, Authentication) {
    var vm = this;

    vm.article = article;
    vm.commentdata = commentdata;
    vm.authentication = Authentication;
    vm.error = null;
    vm.form = {};
    vm.remove = remove;
    vm.save = save;
    vm.saveComment = saveComment;
    vm.removeComment = removeComment;
    vm.showOptions = showOptions;

    // Remove existing Article
    function remove() {
      if ($window.confirm('Are you sure you want to delete?')) {
        vm.article.$remove($state.go('articles.list'));
      }
    }

    // Save Article
    function save(isValid) {
      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'vm.form.articleForm');
        return false;
      }

      // TODO: move create/update logic to service
      if (vm.article._id) {
        vm.article.$update(successCallback, errorCallback);
      } else {
        vm.article.$save(successCallback, errorCallback);
      }

      function successCallback(res) {
        $state.go('articles.view', {
          articleId: res._id
        });
      }

      function errorCallback(res) {
        vm.error = res.data.message;
      }
    }

    // Show Options
    function showOptions(user) {
      if (article.isCurrentUserOwner) {
        return true;
      } else if (article.currentUserId === user) {
        return true;
      } else {
        return false;
      }
    }

    function addComment(articleid, formData) {
      vm.commentdata.addCommentById(articleid, {
        content: formData.content
      })
        .success(function (res) {
          $state.go('articles.view', {
            articleId: res._id
          }, { reload: true });
        })
        .error(function (res) {
          vm.formError = "Your comment has not been saved, try again";
        });
      return false;
    }

    // Save Comment
    function saveComment() {
      addComment(vm.article._id, vm.comment);
    }


    function removeArticleComment(articleid, id) {
      vm.commentdata.removeCommentById(articleid, id)
        .success(function (res) {
          $state.go('articles.view', {
            articleId: res._id
          }, { reload: true });
        })
        .error(function (data) {
          vm.formError = "Your comment has not been deleted, try again";
        });
      return false;
    }

    // Remove Comment
    function removeComment(id) {
      if ($window.confirm('Are you sure you want to delete?')) {
        removeArticleComment(vm.article._id, id);
      }
    }
  }
}());
