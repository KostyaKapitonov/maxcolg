ANTALEX.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
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
        .when('/products/:id', {
            templateUrl: '/products/:id.html',
            controller: 'ProductViewController'
        })
        .when('/', {
            templateUrl: '/main_content.html',
            controller: 'MainPageController'
        })
        .when('/contacts', {
            templateUrl: '/main_content.html',
            controller: 'MainPageController'
        }).
        otherwise({
            redirectTo: '/'
        });

    $locationProvider.html5Mode(true);
}]);