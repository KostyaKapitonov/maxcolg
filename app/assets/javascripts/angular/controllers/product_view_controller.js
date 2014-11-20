ANTALEX.controller('ProductViewController', ['$scope', '$location','$routeParams', 'Products', '$sce', '$anchorScroll', '$filter', 'Cart',
function($scope, $location, $routeParams, Products, $sce, $anchorScroll, $filter, Cart) {

    $scope.searchProcessing = false;
    $scope.curentPos = 0;
    $scope.currentUser = $scope.$parent.currentUser;

    function loadViewData(){
        if($scope.product != null) return;
        if($routeParams.id && $scope.$parent && $scope.$parent.products && $scope.$parent.products.length) {
            $scope.$parent.products.each(function(p){
                if(p.id == $routeParams.id) {
                    $scope.product = p;
                    prepareFilteredList();
                }
            });
            $anchorScroll();
        }
        else {
            setTimeout(function(){
                loadViewData();
            },50);
        }
    }

    function prepareFilteredList(){
        $scope.filredProducts = $filter('onlySelected')($scope.$parent.products,
            $scope.$parent.selectedFirm,$scope.$parent.selectedCategory);
        $scope.cntrls = $scope.filredProducts.length > 1;
        $scope.filredProducts.each(function(p,i){
            if(p.id == $scope.product.id) $scope.curentPos = i;
        })
    }

    $scope.next = function(i){
        $scope.curentPos+= i;
        if($scope.curentPos < 0) $scope.curentPos+= $scope.filredProducts.length;
        if($scope.curentPos == $scope.filredProducts.length) $scope.curentPos-= $scope.filredProducts.length;
        $location.path('/products/'+$scope.filredProducts[$scope.curentPos].id);
//        $scope.product = $scope.filredProducts[$scope.curentPos];
    };

    $scope.htmlSafe = function(html_code) {
        return $sce.trustAsHtml(html_code);
    };

    $scope.back = function(){
        $scope.product = null;
        $location.path('/products');
    };

    $scope.delete_product = function(id){
        Products.delete({id: id}, function(data){
            if(data.success){
                $scope.$parent.products.splice($scope.products.whereId(id, true),1);
                $location.path('/products');
            }
        })
    };

    function isAllRequiredInfoComplete(){
        var completed = true;
        'first_name last_name father_name mobile address'.split(' ').each(function(prop){
            if($a.blank($scope.currentUser[prop])) {
                completed = false;
            }
        });
        return completed;
    }

    $scope.addToCart = function(){
        if(!$scope.currentUser){
            $('<div><p class="dialog_msg">Оформление заказа доступно только зарегистрированным пользователям.' +
                'Если вы уже зарегистрированы - зайдите пожалуйста в свой аккаунт.</p><div>').dialog({ modal: true, position: 'top',
                buttons: [ { text: "Вход", click: function() {
                    $location.path('/users/login');
                    $scope.$apply();
                    $( this ).dialog( "close" ); } },
                { text: "Регистрация", click: function() {
                    $location.path('/users/create');
                    $scope.$apply();
                    $( this ).dialog( "close" ); } }
                ], title: 'Добавление в корзину невозможно'});
        } else if($scope.currentUser && isAllRequiredInfoComplete()){
            Cart.add_position({product_id: $scope.product.id}, function(res){
                if(res.success){
                    $scope.$parent.addCartToList(res);
                    $a.info('Товар добавлен в корзину');
                } else if(res.already){
                    $('<div><p class="dialog_msg"><b>Данный товар уже добавлен в корзину.</b><br/>Если вы хотите заказать несколько одних и тех же ' +
                    'товаров, их количество вы сможете указать при утверждении заказа. Вы можете продолжить выбор товаров, ' +
                    'либо перейти к утверждению заказа</p><div>').dialog({ modal: true, position: 'top', width: 440,
                        buttons: [ { text: "Приступить к утверждению заказа", click: function() {
                            $location.path('/carts/view');
                            $scope.$apply();
                            $( this ).dialog( "close" ); } },
                            { text: "Продолжить выбор товаров", click: function() {
                                $( this ).dialog( "close" ); } }
                        ], title: 'Выберите действие'});
                } else {
                    $a.err('неизвестная ошибка');
                    cl(res);
                }
            });
            console.log('completed!');
        } else {
            $a.confirm('К сожалению вы ещё не заполнили все необходимые данные о себе.<br/>' +
                'А без этого невозможно оформить заказ.<br/>Хотите заполнить недостающую информацию прямо сейчас?',
            function(){
                $location.path('/users/account');
                $scope.$apply();
            });
        }
    };

    loadViewData();
}]);