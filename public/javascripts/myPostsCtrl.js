angular.module('Forum')
    .controller('myPostsCtrl', function ($scope, $rootScope, $http, postService) {

        $scope.posts = [];

        $scope.queueDelete = {
            requestPassword: false,
            post_id: '',
            password_confirm: ''
        }

        postService.getMyPosts().success(data => {
            $scope.posts = data.data;
        })

        $scope.beginDelete = function (post_id) {
            $scope.queueDelete.requestPassword = true;
            $scope.queueDelete.post_id = post_id;
        }

        $scope.closePopup = function () {
            $scope.queueDelete.requestPassword = false;
        }

        $scope.confirmDelete = function () {
            $http.delete(`/api/deletemypost?author_password=${$scope.queueDelete.password_confirm}&post_id=${$scope.queueDelete.post_id}`)
                .success(res => {
                    $scope.queueDelete = {
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