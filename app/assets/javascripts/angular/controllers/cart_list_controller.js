ANTALEX.controller('CartListController', ['$scope', '$location', 'Cart', '$filter',
function($scope, $location, Cart, $filter) {

    //$scope.cart_list
    $scope.statuses = $scope.$parent.statuses;
    $scope.statuses.push({name:'Все статусы'});
    $scope.current_status = $scope.statuses[$scope.statuses.length-1];
    $scope.$parent.load_carts(function(res){
        $scope.cart_list = $filter('onlyConfirmed')(res);
        applyStatuses();
    });

    function applyStatuses(){
        $scope.cart_list.each(function(cart){
            $scope.statuses.each(function(st){
                if(cart.status_title == st.title){
                    cart.status_name = st.name;
                }
            });
        });
    }

}]);
