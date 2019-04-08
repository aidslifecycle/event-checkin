// @ts-ignore
onlineCheckin.controller('loginCtrl', function($scope, $log, $http, $rootScope) {
	$scope.username = window.localStorage.username || '';
	$scope.password = window.localStorage.password || '';

	$scope.loginSubmit = function() {
		//ALC Options
		let header = { 'Content-Type': 'application/x-www-form-urlencoded' },
			uri = 'https://actnow.tofighthiv.org/site/',
			// @ts-ignore
			postdata = '&api_key=' + luminate_config.api_key + '&v=1.0&response_format=json';
		let luminateServlet = 'CRConsAPI',
			luminateMethod = 'method=login',
			username = '&user_name=' + $scope.username,
			password = '&password=' + $scope.password;

		$http({
			method: 'POST',
			url: uri + luminateServlet,
			data: luminateMethod + postdata + username + password,
			headers: header
		}).then(
			function(responseData) {
				//Success
				window.localStorage.username = $scope.username;
				window.localStorage.password = $scope.password;
				$scope.loginResponse = responseData.data.loginResponse;
				$rootScope.sso_auth_token = $scope.loginResponse.token;
				$rootScope.loggedIn = true;
				$rootScope.logInError = false;
				window.location.href = '#!/checkin-search';
			},
			function(responseData) {
				//Error
				$log.warn('Login unsuccessful!');
				$log.error(responseData);
				$rootScope.loggedIn = false;
				$rootScope.logInError = true;
			}
		);
	}; //end loginSubmit
});
