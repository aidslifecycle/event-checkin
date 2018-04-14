onlineCheckin.controller('loginCtrl', function($scope, $log, $http, $rootScope) {

    $scope.username = luminate_config.username || "";
    $scope.password = luminate_config.password || "";

    //ALC Options
    var header = {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        uri = "https://actnow.tofighthiv.org/site/",
        postdata = "&api_key="+luminate_config.api_key+"&v=1.0&response_format=json";

    $scope.loginSubmit = function() {

            var luminateServlet = "CRConsAPI",
                luminateMethod = "method=login",
                username = "&user_name=" + $scope.username,
                password = "&password=" + $scope.password;

            $http({
                method: 'POST',
                url: uri + luminateServlet,
                data: luminateMethod + postdata + username + password,
                headers: header
            }).then(function(responseData) {
                //Success
                $log.info("Login successful!");
                $log.info(responseData);
                $scope.loginResponse = responseData.data.loginResponse;
                $rootScope.sso_auth_token = $scope.loginResponse.token;
                $rootScope.loggedIn = true;
                $rootScope.logInError = false;
                window.location.href = '#!/search';
                
            }, function(responseData) {
                //Error
                $log.warn("Login unsuccessful!");
                $log.error(responseData);
                $rootScope.loggedIn = false ;
                $rootScope.logInError = true;
            });

        } //end loginSubmit

});
