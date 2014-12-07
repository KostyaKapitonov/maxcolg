ANTALEX.factory('Cart', ['$resource', function($resource) {
    return $resource('/carts/:action', {format: 'json'},
        {
            'all':              {isArray: true},
            'statuses':         {params: {action:'statuses'}, isArray: true},
            'add_position':     {method: 'POST', params: {action: 'add_position'}},
            'remove_position':  {method: 'DELETE', params: {action: 'remove_position'}},
            'confirm':          {method: 'POST', params: {action: 'confirm'}},
            'proceed':          {method: 'POST', params: {action: 'proceed'}},
            'destroy':          {method: 'DELETE', params: {action: 'destroy'}},
            'zones':            {params: {action: 'zones'}, isArray: true},
            'add_zone':         {method: 'POST', params: {action: 'add_zone'}},
            'del_zone':         {method: 'DELETE', params: {action: 'del_zone'}}
        });
}]);