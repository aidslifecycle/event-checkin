onlineCheckin.service('fundraisingService', function($http, $rootScope) {
	return {
		getFundraisingResults: function(cons_id) {
			return $http({
				method: 'POST',
				url: $rootScope.uri + 'CRTeamraiserAPI',
				data:
					'method=getFundraisingResults' +
					$rootScope.postdata +
					'&cons_id=' +
					cons_id +
					'&fr_id=' +
					$rootScope.fr_id,
				headers: $rootScope.header
			}).then(
				function(trResponse) {

					return trResponse.data.getFundraisingResponse.fundraisingRecord.totalConfirmedAmount;

					// $rootScope.luminate.tr_info = trResponse.data.getRegistrationResponse.registration;
					// console.log("The type ID:", $rootScope.luminate.tr_info.participationTypeId);

					// switch ($rootScope.luminate.tr_info.participationTypeId) {
					//     case "2161":
					//         // Participation type is Cyclist
					//         $rootScope.luminate.tr_info.typeName = "Cyclist";
					//         console.log("The paricipant's type is:",  $rootScope.luminate.tr_info.typeName);
					//         break;
					//     case "2163":
					//         // Participation type is Staff
					//         $rootScope.luminate.tr_info.typeName = "Staff";
					//         console.log("The paricipant's type is:",  $rootScope.luminate.tr_info.typeName);
					//         break;
					//     case "2164":
					//         // Participation type is Staff
					//         $rootScope.luminate.tr_info.typeName = "Roadie";
					//         console.log("The paricipant's type is:",  $rootScope.luminate.tr_info.typeName);
					//         break;
					// }

					// $rootScope.luminate.tr_info.participationTypeId;
					// console.log("TeamRaiser Registration:", $rootScope.luminate.tr_info);
					// console.log("TeamRaiser Participation Type:", $rootScope.luminate.tr_info.participationTypeId);
				},
				function(trResponseErorr) {
					console.log('Error getting TeamRaiser Registration:', trResponseErorr);
				}
			);
		}
	};
});
