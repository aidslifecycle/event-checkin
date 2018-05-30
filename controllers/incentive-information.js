// Include after app module and participant-search.js
onlineCheckin.controller('incentiveInformation', function(
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
	$location,
	incentivesService
) {
	if ($rootScope.loggedIn === false) {
		window.location.href = '#!/';
	}

	// Get the participant's Consituent ID from the URL
	$scope.cons_id = $scope.$routeParams = $routeParams.cons_id;

	//@todo get ALC NUMBER
	// $scope.alcnum = "";

	/**
	 * INCENTIVE KEYS:
	 * I_15K = All types $15,000
	 * I_10K = All types $10,000
	 * I_5K = All types $5,000
	 * I_C3K = Cyclist $3,000
	 * I_R3K = Roadie $3,000
	 * I_C1500 = Cyclist $1,500
	 * I_R1500 = Cyclist $1,500
	 * I_C1000 = Cyclist $1,000
	 * I_C500 = Cyclist 500
	 * I_R500 = Roadie 500
	 * I_R100 = Roadie 100
	 */

	$scope.incentiveDisplay = {};
	$scope.top545Display = {};
	$scope.top50Display = {};

	$scope.incentives = incentivesService.getIncentives($scope.cons_id);
	$scope.top545 = incentivesService.getTop545($scope.cons_id);
	$scope.top50 = incentivesService.getTop50($scope.cons_id);

	$scope.incentives.on('value', function(snapshot) {
		$scope.$apply(function() {
			$scope.incentiveDisplay = snapshot.val();
			console.log('Incentives: ', $scope.incentiveDisplay);
		});
	});

	$scope.top545.on('value', function(snapshot) {
		$scope.$apply(function() {
			$scope.top545Display = snapshot.val();
			console.log('Top 545:', $scope.top545Display);
		});
	});

	$scope.top50.on('value', function(snapshot) {
		$scope.$apply(function() {
			$scope.top50Display = snapshot.val();
			console.log('Top 50: ', $scope.top50Display);
		});
	});

	// Initialize notes field, waiver, and set Coney Success image to false
	$scope.notes = '';
	$scope.coney = false;

	// Create the cons_info Object
	$scope.cons_info = {};
	$scope.loading = true;

	constituentService.getConsRecord($scope.cons_id).then(function(data) {
		if (data) {
			$scope.loading = false;
			$scope.cons_info = data.data.getConsResponse;
			console.log($scope.cons_info);
			var customBooleans = $scope.cons_info.custom.boolean;
			var customStrings = $scope.cons_info.custom.string;
			$scope.groupArray = [].concat(customBooleans, customStrings);
		} else {
			alert('Lost connection ☹️... Refresh the page and login again.');
			$rootScope.loggedIn = false;
			$location.path('/');
		}
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
