ANTALEX.controller('MainPageController', ['$scope', '$location',
function($scope, $location) {

    console.log('MainPageController init');
    $scope.refreshLoadStatus = function(counter){
        counter = counter || 0;
        if(counter < 50 && ($a.blank($scope.$parent) || $a.blank($scope.$parent.setting))){
            setTimeout(function(){
                cl('refreshLoadStatus');
                $scope.refreshLoadStatus(counter++);
            },100);
        } else {
            if($location.path() == '/'){
                console.log('HOME');
                $scope.$parent.setting.current_page_html = $scope.$parent.setting.main_page_text;
            } else if($location.path() == '/contacts'){
                console.log('Contacts');
                $scope.$parent.setting.current_page_html = $scope.$parent.setting.contacts_text;
            }
        }
    };
    $scope.refreshLoadStatus();
}]);

