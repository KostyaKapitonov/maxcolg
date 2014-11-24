ANTALEX.controller('UsersController', ['$scope', '$location','$routeParams', 'User', 'Auth',
function($scope, $location, $routeParams, User, Auth) {

    $scope.user = null;
    $scope.credentials = null;
    $scope.unconfirmed = true;

    $scope.login = function(){
        console.log($a.blocked);
        if($a.blocked) return;
        $a.wait();
        $scope.credentials = {email: $scope.email, password: $scope.password};
        Auth.login($scope.credentials).then(function(user) {
            $a.info('Приветствуем вас в нашем интернет-магазине.');
            $scope.$parent.currentUser = user;
            $location.path('/');
            $a.done();
            $scope.bindAssortment();
            $scope.$parent.load_carts();
        }, function(error) {
            if(error.data.error == 'You have to confirm your email address before continuing.')
                $a.alert('Вы еще не подтвердили свой email. Проверьте свою почту и перейдите по ссылке для завершения регистрации');
            else
                $a.alert('Неверный email и/или пароль', 'Ошибка');
            cl(error);
            $a.done();
        });
    };

    $scope.loginOnEnter = function(event){
        if(event.keyCode == 13){
            $scope.login();
            setTimeout(function() { $(event.currentTarget).blur();  }, 0);
        }
    };

    angular.element('[name="password_confirmation"],[name="password"]').blur(function(){
        $scope.$apply(function(){
            $scope.unconfirmed = $scope.password_confirmation != angular.element('[name="password"]').val();
        });
    });

    function isFormInvalid(){
        console.log($scope.showErrors);
        $scope.showErrors = true;
        console.log($scope.showErrors);
        window.d = $scope.userForm;
        window.dd = $scope.userForm.email;
        if($scope.password != $scope.password_confirmation || $scope.userForm.$invalid) {
            $a.err('введённые вами данные содержат <br/>ошибки, пожалуйста исправьте их');
            return true;
        }
        return false;
    }

    $scope.reg_user = function(){
        if(isFormInvalid()) return;
        $a.wait();
        $scope.credentials = {email: $scope.email.toLocaleLowerCase(),
                            password: $scope.password,
                            password_confirmation: $scope.password_confirmation};
        Auth.register($scope.credentials).then(function(registeredUser) {
            console.log(registeredUser); // => {id: 1, ect: '...'}
            $location.path('/');
            $a.alert('Проверьте пожалуйста свою почту.');
            $a.done();
        }, function(res) {
            if(res.data && res.data.errors && res.data.errors.email && res.data.errors.email[0] == "has already been taken"){
                $('<div><p class="dialog_msg">Такой Email уже используется.<br/>Если это ваш Email, но вы забыли пароль, вы можете воспользоватся восстановлением пароля.</p><div>').dialog(
                    { modal: true, position: 'top', buttons: [
                        { text: "Восстановить пароль", click: function() {
                            $( this ).dialog( "close" );
                            $location.path('/users/email_to_reset_pass');
                            $scope.$apply();
                        }},
                        { text: "Отмена", click: function() {
                            $( this ).dialog( "close" );
                        }}
                    ] });
            }
            cl(res);
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
        if(isFormInvalid()) return;
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
        if(isFormInvalid()) return;
        $a.wait();
        User.apply_new_password({password: $scope.password,
                password_confirmation: $scope.password_confirmation,
                token: $scope.token
            },
            function(res){
                console.log(res);
                $location.path('/');
                $a.alert('Пароль успешно изменён.');
                $a.done();
            });
    };


}]);