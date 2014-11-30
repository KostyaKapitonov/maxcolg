ANTALEX.directive('zoneprice', ['$compile', function($compile){
    return {
        restrict: 'C',
        link: function(scope, element, attrs) {
            element.on('blur',function(){
                setTimeout(function(){scope.$apply(function(){
                    scope.zones[element.data('index')].price = $a.toFloat(element.val());
                })},0);
            });
        }
    };
}]);


//$a.toFloat($scope.product.usd_price);