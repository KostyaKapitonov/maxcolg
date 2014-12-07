ANTALEX.controller('CartViewController', ['$scope', '$location', 'Cart', '$routeParams',
function($scope, $location, Cart, $routeParams) {

    $scope.client = {};
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

    //cl($scope.cart);
    $scope.$parent.load_carts(function(res){
        $scope.cart = res.whereId($routeParams.id);
        bindZone();
    });

}]);