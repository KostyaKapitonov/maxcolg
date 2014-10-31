var INVEST = angular.module('invest', ['ngRoute', 'ngResource', 'ngSanitize'])
    .controller('MainController',['$scope', '$route', '$routeParams', '$location', 'Global', function($scope, $route, $routeParams, $location, Global) {
        $scope.$route = $route;
        $scope.$location = $location;
        $scope.$routeParams = $routeParams;
        $scope.setting = null;

        var real_path = getParameterByName('real_pathname');
        if(real_path && real_path.length > 0){
            delete $location.$$search.real_pathname;
            $location.path(real_path);
        } else {
            if(!$scope.setting){
                Global.main({},function(data){
                    $scope.setting = data;
                })
            }
        }
    }])
    .config([
        "$httpProvider", function($httpProvider) {
            $httpProvider.defaults.headers.common['X-CSRF-Token'] = $('meta[name=csrf-token]').attr('content');
        }
    ]);

