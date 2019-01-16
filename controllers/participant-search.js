//Include after app-check-in.js
// @ts-ignore
onlineCheckin.controller('participantSearch', function($scope, $log, $http, $rootScope, $location, $routeParams) {

    if ($rootScope.loggedIn === false) {
        window.location.href = '#!/';
    }

    //ALC Options
    var header = {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        uri = "https://actnow.tofighthiv.org/site/",
        postdata = "&api_key=" + luminate_config.api_key + "&v=1.0&response_format=json";

    //Load TeamRaiser JSON
    $scope.searchResults = $rootScope.teamRaiserData.data;
    //Token
    sso_auth_token = "&sso_auth_token=" + $rootScope.sso_auth_token;

    $scope.open = function(participant) {

        //Opens a page with the Participant's infp form the Convio Constituent Profile
        $location.path('checkin-participant/' + participant.consId);

    }; //End open function

    // Function to clear the fields on the search fields
    $scope.clear = function() {
        $scope.searchBox.firstName = "";
        $scope.searchBox.lastName = "";
    };

});
