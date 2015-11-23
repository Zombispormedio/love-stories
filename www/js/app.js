// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', ['ionic', 'ngCordova'])

    .run(function ($ionicPlatform) {
    $ionicPlatform.ready(function () {
        // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
        // for form inputs)
        if (window.cordova && window.cordova.plugins.Keyboard) {
            cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        }
        if (window.StatusBar) {
            StatusBar.styleDefault();
        }
    });
})
    .controller('mainController', function ($scope, $http) {
    $scope.current_question = "";
    $scope.current_questions=[];

    $scope.questions = [];
    $scope.start = false;
    $scope.nextQuestion = function () {
        var length = $scope.questions.length;
        var random_number = getRandomInt(0, length - 1);
        $scope.current_question = $scope.questions[random_number];
        $scope.current_questions.splice(random_number, 1);
    };

    $http.get("js/questions.json")
        .then(function (res) {
        $scope.questions = res.data;
        $scope.current_questions= $scope.questions.slice();
        $scope.nextQuestion();

    });

    $scope.holdHeart = function () {
        $scope.start = !$scope.start;
        if($scope.start){
            $scope.current_questions= $scope.questions.slice();
        }
    };



    $scope.nextHeart = function () {
        if ($scope.start) {
            $scope.nextQuestion();
        }
    };

});


function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}


