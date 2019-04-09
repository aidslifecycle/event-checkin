// Include after app module and participant-search.js
// @ts-ignore
onlineCheckin.controller('participantInformation', function(
	$scope,
	$timeout,
	LogInteraction,
	LogLocalStorage,
	LogFirebase,
	constituentService,
	fundraisingService,
	$rootScope,
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
	$scope.waiver = false;
	$scope.donorServices;
	$scope.success = false;
	$scope.fundraisingResults = '';
	$scope.tentAddress = '';

	//Day on The Ride information
	$scope.dotrNumber = '';
	$scope.dotrNumberConfirmed = '';

	// Create the cons_info Object
	$scope.cons_info = {};
	$scope.loading = true;

	$scope.$watch('dotrNumber', function(val) {
		console.log(val);
	});

	// Assigned to the ng-disabled selector on the submit button
	// Checks the length of the Day On The Ride number and if the
	// Confirmation buttons have been checked.
	$scope.check = function(checkbox, num) {
		return checkbox && num.length === 4;
	};

	constituentService.getConsRecord($scope.cons_id).then(function(data) {
		if (data) {
			// Enable tooltips
			$('body').tooltip({ selector: '[data-toggle="tooltip"]' });
			$scope.loading = false;
			$scope.cons_info = data.data.getConsResponse;
		} else {
			alert('Lost connection! Refresh the page and login again.');
			$scope.loading = false;
			//$rootScope.loggedIn = false;
			//$location.path('/');
		}
	});

	fundraisingService.getFundraisingResults($scope.cons_id).then(function(fundraisingAmount) {
		$scope.fundraisingResults = fundraisingAmount / 100;
	});

	$scope.checkIn = function() {
		$scope.notes = 'Day on the Ride number: ' + $scope.dotrNumber;

		// Submit a check-in interaction in Luminate Online, Firebase and Local Storage
		LogInteraction.submit($scope.cons_id, $scope.notes);
		LogLocalStorage.submit($scope.cons_id, $scope.notes);
		LogFirebase.submit($scope.cons_id, $scope.cons_info.email.primary_address, $scope.dotrNumber);

		// Display Coney
		$scope.success = true;

		//Return to Search
		$timeout(function() {
			$location.path($rootScope.searchRoute);
			console.log('search route', $rootScope.searchRoute);
		}, 2500);
	};
});
