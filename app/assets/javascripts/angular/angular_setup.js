var INVEST = angular.module('invest', ['ngRoute', 'ngResource', 'ngSanitize'])
    .controller('MainController',['$scope', '$route', '$routeParams', '$location', 'Global', 'Products', function($scope, $route, $routeParams, $location, Global, Products) {
        $scope.$route = $route;
        $scope.$routeParams = $routeParams;
        $scope.form_displayed = false;

        var real_path = getParameterByName('real_pathname');
        if(real_path && real_path.length > 0){
            delete $location.$$search.real_pathname;
            $location.path(real_path);
            return null;
        } else {
            if(!$scope.setting){
                Global.main({},function(data){
                    cl(data);
                    $scope.setting = data;
                })
            }
        }

        $scope.$on('$routeChangeSuccess', function () {
            $scope.form_displayed =(/(^\/products\/new$|^\/products\/\d+\/edit$)/.test($location.path()));
        });

        Products.getAll(function(data){
            $scope.products = data.products;
        });
    }])
    .config([
        "$httpProvider", function($httpProvider) {
            $httpProvider.defaults.headers.common['X-CSRF-Token'] = $('meta[name=csrf-token]').attr('content');
        }
    ]);

