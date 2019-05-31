onlineCheckin.service('constituentService', function($http, $rootScope) {
	return {
		getConsRecord: function(constituentId) {
			return $http({
				method: 'POST',
				url: $rootScope.uri + 'CRConsAPI',
				data:
					'method=getUser' +
					$rootScope.postdata +
					'&cons_id=' +
					constituentId +
					'&sso_auth_token=' +
					$rootScope.sso_auth_token,
				headers: $rootScope.header
			}).then(
				function(consResponse) {
					return consResponse;
				},
				function(consResponseErorr) {
					console.log('Error getting Constituent Information', consResponseErorr);
				}
			);
		}
	};
});
