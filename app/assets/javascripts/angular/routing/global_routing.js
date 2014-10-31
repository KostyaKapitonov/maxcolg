INVEST.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
    $routeProvider
        .when('/products', {
            templateUrl: 'products.html',
            controller: 'ProductsListController'
        })
        .when('/products/new', {
            templateUrl: '/products/new.html',
            controller: 'ProductFormController'
        })
        .when('/products/:id/edit', {
            templateUrl: '/products/:id/edit.html',
            controller: 'ProductFormController'
        })
        .when('/', {
            templateUrl: '/main_content.html',
            controller: 'MainController'
        });

    $locationProvider.html5Mode(true);
}]);