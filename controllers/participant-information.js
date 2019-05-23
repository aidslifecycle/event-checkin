// Include after app module and participant-search.js
onlineCheckin.controller('participantInformation', function(
	$scope,
	$timeout,
	LogInteraction,
	LogLocalStorage,
	LogFirebase,
	constituentService,
	participantProgress,
	tentAddressService,
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

	$scope.$watch('tentAddress', function(val) {
		console.log(val);
	});

	console.log(tentAddressService.getTentAddress());

	constituentService.getConsRecord($scope.cons_id).then(function(data) {
		if (data) {
			// Enable tooltips
			$('body').tooltip({ selector: '[data-toggle="tooltip"]' });
			$scope.loading = false;
			$scope.cons_info = data.data.getConsResponse;
			$scope.tentAddress = $scope.cons_info.custom.string[7].content;
			$scope.medform = $scope.cons_info.custom.boolean[1].content
				? 'Recieved'
				: 'Need medical slip';
			var customBooleans = $scope.cons_info.custom.boolean;
			var customStrings = $scope.cons_info.custom.string;
			$scope.groupArray = [].concat(customBooleans, customStrings);
			console.table($scope.cons_info.custom.string);
		} else {
			alert('Lost connection! Refresh the page and login again.');
			$rootScope.loggedIn = false;
			$location.path('/');
		}
	});

	fundraisingService.getFundraisingResults($scope.cons_id).then(function(fundraisingAmount) {
		$scope.fundraisingResults = fundraisingAmount / 100;
	});

	$scope.checkIn = function() {
		var tent_address = document.getElementById('tentAddress').value;
		$scope.notes =
			'Wavier received: ' +
			$scope.medform +
			' | ' +
			'Fundraising amount: ' +
			$scope.fundraisingResults +
			' | ' +
			'Tent Address: ' +
			tent_address;

		// Submit a check-in interaction in Luminate Online, Firebase and Local Storage
		LogInteraction.submit($scope.cons_id, $scope.notes);
		LogLocalStorage.submit($scope.cons_id, $scope.notes);
		LogFirebase.submit(
			$scope.cons_id,
			$scope.cons_info.email.primary_address,
			tent_address,
			$scope.fundraisingResults
		);

		console.log('Notes:', $scope.notes);
		console.log('Waiver:', $scope.waiver);
		console.log('Fundraising', $scope.fundraisingResults);
		console.log('Tent Address', document.getElementById('tentAddress').value);

		// Display Coney
		$scope.success = true;

		//Return to Search
		$timeout(function() {
			$location.path($rootScope.searchRoute);
		}, 2500);
	};
});
