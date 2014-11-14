ANTALEX.controller('AccountController', ['$scope', '$location','$routeParams', 'User', 'Auth',
function($scope, $location, $routeParams, User) {

    //User.account()
    $scope.currentUser = $scope.$parent.currentUser;

    $scope.applyData = function(){

    }

}]);