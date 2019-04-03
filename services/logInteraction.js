// @ts-ignore
onlineCheckin.service('LogInteraction', function($http, $rootScope, $log, $location) {
	// Simplify logging interactions in Controllers
	return {
		luminateServlet: 'CRConsAPI',
		luminateMethod: 'method=logInteraction',
		sso_auth_token: '&sso_auth_token=' + $rootScope.sso_auth_token,
		consId: '&cons_id=',
		interactionTypeId: '&interaction_type_id=1000',
		interactionSubject: '&interaction_subject=ALC-Check-In',
		interactionBody: '&interaction_body=',
		submit: function(cons_id, notes) {
			$http({
				method: 'POST',
				url: $rootScope.uri + this.luminateServlet,
				data:
					this.luminateMethod +
					$rootScope.postdata +
					this.interactionTypeId +
					this.interactionSubject +
					this.interactionBody +
					notes +
					this.consId +
					cons_id +
					this.sso_auth_token,
				headers: $rootScope.header
			}).then(
				// @ts-ignore
				function(responseData) {
					//Success
					$log.info('Log Interaction Successful for cons: ' + cons_id);
				},
				function(responseData) {
					//Error

					$log.error('Log Interaction Unsuccessful');
					$log.error(responseData);
					//alert('Not checked-in. Refresh the page and try again.');
					$location.path('/');
				}
			);
		}
	};
});

// @ts-ignore
onlineCheckin.service('LogLocalStorage', function($http, $rootScope, $log, $location) {
	// Simplify logging interactions in Controllers
	return {
		submit: function(cons_id, notes) {
			window.localStorage.setItem(cons_id, notes);
		}
	};
});
// @ts-ignore
onlineCheckin.service('LogFirebase', function($http, $rootScope, $log, $location) {
	// Simplify logging interactions in Controllers
	return {
		submit: function(cons_id, email, dotrNumber) {
			// @ts-ignore
			firebaseCheckin
				.database()
				.ref('checkin/' + cons_id)
				.update(
					{
						email: email,
						dotrNumber: dotrNumber,
						time: Date()
					},
					function(error) {
						if (error) {
							console.log(error);
						} else {
							// Data saved successfully!
							console.log('Data saved!');
						}
					}
				);
		}
	};
});
