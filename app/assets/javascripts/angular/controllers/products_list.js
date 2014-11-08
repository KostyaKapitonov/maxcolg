ANTALEX.controller('ProductsListController', ['$scope', '$location','$routeParams', 'Products', '$sce',function($scope, $location, $routeParams, Products, $sce) {

    $scope.$on('dataLoaded', function() {
        $scope.$emit('delivered', 'yeah');
    });

    $scope.htmlSafe = function(html_code) {
        return $sce.trustAsHtml(html_code);
    };

    $scope.delete = function(idx){
        Products.delete({id: $scope.$parent.products[idx].id}, function(data){
            if(data.success){
                $scope.$parent.products.splice(idx,1)
            }
        })
    };
}]);