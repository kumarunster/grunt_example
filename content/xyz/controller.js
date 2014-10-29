(function() {

angular.module('yoApp').controller('MainCtrl', MainCtrl);

/* @ngAnnotate */
function MainCtrl($q, $rootScope, $filter, $interval, MainData) {
    console.log('init MainCtrl');
    
    var vm = this;
    vm.model = MainData.data;
    
    vm.title = "";
    
    
    var defTitle = $q.defer();
    
    $interval(function() {
        defTitle.notify(new Date());
    }, 2000);
    
    var emptyFn = function () {};
    
    var buildTitle = function (date) {
        vm.title = "async title with timestamp: " + $filter('date')(date, 'dd-MMM-yyyy hh:mm:ss');
    };
    
    buildTitle(new Date());
    
    defTitle.promise.then(emptyFn,emptyFn,buildTitle);
    
}

MainCtrl.$inject(['$q', '$rootScope', '$filter', '$interval', 'MainData']);    
 
})();