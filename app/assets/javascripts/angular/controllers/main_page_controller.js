ANTALEX.controller('MainPageController', ['$scope', '$routeParams', 'Global', '$sce',function($scope, $routeParams, Global, $sce) {

    if($scope.$parent.setting == null){
        Global.main({},function(data){
            $scope.$parent.setting = data;
            $scope.setting = $scope.$parent.setting;
        })
    }

}]);

