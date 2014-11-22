ANTALEX.controller('ProductFormController', ['$scope', '$routeParams', 'Products', '$location', 'Global',
function($scope, $routeParams, Products, $location, Global) {
    $scope.isNew = false;
    $scope.usd_rate = $scope.$parent.setting.usd_rate;
    $scope.refreshAssortimentList = false;

    function loadFormData(){
        if($scope.product != null) return;
        if(!$scope.$parent.products) {
            setTimeout(function(){
                loadFormData();
            },50);
            return;
        }
        if($routeParams.id && $scope.$parent.products && $scope.$parent.products.length && !isNaN($location.hash()) && -1 < $location.hash()-0) {
            $scope.$parent.products.each(function(p, i){
                if(p.id == $routeParams.id) {
                    $scope.product = p;
                    $location.hash(i);
                }
            });
        } else if($routeParams.id){
            Products.get({id:$routeParams.id, action:'edit', format:'json'}, function(data){
                $scope.product = data;
            })
        } else $scope.isNew = true;


        if(!$scope.$parent.categories || !$scope.$parent.firms){
            Global.get_category_and_firm_options(function(data){
                $scope.categories = data.categories;
                $scope.firms = data.firms;
                if($scope.isNew){
                    $scope.product = {exist: true};
                    if( $scope.categories.length) $scope.product.category_id = $scope.categories[0].id;
                    if( $scope.firms.length) $scope.product.firm_id = $scope.firms[0].id;
                }
            });
        } else {
            $scope.categories = $scope.$parent.categories;
            $scope.firms = $scope.$parent.firms;
            if($scope.isNew){
                $scope.product = {exist: true};
                console.log($routeParams.firm);
                if( $scope.categories.length) $scope.product.category_id = $routeParams.category ?
                    $scope.categories.whereId($routeParams.category).id : $scope.categories[0].id;
                if( $scope.firms.length) $scope.product.firm_id = $routeParams.firm ?
                    $scope.firms.whereId($routeParams.firm).id : $scope.firms[0].id;
            }
        }
        window.d = $scope.product.name;
    }

    $scope.priceChanged = function(valute){
        if(valute == 'usd'){
            $scope.product.usd_price = $a.toFloat($scope.product.usd_price);
            $scope.product.price = $a.toFloat(($scope.product.usd_price-0)*($scope.usd_rate-0));
        }else{
            $scope.product.price = $a.toFloat($scope.product.price);
            $scope.product.usd_price = $a.toFloat(($scope.product.price-0)/($scope.usd_rate-0));
        }
        $scope.blank = $a.toFloat($scope.product.usd_price) == 0;
    };

    function isFormInvalid(){
        $scope.showErrors = true;
        if($scope.productForm.$invalid) return true;
        return $scope.blank = $a.toFloat($scope.product.usd_price) == 0;
    }

    $scope.save = function(){
        if(isFormInvalid()) return;
        if($scope.product.id){
            Products.update({product: $scope.product, id: $scope.product.id, action:'update'}, function(data){
                if(data.success){
                    $location.path('/products/'+$scope.product.id);
                    $location.hash('glob');
                    $a.info('Изменения сохранены');
                }
            });
        } else {
            Products.save({product: $scope.product}, function(data){
                if(data.success){
                    $scope.product = data.product;
                    $location.path('/products/'+$scope.product.id);
                    $location.hash('glob');
                    $scope.$parent.products.push($scope.product);
                    $a.info('Добавлен новый товар');
                }
            });
        }
    };

    $scope.cancel = function(){
        $scope.product = null;
        $location.path('/products');
        $location.hash('glob');
    };

    // categories
    $scope.new_category = function(){
        $scope.new_category_name = '';
    };

    $scope.delete_category = function(){
        if($scope.product.category_id == null) return;
        $a.confirm('<b>Вы действительно хотите удалить<br/>эту категорию?</b><br/>Пожалуйста убедитесь ' +
            'что в этой категории отсутствуют какие-либо товары (не зависимо от фирмы), для избежания негативных ' +
            'последствий!',function(){
            Global.delete_category_or_firm_option({category: $scope.product.category_id},function(data){
                if(data.success){
                    $scope.categories = data.categories;
                    if($scope.categories.length) {
                        $scope.product.category_id = $scope.categories[0].id;
                    } else $scope.product.category_id = null;
                    $a.info('Категория успешно удалена');
                }
            });
        });
    };

    $scope.add_category = function(){
        if(!$scope.new_category_name || $scope.new_category_name == '') return;
        Global.create_category_or_firm_option({category: {name: $scope.new_category_name}},function(data){
            if(data.success){
                $scope.categories = data.categories;
                $scope.product.category_id = data.category.id;
                $scope.new_category_name = null;
                $a.info('Добавлена новая категория');
            }
        });
    };

    $scope.cancel_category = function(){
        $scope.new_category_name = null;
    };

    // firms
    $scope.new_firm = function(){
        $scope.new_firm_name = '';
    };

    $scope.delete_firm = function(){
        if($scope.product.firm_id == null) return;
        $a.confirm('<b>Вы действительно хотите удалить<br/>эту фирму?</b><br/>Пожалуйста убедитесь ' +
            'что в этой фирме отсутствуют какие-либо товары (не зависимо от категории), для избежания негативных ' +
            'последствий!',function(){
            Global.delete_category_or_firm_option({firm: $scope.product.firm_id},function(data){
                if(data.success){
                    $scope.firms = data.firms;
                    if($scope.firms.length) {
                        $scope.product.firm_id = $scope.firms[0].id;
                    } else $scope.product.firm_id = null;
                    $a.info('Фирма успешно удалена');
                }
            });
        });
    };

    $scope.add_firm = function(){
        if(!$scope.new_firm_name || $scope.new_firm_name == '') return;
        Global.create_category_or_firm_option({firm: {name: $scope.new_firm_name}},function(data){
            if(data.success){
                $scope.firms = data.firms;
                $scope.product.firm_id = data.firm.id;
                $scope.new_firm_name = null;
                $a.info('Добавлена новая фирма');
            }
        });
    };

    $scope.cancel_firm = function(){
        $scope.new_firm_name = null;
    };

    loadFormData();
}]);