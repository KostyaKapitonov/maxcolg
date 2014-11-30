ANTALEX.controller('CartsController', ['$scope', '$location', 'Cart',
function($scope, $location, Cart) {

    $scope.carts = $scope.$parent.carts;
    $scope.actual_cart = $scope.$parent.actual_cart;
    $scope.zonesDesc = $scope.$parent.setting.zones_description;
    $scope.zonesDesc = $scope.zonesDesc || 'Зона доставки №1 (светло-зелёный цвет) 50 руб.<br/>Зона доставки №2 (тёмно-зелёный цвет) 80 руб.';
    $scope.zonesDesc = $scope.zonesDesc += '<br/>Открыть карту?';



    $scope.show_delivery_zones = function(){
        $a.confirm($scope.zonesDesc,function(){
            var map = '<div></div><script type="text/javascript" charset="utf-8" src="http://api-maps.yandex.ru/services/constructor/1.0/js/?sid=r7iJfgIosKiHK6_cCFl3MaHw3CtuPew2"></script></div>';
            window.open().document.write(map);
        });
    };

    function loadZones(){

    }

}]);

