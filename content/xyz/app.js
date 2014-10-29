(function () {

angular.module('yoApp', [
    'ngRoute'
])
    .config(function($routeProvider) {
        $routeProvider
        .when('/', {
            templateUrl: 'content/xyz/views/mainTemplate.html',
            controller: 'MainCtrl',
            controllerAs: 'main',
            resolve: {
                'MainData': function () {
                    console.log('resolve main data!');
                    return {data: 'myData'};
                }
            }
        });
    });
    
    ;
})();