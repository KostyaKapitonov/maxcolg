ANTALEX.controller('UsersController', ['$scope', '$location','$routeParams', 'User', 'Auth',
                                  function($scope, $location, $routeParams, User, Auth) {

    $scope.user = null;
    $scope.credentials = null;

    $scope.login = function(){
        $scope.credentials = {email: $scope.email, password: $scope.password};
        Auth.login($scope.credentials).then(function(user) {
            console.log('+++');
            console.log(user); // => {id: 1, ect: '...'}
        }, function(error) {
            if(error.data.error == 'You have to confirm your email address before continuing.')
                $a.alert('Вы еще не подтвердили свой email. Проверьте свою почту и перейдите по ссылке для завершения регистрации');
            else
                $a.alert('Неверный email и/или пароль', 'Ошибка');
            console.log(error);
        });
    };

    $scope.reg_user = function(){
        $a.wait();
        $scope.credentials = {email: $scope.email,
                            password: $scope.password,
                            password_confirmation: $scope.password_confirmation};
        Auth.register($scope.credentials).then(function(registeredUser) {
            console.log('Registration COMPLETE!');
            console.log(registeredUser); // => {id: 1, ect: '...'}
            $location.path('/');
            $a.alert('Проверьте пожалуйста свою почту.');
            $a.done();
        }, function(error) {
            console.log('Registration failed...');
            console.log(error);
            $a.done();
        });
    };

    if('/users/password_reset' == $location.path()){
        $scope.reset_mode = true;
        User.check_password_reset_token({token: $location.search().token},function(res){
            if(!res.email){
                $location.path('/');
                $a.alert('Ссылка устарела. <br/>Это могло произойти если вы выслали еще 1 (или более) раз письмо с ссылкой для восстановления пароля. Воспользуйтель ссылкой в самом последнем (свежем) письме.','Ошибка');
            } else {
                $scope.email = res.email;
                $scope.token = $location.search().token;
            }
        });
    }

    $scope.send_email = function(){
        $a.wait();
        User.is_email_free({email: $scope.email},function(check_data){
            if(check_data.free == false){
                User.mail_to_reset({user:{email: $scope.email}},function(res){
                    $a.done();
                    $location.path('/');
                    $a.alert('Проверьте свою электронную почту.','Email');
                });
            } else {
                $a.done();
                $a.alert('К сожалению пользователь с таким Email-ом не найден. <br/>Убедитесь в правильности введённого email-а.','Email')
            }
        });
    };

    $scope.reset_pass = function(){
        User.apply_new_password({password: $scope.password,
                password_confirmation: $scope.password_confirmation,
                token: $scope.token
            },
            function(res){
                console.log(res);
                $location.path('/');
                $a.alert('Пароль успешно изменён.');
        });
    };

    $scope.$on('devise:login', function(event, currentUser) {
        console.log(event, currentUser);
        console.log("$scope.$on('devise:login'");
    });

    $scope.$on('devise:new-session', function(event, currentUser) {
        console.log("$scope.$on('devise:new-session'");
        console.log(event, currentUser);
    });
}]);