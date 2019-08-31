angular.module('Forum')
    .controller('postsCtrl', function ($scope, $rootScope, $http, postService) {

        $scope.posts = [];

        $scope.queueRemove = {
            requestPassword: false,
            post_id: '',
            password_confirm: ''
        }

        postService.getPosts().success(data => {
            $scope.posts = data.data;
        });

        $scope.beginRemove = function (post_id) {
            $scope.queueRemove.requestPassword = true;
            $scope.queueRemove.post_id = post_id;
        }

        $scope.closePopup = function () {
            $scope.queueRemove.requestPassword = false;
        }

        $scope.confirmRemove = function () {
            $http.delete(`/api/posts?admin_id=${$rootScope.user_id}&admin_password=${$scope.queueRemove.password_confirm}&post_id=${$scope.queueRemove.post_id}`)
                .success(res => {
                    $scope.queueRemove = {
                        requestPassword: false,
                        post_id: '',
                        password_confirm: ''
                    };
                    postService.getPosts().success(data => {
                        $scope.posts = data.data;
                    });
                })
        }

    })