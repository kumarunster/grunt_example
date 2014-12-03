(function () {

    
angular.module('yoApp').factory('DateService', DateService);
    
    
function DateService ($q, $http) {
    
    var serviceCall = function () {
        var defResult = $q.defer();
        
        $http.get('/api/dateAdd')
        .success(function (data) {
            console.log("data " + data);
            defResult.resolve(data);
        })
        .error(function (data) {
            console.log("error " + data);
            defResult.reject('cannot request api');
        });
        
        
        return defResult.promise;
    };
    
    return {
        doServiceCall: serviceCall
    };
}
    
//DateService.$inject([]);
    
})();
