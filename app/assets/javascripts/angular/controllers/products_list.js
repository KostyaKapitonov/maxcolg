INVEST.controller('ProductsListController', ['$scope', '$routeParams', 'Products', '$sce',function($scope, $routeParams, Products, $sce) {

    $scope.name = "ProductsListController";
    $scope.params = $routeParams;

//    Products.getAll(function(data){
//        $scope.products = prepareData(data.products, data.categories);
//        //$scope.type_options = data.type_options;
//    });

    $scope.products = $scope.$parent.products;

    $scope.htmlSafe = function(html_code) {
        return $sce.trustAsHtml(html_code);
    };

    function prepareData(products, type_options){
//        angular.each(products, function(product){
//            product.descriptionSafe = $sce.trustAsHtml(product.description);
////            angular.each(type_options, function(option){
////                if(product){}
////            });
//        });
        return products;
    }

    $scope.delete = function(idx){
        Products.delete({id: $scope.products[idx].id}, function(data){
            if(data.success){
                $scope.products.splice(idx,1)
            }
        })
    }
}]);