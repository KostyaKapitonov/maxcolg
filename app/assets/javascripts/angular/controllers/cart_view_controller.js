ANTALEX.controller('CartViewController', ['$scope', '$location', 'Cart', '$routeParams',
function($scope, $location, Cart, $routeParams) {

    $scope.client = null;
    $scope.statuses = $scope.$parent.statuses;
    $scope.currentStatus = null;

    function bindUser(){
        if($scope.$parent.currentUser.is_admin){
            $scope.$parent.lodadUserInfo($scope.cart.user_id,function(res){
                $scope.client = res;
                $scope.client.full_name = $scope.client.last_name+' '+$scope.client.first_name+' '+$scope.client.father_name;
            });
        } else {
            $scope.client = $scope.$parent.currentUser;
            $scope.client.full_name = $scope.client.last_name+' '+$scope.client.first_name+' '+$scope.client.father_name;
        }
    }


    function bindZone(){
        $scope.$parent.loadZones(function(res){
            $scope.cart.zone = res.whereId($scope.cart.zone_id);
            bindUser();
        });
    }

    function bindDeletedProds(){
        $scope.cart.positions.each(function(pos){
            if(!pos.prod){
                pos.prod_deleted = true;
            }
        });
    }

    $scope.$parent.load_carts(function(res){
        $scope.cart = res.whereId($routeParams.id);
        bindZone();
        bindDeletedProds();
        $scope.statuses.each(function(st){
            if($scope.cart.status == st.title){
                $scope.cart.status_name = st.name;
                $scope.currentStatus = st;
            }
        });
    });

    $scope.set_new_status = function(){
        if(!$scope.$parent.currentUser.is_admin) return;
        Cart.proceed({cart_id: $scope.cart.id, status: $scope.currentStatus.title},function(res){
            if(res.success){
                $scope.cart.status = $scope.currentStatus.title;
            }
        });
    }

}]);