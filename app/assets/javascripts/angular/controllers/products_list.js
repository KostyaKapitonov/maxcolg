ANTALEX.controller('ProductsListController', ['$scope', '$location','$routeParams', 'Products', '$sce',
function($scope, $location, $routeParams, Products, $sce) {

    $scope.currentUser = $scope.$parent.currentUser;

    $scope.product_list = $scope.$parent.products;

}]);