ANTALEX.controller('CartsController', ['$scope', '$location', 'Cart',
function($scope, $location, Cart) {

    $scope.carts = $scope.$parent.carts;
    $scope.actual_cart = $scope.$parent.actual_cart;
    $scope.mapCode = $scope.$parent.setting.map_code;
    $scope.zonesDesc = '';

    $scope.show_delivery_zones = function(){
        $a.confirm($scope.zonesDesc,function(){
            var map = '<div>'+$scope.mapCode+'</div>';
            window.open().document.write(map);
        },{width:500});
    };

    $scope.calculateTotal = function(){
        $scope.actual_cart.zone_id = $scope.zone.id;
        $scope.total_sum = 0;
        if($scope.zone && $scope.zone.price)
            $scope.total_sum = $scope.zone.price;
        $scope.actual_cart.positions.each(function(pos){
            $scope.total_sum += pos.sum;
        });
    };

    $scope.to_int = function(idx){
        var pos = $scope.actual_cart.positions[idx];
        pos.count = $a.toInt(pos.count);
        pos.sum = pos.prod.price*pos.count;
        $scope.calculateTotal();
    };

    $scope.setDefaultSums = function(){
        $scope.actual_cart.positions.each(function(pos){
            pos.sum = pos.count * pos.prod.price;
        });
        $scope.calculateTotal();
    };

    $scope.$parent.loadZones(function(res){
        $scope.zones = res;
        $scope.zones.each(function(z, i){
            $scope.zonesDesc += 1+i+') Зона доставки: "'+ z.name+'" ';
            $scope.zonesDesc += '(цвет: "'+ z.color + '")';
            $scope.zonesDesc += ', стоимость: '+ z.price + ' руб.<br/>';
        });
        $scope.zonesDesc += '<br/>Открыть карту?';
        $scope.zone = $scope.zones[0] || null;
        if($scope.actual_cart && $scope.actual_cart.positions && $scope.actual_cart.positions.length > 0)
            $scope.setDefaultSums();
    });

    $scope.delPos = function(idx){
        var posToDel = $scope.actual_cart.positions[idx];
        $a.confirm('Удалить этот товар из корзины?<br/><br/><b>'+posToDel.prod.name+'</b>',function(){
            Cart.remove_position({id: posToDel.id},function(res){
                if(res.success){
                    $scope.actual_cart.positions.splice(idx,1);
                    $scope.calculateTotal();
                    $a.info('Товар удалён из корзины.');
                    if($scope.actual_cart.positions.length == 0) $scope.$parent.cartNotEmpty = false;
                } else $a.err();
            });
        });
    };

    $scope.confirm_order = function(){
        Cart.confirm({cart:$scope.actual_cart},function(res){

            console.log(res);
        });
    };

}]);

