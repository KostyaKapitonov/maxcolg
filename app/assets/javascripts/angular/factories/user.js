ANTALEX.factory('User', ['$resource', function($resource) {
    return $resource('/users/:action', null,
        {
            uLogin: {params: {format: 'json', action: 'u_login'}},
            password_reset: {params: {format: 'json', action: 'password_reset'}},
            check_password_reset_token: {params: {format: 'json', action: 'password_reset'}},
            mail_to_reset: {method: 'POST',params: {format: 'json', action: 'password'}},
            is_email_free: {params: {format: 'json', action: 'is_email_free'}},
            apply_new_password: {method: 'POST',params: {format: 'json', action: 'password_reset'}}
        });
}]);