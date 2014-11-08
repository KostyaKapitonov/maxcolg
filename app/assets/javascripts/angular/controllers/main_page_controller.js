ANTALEX.controller('MainPageController', ['$scope', '$routeParams', 'Global', '$sce', '$location', function($scope, $routeParams, Global, $sce, $location) {

    $scope.editMode = false;

    $scope.isMainPage = $location.path() == '/';
    if($scope.$parent.setting == null){
        Global.main({},function(data){
            if($scope.$parent) {
                $scope.$parent.setting = data;
                $scope.setting = $scope.$parent.setting;
            }
            else $scope.setting = data;
        })
    }

    $scope.editPage = function(){
        $scope.isMainPage = $location.path() == '/';
        $scope.new_text = $scope.isMainPage ? $scope.setting.main_page_text : $scope.setting.contacts_text;
        $scope.editMode = true;
        $scope.$parent.form_displayed = true;
    };

    $scope.cancelEditMode = function(){
        $scope.editMode = false;
        $scope.$parent.form_displayed = false;
    };

    $scope.savePage = function(){
        if($scope.isMainPage){
            $scope.setting.main_page_text = $scope.new_text;
        } else {
            $scope.setting.contacts_text = $scope.new_text;
        }
        Global.update_settings({setting:$scope.setting},function(data){
            if(data.success){
                $scope.editMode = false;
                $scope.$parent.form_displayed = false;
            }
        });
        $scope.new_text = null;
    };

    $scope.htmlSafe = function(html_code) {
        return $sce.trustAsHtml(html_code);
    };
}]);

