ANTALEX.controller('SettingController', ['$scope', '$location', 'Setting',
function($scope, $location, Setting) {

    $scope.page_name = $location.search().page;
    var refresh = function(){
        if($scope.page_name && $scope.$parent.setting) $scope.page = $scope.$parent.setting[$scope.page_name];
        else setTimeout(function(){refresh();},100);
    };
    refresh();

    $scope.save_page = function(){
        var params = {setting: {}};
        params.setting[$scope.page_name] = $scope.page;
        Setting.update(params,function(data){
            if(data.success){
                $scope.$parent.setting[$scope.page_name] = $scope.page;
                $a.info('Изменения сохранены');
                $location.path('/settings/global');
            }
        });
    };

    $scope.toggle_ra = function(){
        $a.wait();
        Setting.update({setting: {recalculatable: $scope.$parent.setting.recalculatable}},function(data){
            if(data.success){
                $a.alert($scope.$parent.setting.recalculatable ? '<b>Включено</b> автоматическое обновление курса $' :
                    'Автоматическое обновление курса $ было <b>отключено</b>', 'Обновление курса валют');
                $location.path('/settings/global');
                $a.done();
            }
        });
    };

}]);