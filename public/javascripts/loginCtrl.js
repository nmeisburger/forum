angular.module('Forum')
    .controller('loginCtrl', function ($scope, $rootScope, $http, $location) {

        $scope.user = {
            email: '',
            password: ''
        }

        $scope.loginError = "";

        $scope.login = function () {
            $http.get(`/auth/login?email=${$scope.user.email}&password=${$scope.user.password}`)
                .success(data => {
                    if (data.success) {
                        $rootScope.authenticated = true;
                        $rootScope.user = data.data.name;
                        $rootScope.user_id = data.data._id;
                        $rootScope.admin = data.data.admin;
                        $rootScope.password = $scope.user.password;
                        $location.path('/');

                        $scope.loginError = "";

                        $scope.newUser = {
                            name: '',
                            email: '',
                            password: '',
                            confirmPassword: ''
                        }
                    } else if (!data.error) {
                        $scope.loginError = data.data;
                    }
                })
        }
    })