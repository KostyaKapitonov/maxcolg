INVEST.controller('ProductFormController', ['$scope', '$routeParams', 'Products', '$location', 'Global', function($scope, $routeParams, Products, $location, Global) {
    $scope.params = $routeParams;

    if($routeParams.id){
        Products.get({id:$routeParams.id, action:'edit', format:'json'}, function(data){
            $scope.product = data;
        })
    } else $scope.isNew = true;

    Global.get_category_and_firm_options(function(data){
        $scope.categories = data.categories;
        $scope.firms = data.firms || [];
        if($scope.isNew){
            $scope.product = {};
            if( $scope.categories.length) $scope.product.category_id = $scope.categories[0].id;
            if( $scope.firms.length) $scope.product.firm_id = $scope.firms[0].id;
        }
    });

    $scope.save = function(){
        if($scope.product.id){
            Products.update({product: $scope.product, id: $scope.product.id, action:'update'}, function(data){
                if(data.success){
                    $location.path('/products');
                }
            });
        } else {
            Products.save({product: $scope.product}, function(data){
                if(data.success){
                    $location.path('/products');
                }
            });
        }
    };

    $scope.cancel = function(){
        $scope.product = {};
        $location.path('/products');
    };

    // TODO: category
    $scope.new_category = function(){
        $scope.new_category_name = '';
    };

    $scope.delete_category = function(){
        if($scope.product.category_id == null) return;
        Global.delete_category_or_firm_option({category: $scope.product.category_id},function(data){
            if(data.success){
                $scope.categories = data.categories;
                if($scope.categories.length) {
                    $scope.product.category_id = $scope.categories[0].id;
                } else $scope.product.category_id = null;
            }
        });
    };

    $scope.add_category = function(){
        if(!$scope.new_category_name || $scope.new_category_name == '') return;
        Global.create_category_or_firm_option({category: {name: $scope.new_category_name}},function(data){
            if(data.success){
                $scope.categories = data.categories;
                $scope.product.category_id = data.category.id;
                $scope.new_category_name = null;
            }
        });
    };

    $scope.cancel_category = function(){
        $scope.new_category_name = null;
    };

    // TODO: firm
    $scope.new_firm = function(){
        $scope.new_firm_name = '';
    };

    $scope.delete_firm = function(){
        if($scope.product.firm_id == null) return;
        Global.delete_category_or_firm_option({firm: $scope.product.firm_id},function(data){
            if(data.success){
                $scope.firms = data.firms;
                if($scope.firms.length) {
                    $scope.product.firm_id = $scope.firms[0].id;
                } else $scope.product.firm_id = null;
            }
        });
    };

    $scope.add_firm = function(){
        if(!$scope.new_firm_name || $scope.new_firm_name == '') return;
        Global.create_category_or_firm_option({firm: {name: $scope.new_firm_name}},function(data){
            if(data.success){
                $scope.firms = data.firms;
                $scope.product.firm_id = data.firm.id;
                $scope.new_firm_name = null;
            }
        });
    };

    $scope.cancel_firm = function(){
        $scope.new_firm_name = null;
    };
}]);