angular.module('Forum')
    .controller('usersCtrl', function ($scope, $http, $rootScope, userService) {

        $scope.users = [];

        $scope.promoteUser = {
            requestPassword: false,
            user_id: '',
            passwordConfirm: ''
        }

        $scope.removeUser = {
            requestPassword: false,
            user_id: '',
            passwordConfirm: ''
        }

        userService.getUsers().success(data => {
            if (typeof (data.data) !== "String") {
                $scope.users = data.data;
            }
        })

        $scope.beginPromoteUser = function (user_id) {
            $scope.promoteUser.requestPassword = true;
            $scope.promoteUser.user_id = user_id;
        }

        $scope.beginRemoveUser = function (user_id) {
            $scope.removeUser.requestPassword = true;
            $scope.removeUser.user_id = user_id;
        }

        $scope.closePromoteUserPopup = function () {
            $scope.promoteUser.requestPassword = false;
        }

        $scope.closeRemoveUserPopup = function () {
            $scope.removeUser.requestPassword = false;
        }

        $scope.confirmPromoteUser = function () {
            $http.put('/auth/user', {
                admin_id: $rootScope.user_id,
                admin_password: $scope.promoteUser.passwordConfirm,
                user_id: $scope.promoteUser.user_id
            }).success(data => {
                userService.getUsers().success(data => {
                    if (typeof (data.data) !== "String") {
                        $scope.users = data.data;
                    }
                })
                $scope.promoteUser = {
                    requestPassword: false,
                    user_id: '',
                    passwordConfirm: ''
                }
            })
        }

        $scope.confirmRemoveUser = function () {
            $http.delete(`/auth/user?admin_id=${$rootScope.user_id}&admin_password=${$scope.removeUser.passwordConfirm}&user_id=${$scope.removeUser.user_id}`)
                .success(data => {
                    userService.getUsers().success(data => {
                        if (typeof (data.data) !== "String") {
                            $scope.users = data.data;
                        }
                    })
                    $scope.removeUser = {
                        requestPassword: false,
                        user_id: '',
                        passwordConfirm: ''
                    }
                })
        }

    })