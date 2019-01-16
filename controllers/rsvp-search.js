//Include after app-check-in.js
onlineCheckin.controller('rsvpSearch', function ($scope, $log, $http, $rootScope, $location, $routeParams) {

    if ($rootScope.loggedIn === false) {
        alert("You are not logged in!");
        window.location.href = '#!/';
    }

    $scope.preventDefault = function(form) {
        console.log(form);
    }

    $scope.members = {};
    $scope.loading = false;

    $scope.$watch("searchBox", function (newValue, oldValue) {
        if (newValue === undefined) {
            delete $scope.searchBox;
        }
    });

    //Token
    var sso_auth_token = "&sso_auth_token=" + $rootScope.sso_auth_token;

    //ALC Options
    var header = {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        uri = "https://actnow.tofighthiv.org/site/",
        postdata = "&api_key=" + luminate_config.api_key + "&v=1.0&response_format=json";

    $http({
        method: 'POST',
        url: uri + "CRConsAPI",
        data: "method=getGroupMembers&api_key=" + luminate_config.api_key + "&v=1.0&response_format=json&group_id=" + luminate_config.group_id + sso_auth_token,
        headers: header
    }).then(function (responseData) {
        $log.info("Received group information");
        $scope.members = angular.copy(responseData.data.getGroupMembersResponse.member);
        $scope.loading = true;
    }, function (responseData) {
        $log.error("Could not get RSVP Group");
        $log.info(responseData);
    });

    $scope.open = function(participant) {

        console.log("RSVP PART",participant);

        //Opens a page with the Participant's infp form the Convio Constituent Profile
        $location.path('checkin-participant/' + participant.cons_id);

    }; //End open function

});