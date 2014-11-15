ANTALEX.controller('ProductViewController', ['$scope', '$location','$routeParams', 'Products', '$sce', '$anchorScroll', '$filter',
function($scope, $location, $routeParams, Products, $sce, $anchorScroll, $filter) {

    $scope.searchProcessing = false;
    $scope.curentPos = 0;
    $scope.currentUser = $scope.$parent.currentUser;

    $scope.$on('dataLoaded', function() {
        $scope.$emit('delivered', 'yeah');
        loadViewData();
    });

    if($scope.$parent.loadFinished) loadViewData();
    function loadViewData(){
        if($scope.product != null) return;
        if($routeParams.id && $scope.$parent && $scope.$parent.products && $scope.$parent.products.length) {
            $scope.$parent.products.each(function(p, i){
                if(p.id == $routeParams.id) {
                    $scope.product = p;
                }
            });
            if($scope.product == null && $routeParams.id) setTimeout(function(){loadViewData();},100);
            else $anchorScroll();
        }
        else if($routeParams.id){
            Products.get({id:$routeParams.id, format:'json'}, function(data){
                $scope.product = data;
            })
        }
        if($scope.searchProcessing) return;
        $scope.searchProcessing = true;
        var refreshParentLoadStatus = function(i){
            i = i || 0;
            if(i++ > 50) return;
            if(!$scope.$parent.loadFinished) setTimeout(function(){
                refreshParentLoadStatus();
            },50);
            else prepareFilteredList();
        };
        refreshParentLoadStatus();
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
        $scope.product = $scope.filredProducts[$scope.curentPos];
    };

    $scope.htmlSafe = function(html_code) {
        return $sce.trustAsHtml(html_code);
    };

    $scope.back = function(){
        $scope.product = null;
        $location.path('/products');
    };

    $scope.delete = function(id){
        console.log(id);
        Products.delete({id: id}, function(data){
            if(data.success){
                $scope.products.splice($scope.products.whereId(id, true),1);
                $location.path('/products');
            }
        })
    };

    $scope.addToCart = function(){
        if(!$scope.$parent.currentUser){
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
        }
    }
}]);