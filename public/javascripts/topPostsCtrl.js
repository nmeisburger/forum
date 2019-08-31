angular.module('Forum')
    .controller('topPostsCtrl', function ($scope, $rootScope, $http, postService) {

        $scope.posts = [];

        postService.getTopPosts().success(data => {
            $scope.posts = data.data;
        })

        $scope.upVotePost = function (post_id) {
            $http.put('/api/posts', {
                post_id: post_id,
                voter_id: $rootScope.user_id,
                password: $rootScope.password
            }).success(data => {
                postService.getTopPosts().success(data => {
                    $scope.posts = data.data;
                })
            })
        }

    })