ANTALEX.directive('errblock', ['$compile', function($compile){
    return {
        restrict: 'C',
        link: function(scope, element, attrs) {
            var elements = element.parents('tr:first').find('input, select');
            window.d = scope;
            elements.on('focus', function(e){
                if(!element.hasClass('editing')) element.addClass('editing');
            });
            elements.on('blur', function(e){
                if(element.hasClass('editing')) element.removeClass('editing');
            });
            element.click(function(e){
                if(elements.length)elements[0].focus();
            })
        }

    };
}]);