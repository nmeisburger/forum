angular.module('Forum')
    .controller('mainCtrl', function ($scope, $rootScope, postService, $http) {
        $scope.newPost = "";

        $scope.posts = [];

        postService.getPosts().success(data => {
            $scope.posts = data.data;
        });

        $scope.addPost = function () {
            $http.post('/api/posts', {
                content: $scope.newPost,
                author: $rootScope.user,
                author_id: $rootScope.user_id
            }).success(data => {
                $scope.newPost = "";
                postService.getPosts().success(data => {
                    $scope.posts = data.data;
                })
            })
        }

        $scope.upVotePost = function (post_id) {
            $http.put('/api/posts', {
                post_id: post_id,
                voter_id: $rootScope.user_id,
                password: $rootScope.password
            }).success(data => {
                postService.getPosts().success(data => {
                    $scope.posts = data.data;
                })
            })
        }
    })