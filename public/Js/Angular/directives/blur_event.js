app.directive('ngBlur', function($document) {
    return {
        link: function(scope, element, attrs) {
            $(element).bind('blur', function(e){
                scope.$apply(attrs.ngBlur);
            });
        }
    }
})
