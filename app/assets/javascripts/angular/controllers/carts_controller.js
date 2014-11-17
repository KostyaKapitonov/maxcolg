ANTALEX.controller('CartsController', ['$scope', '$location', 'Cart',
function($scope, $location, Cart) {

    $scope.carts = $scope.$parent.carts;
    $scope.actual_cart = $scope.$parent.actual_cart;



}]);

