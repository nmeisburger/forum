angular.module('Forum')
    .controller('registerCtrl', function ($scope, $rootScope, $http, $location) {
        $scope.newUser = {
            name: '',
            email: '',
            password: '',
            confirmPassword: ''
        }

        $scope.registerError = "";

        $scope.register = function () {
            if (!$scope.newUser.email.includes("@rice.edu")) {
                $scope.registerError = "Please Enter Valid Rice Email"
            }
            else if (!($scope.newUser.password === $scope.newUser.confirmPassword)) {
                $scope.registerError = "Passwords Do Not Match"
            } else {
                delete $scope.newUser.confirmPassword;
                $http.post('/auth/user', $scope.newUser).success(data => {
                    if (data.success) {
                        $rootScope.authenticated = true;
                        $rootScope.user = data.data.name;
                        $rootScope.user_id = data.data._id;
                        $rootScope.admin = data.data.admin;
                        $rootScope.password = $scope.newUser.password;
                        
                        $location.path('/');

                        $scope.registerError = "";

                        $scope.newUser = {
                            name: '',
                            email: '',
                            password: '',
                            confirmPassword: ''
                        }
                    } else if (!data.error) {
                        $scope.registerError = data.data;
                    }
                })
            }
        }
    })