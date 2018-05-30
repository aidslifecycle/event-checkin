onlineCheckin.service('incentivesService', function($rootScope, $http) {
	return {
		getIncentives: function getIncentives(cons_id) {
			var incentives = firebaseIncentives.database().ref('/incentives/' + cons_id);
			return incentives;
		},
		getTop545: function getIncentives(cons_id) {
			var incentives = firebaseIncentives.database().ref('/top545/' + cons_id);
			return incentives;
		},
		getTop50: function getIncentives(cons_id) {
			var incentives = firebaseIncentives.database().ref('/top50/' + cons_id);
			return incentives;
		},
		updateIncentives: function updateIncentives(incentiveObject) {
			firebase
				.database()
				.ref('/' + cons_id)
				.set(incentiveObject);
		}
	};
});
