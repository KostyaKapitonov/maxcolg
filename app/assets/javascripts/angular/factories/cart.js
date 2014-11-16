ANTALEX.factory('Cart', ['$resource', function($resource) {
    return $resource('/carts/:action', {format: 'json'},
        {
            'all': {},
            'add_position': {method: 'POST', params: {action: 'add_position'}},
            'remove_position': {method: 'DELETE', params: {action: 'remove_position'}},
            'confirm': {method: 'POST', params: {action: 'confirm'}},
            'proceed': {method: 'POST', params: {action: 'proceed'}},
            'destroy': {method: 'DELETE', params: {action: 'destroy'}}
        });
}]);