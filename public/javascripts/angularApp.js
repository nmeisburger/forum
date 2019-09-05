var app = angular.module('Forum', ['ngRoute']).run(function ($rootScope, $http, $location) {
    $rootScope.authenticated = false;
    $rootScope.user_id = '';
    $rootScope.user = '';
    $rootScope.password = '';
    $rootScope.admin = false;
    $rootScope.openNav = false;

    $rootScope.logout = function () {
        $rootScope.authenticated = false;
        $rootScope.user = '';
        $rootScope.user_id = '';
        $rootScope.password = '';
        $rootScope.admin = false;
        $rootScope.toggleNav();
        $location.path('/');
    }

    $rootScope.toggleNav = function () {
        $rootScope.openNav = !$rootScope.openNav;
        if ($rootScope.openNav) {
            document.getElementById('nav').style.left = 0;
        } else {
            document.getElementById('nav').style.left = '100%';
        }
    }

})

app.config(function ($routeProvider) {
    $routeProvider
        .when('/', {
            templateUrl: 'main.html',
            controller: 'mainCtrl'
        })
        .when('/login', {
            templateUrl: 'login.html',
            controller: 'loginCtrl'
        })
        .when('/register', {
            templateUrl: 'register.html',
            controller: 'registerCtrl'
        })
        .when('/posts', {
            templateUrl: 'posts.html',
            controller: 'postsCtrl'
        })
        .when('/users', {
            templateUrl: 'users.html',
            controller: 'usersCtrl'
        })
        .when('/myposts', {
            templateUrl: 'myPosts.html',
            controller: 'myPostsCtrl'
        })
        .when('/topposts', {
            templateUrl: 'topPosts.html',
            controller: 'topPostsCtrl'
        });
})

app.factory('postService', function ($http, $rootScope) {
    var factory = {};
    factory.getPosts = function () {
        return $http.get('/api/posts');
    }
    factory.getMyPosts = function () {
        return $http.get(`/api/myposts?id=${$rootScope.user_id}`)
    }
    factory.getTopPosts = function () {
        return $http.get('/api/topposts');
    }
    return factory;
})

app.factory('userService', function ($http, $rootScope) {
    var factory = {};
    factory.getUsers = function () {
        return $http.get(`/auth/user?id=${$rootScope.user_id}&password=${$rootScope.password}`)
    }
    return factory;
})