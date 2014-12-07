ANTALEX.controller('CartListController', ['$scope', '$location', 'Cart', '$filter',
function($scope, $location, Cart, $filter) {

    //$scope.cart_list
    $scope.statuses = $scope.$parent.statuses;
    $scope.$parent.load_carts(function(res){
        $scope.cart_list = $filter('onlyConfirmed')(res);
        applyStatuses();
        console.log($scope.cart_list);
    });

    function applyStatuses(){
        $scope.cart_list.each(function(cart){
            $scope.statuses.each(function(st){
                cl([cart,st]);
                if(cart.status_title == st.title){
                    cart.status_name = st.name;
                }
            });
        });
    }

}]);
