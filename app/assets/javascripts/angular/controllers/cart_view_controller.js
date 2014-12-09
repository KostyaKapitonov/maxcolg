ANTALEX.controller('CartViewController', ['$scope', '$location', 'Cart', '$routeParams',
function($scope, $location, Cart, $routeParams) {

    $scope.client = {};
    $scope.statuses = $scope.$parent.statuses;
    if($scope.$parent.currentUser.is_admin){

    } else {
        $scope.client = $scope.$parent.currentUser;
    }
    $scope.client.full_name = $scope.client.last_name+' '+$scope.client.first_name+' '+$scope.client.father_name;

    function bindZone(){
        $scope.$parent.loadZones(function(res){
            $scope.cart.zone = res.whereId($scope.cart.zone_id);
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
            if($scope.cart.status_title == st.title){
                $scope.cart.status_name = st.name;
            }
        });
    });

}]);