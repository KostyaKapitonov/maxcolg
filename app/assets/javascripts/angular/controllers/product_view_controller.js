ANTALEX.controller('ProductViewController', ['$scope', '$location','$routeParams', 'Products', '$sce', '$anchorScroll', function($scope, $location, $routeParams, Products, $sce, $anchorScroll) {

    $scope.$on('dataLoaded', function() {
        $scope.$emit('delivered', 'yeah');
        loadViewData();
    });

    if($scope.$parent.loadFinished) loadViewData();
    function loadViewData(){
        if($scope.product != null) return;
        if($routeParams.id && $scope.$parent && $scope.$parent.products && $scope.$parent.products.length) {
            $scope.$parent.products.each(function(p, i){
                if(p.id == $routeParams.id) {
                    $scope.product = p;

                }
            });
            if($scope.product == null && $routeParams.id) setTimeout(function(){loadViewData();},100);
            else $anchorScroll();
        }
        /*else if($routeParams.id){
            console.log('handle load');
            Products.get({id:$routeParams.id, format:'json'}, function(data){
                $scope.product = data;
            })
        }*/
    }

    $scope.htmlSafe = function(html_code) {
        return $sce.trustAsHtml(html_code);
    };

    $scope.back = function(){
        $scope.product = null;
        $location.path('/products');
    };

    $scope.delete = function(id){
        console.log(id);
        Products.delete({id: id}, function(data){
            if(data.success){
                $scope.products.splice($scope.products.whereId(id, true),1);
                $location.path('/products');
            }
        })
    };
}]);