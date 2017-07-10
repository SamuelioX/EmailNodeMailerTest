var app = angular.module("app", ['ngAnimate', 'ngMaterial', 'ngSanitize', 'ui.bootstrap']);
///https://samueliox-trial-prod.apigee.net/vglist
app.config(['$locationProvider', function ($locationProvider) {
        $locationProvider.html5Mode({
            enabled: true,
            requireBase: false
        });
    }]);
//function that adds cors
(function () {
    var cors_api_host = 'cors-anywhere.herokuapp.com';
    var cors_api_url = 'https://' + cors_api_host + '/';
    var slice = [].slice;
    var origin = window.location.protocol + '//' + window.location.host;
    var open = XMLHttpRequest.prototype.open;
    XMLHttpRequest.prototype.open = function () {
        var args = slice.call(arguments);
        var targetOrigin = /^https?:\/\/([^\/]+)/i.exec(args[1]);
        if (targetOrigin && targetOrigin[0].toLowerCase() !== origin &&
                targetOrigin[1] !== cors_api_host) {
            args[1] = cors_api_url + args[1];
        }
        return open.apply(this, args);
    };
})();

//factory that allows items to be reused
////mostly designed for SPA, not amazingly effective otherwise
//app.factory('userIdFactory', function () {
//    var userId = null;
//    var gameId = null;
//    var signedIn = false;
//    var factory = {};
//    var APIKEY = "K8h0VQ7jVzMO2QPUovIoWAxTb3iGKZMu";
//    factory.setUserId = function (id) {
//        userId = id;
//    };
//
//    factory.getUserId = function () {
//        return userId;
//    };
//    factory.setGameId = function (id) {
//        gameId = id;
//    };
//
//    factory.getGameId = function () {
//        return gameId;
//    };
//
//    factory.setSignedInStatus = function (login) {
//        signedIn = login;
//    };
//
//    factory.getSignedInStatus = function () {
//        return signedIn;
//    };
//
//    factory.getAPIKey = function () {
//        return APIKEY;
//    };
//
//    return factory;
//});

//login controller, handles logins, token and userId
app.controller('sendEmailCtrl', function ($scope, $window, $http) {
    $scope.receiver = [];
    $scope.receiversToAdd = [{
            emailTo: ''
        }];
//    for (var i = 0; i < $scope.receiversToAdd.length; i++) {
//        console.log($scope.receiversToAdd[i].emailTo);
//    }


//    $scope.email = email;
//    console.log($scope.emailSubject);
//    console.log($scope.emailBody);
//    console.log($scope.receiversToAdd);
//    console.log($scope.email);
    $scope.sendEmail = function () {
        var email = {
            receivers: $scope.receiversToAdd,
            subject: $scope.emailSubject,
            body: $scope.emailBody
        }
        console.log($scope.emailSubject);
        console.log($scope.emailBody);
        console.log($scope.receiversToAdd);
        $scope.email = email;
        console.log($scope.email);
        
        $http.post('/sendEmail', email).then(function (response) {
            //check if the token is real 
            if (response.data.success == false) {

//                $scope.message = 'Error: Invalid username or password';
//                userIdFactory.setSignedInStatus(false);
//                $scope.alerts.length = 0;
//                $scope.alerts.push({type: 'danger', msg: 'Username or password is incorrect'});
//                $window.location.href = '/login.html';
            } else {
//                userIdFactory.setSignedInStatus(true);
//                $window.sessionStorage.token = response.data.token;
//                $window.location.href = '/profile.html';
            }
        });

    };
    $scope.addReceiver = function () {
        $scope.receiversToAdd.push({
            emailTo: ''
        });
    };

    $scope.remove = function (item) {
        var index = $scope.receiversToAdd.indexOf(item);
        $scope.receiversToAdd.splice(index, 1);
    };
});