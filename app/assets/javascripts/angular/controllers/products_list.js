ANTALEX.controller('ProductsListController', ['$scope', '$location','$routeParams', 'Products', '$sce',
function($scope, $location, $routeParams, Products, $sce) {

    function refreshLoadStatus(counter){
        counter = counter || 0;
        if(counter < 50 && ($a.blank($scope.$parent) || $a.blank($scope.$parent.products))){
            setTimeout(function(){
                console.log('ProductsListController - cycle');
                refreshLoadStatus(counter++);
            },100);
        } else {
            console.log('ProductsListController - finished');
            $scope.admin = $scope.$parent.admin;
            $scope.product_list = $scope.$parent.product_list;
            console.log('$scope.admin');
            console.log($scope.admin);
            console.log('$scope.product_list');
            console.log($scope.product_list);
        }
    }
    refreshLoadStatus();

}]);