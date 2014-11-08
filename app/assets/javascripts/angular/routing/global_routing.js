
// todo: Set available routes to prevent 404 or forcing redirect

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
        })
        .when('/users/login', {
            templateUrl: '/users/login.html',
            controller: 'UsersController'
        })
        .when('/users/create', {
            templateUrl: '/users/create.html',
            controller: 'UsersController'
        })
        .when('/users/password_reset', {
            templateUrl: '/users/password_reset.html',
            controller: 'UsersController'
        })
        .when('/users/email_to_reset_pass', {
            templateUrl: '/users/email_to_reset_pass.html',
            controller: 'UsersController'
        })
        .otherwise({
            redirectTo: '/'
        });

    $locationProvider.html5Mode(true);
}]);