// Include after app module and participant-search.js
onlineCheckin.controller('participantInformation', function(
	$scope,
	$timeout,
	LogInteraction,
	constituentService,
	participantProgress,
	fundraisingService,
	$http,
	$rootScope,
	$log,
	$routeParams,
	$location
) {
	if ($rootScope.loggedIn === false) {
		window.location.href = '#!/';
	}

	// Get the participant's Consituent ID from the URL
	$scope.cons_id = $scope.$routeParams = $routeParams.cons_id;

	// Initialize notes field, waiver, and set Coney Success image to false
	$scope.notes = '';
	$scope.dotrNumber = '';
	$scope.waiver = false;
	$scope.donorServices;
	$scope.dotrNumberConfirmed = '';
	$scope.coney = false;
	$scope.fundraisingResults = '';

	// Create the cons_info Object
	$scope.cons_info = {};
	$scope.loading = true;

	constituentService.getConsRecord($scope.cons_id).then(function(data) {
		if (data) {
			// Enable tooltips
			$('body').tooltip({ selector: '[data-toggle="tooltip"]' });
			$scope.loading = false;
			$scope.cons_info = data.data.getConsResponse;
			var customBooleans = $scope.cons_info.custom.boolean;
			var customStrings = $scope.cons_info.custom.string;
			$scope.groupArray = [].concat(customBooleans, customStrings);
			console.table($scope.cons_info.custom.string);
		} else {
			alert('Lost connection ☹️... Refresh the page and login again.');
			$rootScope.loggedIn = false;
			$location.path('/');
		}
	});

	fundraisingService.getFundraisingResults($scope.cons_id).then(function(fundraisingAmount) {
		$scope.fundraisingResults = fundraisingAmount / 100;
	});

	$scope.checkIn = function() {
		//Log a check-in interaction in Luminate
		// The LogInteraction Service lives in js/app-checkin.js
		LogInteraction.log($scope.cons_id, $scope.dotrNumber);

		//Display Coney
		$scope.coney = true;

		//Return to Search
		$timeout(function() {
			$location.path('/search');
		}, 2500);
	};
});
