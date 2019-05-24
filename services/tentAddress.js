onlineCheckin.service('tentAddressService', function() {
	return {
		getTentAddress: function(cons_id) {
			var checkinData = firebaseCheckin.database().ref('/checkin/' + cons_id);
			return checkinData;
		}
	};
});
