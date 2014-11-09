var ANTALEX = angular.module('antalex', ['ngRoute', 'ngResource', 'ngSanitize', 'Devise']);
ANTALEX.controller('MainController',['$scope', '$routeParams', '$location', 'Global', 'Products', 'User', 'Auth',
    function($scope, $routeParams, $location, Global, Products, User, Auth) {

        $scope.$routeParams = $routeParams;
        $scope.loadFinished = false;
        $scope.form_displayed = false;
        $scope.reportUnDelived = true;

        if(localStorage.getItem('pathname')){
            var pathname = localStorage.getItem('pathname');
            var search = localStorage.getItem('search');
            localStorage.removeItem('pathname');
            localStorage.removeItem('search');
            var refresh = function(i){
                i = i++ || 0;
                setTimeout(
                    function(){
                        if(!$scope.loadFinished && i < 50) refresh(i);
                        else {
                            $location.path(pathname).search(search);
                        }
                    },50);
            };
            refresh();
        }

        $scope.getUser = function(){
            Auth.currentUser().then(function(user) {
                // User was logged in, or Devise returned
                // previously authenticated session.
                $scope.currentUser = user;
                console.log(user); // => {id: 1, ect: '...'}
            }, function(error) {
                console.log(error);
            });
        };

        $scope.logout = function(){
            Auth.logout().then(function(oldUser) {
                $scope.currentUser = null;
            }, function(error) {
                cl(error);
            });
        };

        $scope.uLogin = function(token){
            User.uLogin({u_token: token},function(res){
//                console.log(res);
                if(res.authorized){

                }
                else if(res.data.error){
                    cl(res.data.error);
                } else {
                    $scope.user = res.data;
                    $location.path('/users/new');
                }
            });
        };

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
        console.log($location.search());
        console.log($location.search().confirm_msg);
        if($location.search().confirm_msg == 'invalid_token') {
            $('<div><p class="dialog_msg">Скорее всего вы уже завершили регистрацию<br/>Если вы забыли пароль, вы можете воспользоватся восстановлением пароля.</p><div>').dialog(
                { modal: true, position: 'top', buttons: [
                    { text: "Восстановить пароль", click: function() {
                        $( this ).dialog( "close" );
                        $location.path('/users/email_to_reset_pass');
                        $scope.$apply();
                    }},
                    { text: "Отмена", click: function() {
                        $( this ).dialog( "close" );
                    }}
                ] });
        }
        if($location.search().confirm_msg == 'thx') {
            $a.alert('Cпасибо за регистрацию. Заполните пожалуйста недостающие данные.');
//            $location();
        }

        if(!$scope.products) $scope.getProducts();
        if(!$scope.currentUser) $scope.getUser();
    }]);

ANTALEX.config([
        "$httpProvider", function($httpProvider) {
            $httpProvider.defaults.headers.common['X-CSRF-Token'] = $('meta[name=csrf-token]').attr('content');
        }
    ]);
ANTALEX.config(function(AuthProvider) {
        // Ignore 401 Unauthorized everywhere
        AuthProvider.ignoreAuth(true);
    });

