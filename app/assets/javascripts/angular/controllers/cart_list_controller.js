ANTALEX.controller('CartListController', ['$scope', '$location', 'Cart', '$filter',
function($scope, $location, Cart, $filter) {

    $scope.selected_carts = [];

    function applyStatuses(){
        $scope.cart_list.each(function(cart){
            $scope.statuses.each(function(st){
                if(cart.status_title == st.title){
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
        $scope.$parent.loadStatuses(function(res){
            $scope.statuses = res;
            $scope.statuses.push({name:'Все статусы'});
            applyStatuses();
            cl($scope.statuses);
            $scope.current_status = $scope.statuses[$scope.statuses.length-1];
            $scope.applyFilter();
        });
    });        // TODO : Commit this !

}]);
