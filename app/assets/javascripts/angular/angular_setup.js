var ANTALEX = angular.module('antalex', ['ngRoute', 'ngResource', 'ngSanitize','colorpicker.module'])
    .controller('MainController',['$scope', '$route', '$routeParams', '$location', 'Global', 'Products', function($scope, $route, $routeParams, $location, Global, Products) {
        $scope.$route = $route;
        $scope.$routeParams = $routeParams;
        $scope.loadFinished = false;
        $scope.form_displayed = false;
        $scope.reportUnDelived = true;

        function report(name, data){
            $scope.reportUnDelived = true;
            var counter = 0;
            var resendReport = function(){
                setTimeout(function(){
                    $scope.$broadcast(name, data);
                    if($scope.reportUnDelived && counter < 50){
                        resendReport();
                        counter++;
                    }
                },10);
            };
            resendReport();
        }

        $scope.$on('delivered', function() {
            setTimeout(function(){
                $scope.reportUnDelived = false;
            },110);
        });

        $scope.$on('$routeChangeSuccess', function () {
            $scope.form_displayed =(/(^\/products\/new$|^\/products\/\d+\/edit$)/.test($location.path()));
            $scope.selectedFirm = $location.search().firm;
            $scope.selectedCategory = $location.search().category;
            $scope.paramsPart = ($scope.selectedFirm ? '?firm='+$scope.selectedFirm : '')+
                ($scope.selectedCategory ? '&category='+$scope.selectedCategory : '');
        });

        var real_path = $location.$$search.real_pathname;
        if(real_path && real_path.length > 0){
            delete $location.$$search.real_pathname;
            $location.path(real_path);
        }

        $scope.getProducts = function(){
            Products.getAll(function(data){
                $scope.products = data.products;
                $scope.categories = data.categories;
                $scope.firms = data.firms;
                bindAssortment();
                $scope.loadFinished = true;
                report('dataLoaded');
            });
        };

        function bindAssortment(){
            $scope.assortment = {};
            $scope.assortmentList = [];
            $scope.products.each(function(p){
                $scope.categories.each(function(c){
                    if(p.category_id == c.id){
                        $scope.firms.each(function(f){
                            if(p.firm_id == f.id){
                                if(!$scope.assortment[f.name]){
                                    $scope.assortment[f.name] = {id: f.id};
                                }
                                if(!$scope.assortment[f.name][c.name]){
                                    $scope.assortment[f.name][c.name] = {id: c.id};
                                }
                            }
                        })
                    }
                });
            });

            Object.keys($scope.assortment).each(function(key){
                var cats = [];
                Object.keys($scope.assortment[key]).each(function(subKey){
                    if (subKey != 'id'){
                        cats.push({
                            name: subKey,
                            id: $scope.assortment[key][subKey].id
                        });
                    }
                });
                $scope.assortmentList.push(
                    {
                        name: key,
                        id: $scope.assortment[key].id,
                        catigories: cats
                    }
                );

            });
        }

        if($scope.products == null) $scope.getProducts();
    }])
    .config([
        "$httpProvider", function($httpProvider) {
            $httpProvider.defaults.headers.common['X-CSRF-Token'] = $('meta[name=csrf-token]').attr('content');
        }
    ]);

