ANTALEX.controller('CartListController', ['$scope', '$location', 'Cart', '$filter',
function($scope, $location, Cart, $filter) {

    $scope.selected_carts = [];

    function applyStatuses(){
        $scope.cart_list.each(function(cart){
            $scope.order_statuses.each(function(st){
                if(cart.status == st.title){
                    console.log(['order_statuses: ',st]);
                    cart.status_name = st.name;
                }
            });
        });
    }

    $scope.applyFilter = function(){
        $scope.selected_carts = [];
        if($scope.current_status.title){
            $scope.cart_list.each(function(cart){
                if(cart.status_name == $scope.current_status.name) $scope.selected_carts.push(cart);
            });
        } else $scope.selected_carts = $scope.cart_list;
    };

    $scope.$parent.load_carts(function(res){
        $scope.cart_list = $filter('onlyConfirmed')(res);
        $scope.$parent.loadStatuses(function(statuses){
            $scope.order_statuses = [];
            statuses.each(function(s){$scope.order_statuses.push(s)});
            $scope.order_statuses.push({name:'Все статусы'});
            applyStatuses();
            $scope.current_status = $scope.order_statuses[$scope.order_statuses.length-1];
            $scope.applyFilter();
        });
    });


}]);
