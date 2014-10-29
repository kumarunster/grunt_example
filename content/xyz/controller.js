(function() {

angular.module('yoApp').controller('MainCtrl', MainCtrl);

/* @ngAnnotate */
function MainCtrl($q, $rootScope, $filter, $interval, 
                   MainData, DateService) {
    console.log('init MainCtrl');
    
    var vm = this;
    vm.model = MainData.data;
    
    vm.title = "Template title";
    
    
    var defTitle = $q.defer();
    
    $interval(function() {
        defTitle.notify(new Date());
    }, 1000);
    
    var emptyFn = function () {};
    var dateFilter = $filter('date');
    var buildTitle = function (date) {
        vm.timestamp = dateFilter(date, 'dd-MMM-yyyy hh:mm:ss');
    };
    
    buildTitle(new Date());
    
    defTitle.promise.then(emptyFn,emptyFn,buildTitle);
    
    
    vm.callService = function () {
        DateService.doServiceCall()
        .then(function (date) {
            vm.serviceResult = date;
        },
        function (reason) {
            vm.serviceResult = reason;
        });
    };
    
}

//MainCtrl.$inject(['$q', '$rootScope', '$filter', '$interval', 'MainData']);    
 
})();