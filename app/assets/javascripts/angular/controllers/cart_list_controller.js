ANTALEX.controller('CartListController', ['$scope', '$location', 'Cart', '$filter',
function($scope, $location, Cart, $filter) {

    $scope.selected_carts = [];
    $scope.order_statuses = [];
    $scope.periods = [];
    [30,90,180,360].each(function(val){
        $scope.periods.push({name: 'за последние '+val+' дней', val: val});
    });
    $scope.periods.push({name: 'за всё время'});
//    $scope.period = $scope.$parent.period;

    function applyStatuses(){
        $scope.cart_list.each(function(cart){
            $scope.order_statuses.each(function(st){
                if(cart.status == st.title){
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

    $scope.applyDateFilter = function(){
        $scope.$parent.carts = null;
        $scope.reload_carts();
    };

    $scope.searchByN = function(){
        if($a.blank($scope.order_number)){
            $a.alert('Введите номер заказа','Номер заказа');
            angular.element('[x-ng-model="order_number"]').focus();
        } else {
            //todo: continue
            $a.alert("Временно не работает");
        }
    };

    $scope.reload_carts = function(){
        $scope.$parent.load_carts(function(res){
            $scope.cart_list = $filter('onlyConfirmed')(res);
            if($scope.order_statuses.length == 0){
                $scope.$parent.loadStatuses(function(statuses){
                    $scope.order_statuses = [];
                    statuses.each(function(s){$scope.order_statuses.push(s)});
                    $scope.order_statuses.push({name:'Все статусы'});
                    applyStatuses();
                    $scope.current_status = ($scope.$parent.currentUser && $scope.$parent.currentUser.is_admin) ?
                        $scope.order_statuses.where('title','pending') : $scope.order_statuses[$scope.order_statuses.length-1];
                    $scope.applyFilter();
                });
            } else {
                applyStatuses();
                $scope.applyFilter();
            }
        });
    };

    $scope.reload_carts();
}]);
