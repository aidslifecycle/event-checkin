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

	constituentService.getConsRecord($scope.cons_id).then(function(data) {
		if (data) {
			$scope.loading = false;
			$scope.cons_info = data.data.getConsResponse;
			$scope.tentAddress = $scope.cons_info.custom.string[7].content;

			tentAddressService
				.getTentAddress($scope.cons_id)
				.once('value')
				.then(function(snap) {
					var checkinData = snap.val();
					var firebaseTentAddress = checkinData && checkinData.tent ? checkinData.tent : null;
					console.log('firebaseTentAddress', firebaseTentAddress);
					$scope.tentAddress = firebaseTentAddress || $scope.cons_info.custom.string[7].content;
					$scope.$digest();
				})
				.catch(function(error) {
					$scope.tentAddress = $scope.cons_info.custom.string[7].content;
					console.warn('Firebase tentAddress error', error);
				});

			fundraisingService.getFundraisingResults($scope.cons_id).then(function(fundraisingAmount) {
				$scope.fundraisingResults = fundraisingAmount / 100;
				console.log('part type check', $scope.cons_info.custom.string[17].content);
				$scope.fundraisingMinimum =
					$scope.cons_info.custom.string[17].content.toLowerCase() === 'cyclist' &&
					$scope.fundraisingResults < 3000;
			});

			// Enable tooltips
			$('body').tooltip({ selector: '[data-toggle="tooltip"]' });

			var med = false;
			$scope.cons_info.custom.boolean.forEach(function(item) {
				console.log('custom item', item);
				if (item.id === 'custom_boolean3') {
					med = item.content.toLowerCase() === 'true';
					console.log('content', item.content, 'med', med);
				}
			});

			$scope.medform = med
				? 'We have received the their medical survey. Proceed to step 3.'
				: 'We have not received their medical survey. The participant needs to present you with a pass from the Medical team. If you need help ask a staff member.';
			var customBooleans = $scope.cons_info.custom.boolean;
			//console.table('customBooleans', customBooleans);
			var customStrings = $scope.cons_info.custom.string;
			$scope.groupArray = [].concat(customBooleans, customStrings);

			// console.group();
			// console.log('CONS INFO');
			// console.table($scope.cons_info.custom.string);
			// $scope.cons_info.custom.string.forEach((element) => {
			// 	console.log('element', element);
			// });
			// console.groupEnd();
		} else {
			alert('Lost connection! Refresh the page and login again.');
			$rootScope.loggedIn = false;
			$location.path('/');
		}
	});

	$scope.checkIn = function() {
		$scope.$digest();
		$scope.notes =
			'Wavier received: ' +
			$scope.medform +
			' | ' +
			'Fundraising amount: ' +
			$scope.fundraisingResults +
			' | ' +
			'Tent Address: ' +
			$scope.tentAddress;

		// Submit a check-in interaction in Luminate Online, Firebase and Local Storage
		LogInteraction.submit($scope.cons_id, $scope.notes);
		LogLocalStorage.submit($scope.cons_id, $scope.notes);
		LogFirebase.submit(
			$scope.cons_id,
			$scope.cons_info.email.primary_address,
			$scope.tentAddress,
			$scope.fundraisingResults
		);

		console.log('Notes:', $scope.notes);
		console.log('Waiver:', $scope.waiver);
		console.log('Fundraising', $scope.fundraisingResults);
		console.log('Tent Address', $scope.tentAddress);

		// Display Coney
		$scope.success = true;

		//Return to Search
		$timeout(function() {
			console.log($rootScope.searchRoute);
			$location.path($rootScope.searchRoute);
		}, 3000);
	};
});
