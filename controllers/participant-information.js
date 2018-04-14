// Include after app module and participant-search.js
onlineCheckin.controller('participantInformation', function($scope, $timeout, LogInteraction, constituentService, participantProgress, $http, $rootScope, $log, $routeParams, $location) {

    if ($rootScope.loggedIn === false) {
        alert("You are not logged in!");
        window.location.href = '#!/';
    }

    // Get the participant's Consituent ID from the URL
    $scope.cons_id = $scope.$routeParams = $routeParams.cons_id;

    //@todo get ALC NUMBER
    $scope.alcnum = "";

    // Initialize notes field, waiver, and set Coney Success image to false
    $scope.notes = "";
    $scope.dotrNumber = "";
    $scope.waiver = false;
    $scope.donorServices;
    $scope.dotrNumberConfirmed = "";
    $scope.coney = false;

    // Create the cons_info Object
    $scope.cons_info = {};

    constituentService.getConsRecord($scope.cons_id).then(function(data) {

        $scope.cons_info = data.data.getConsResponse;
        console.log("CONS:", $scope.cons_info);
        console.log("ROOT:", $rootScope);

        var customBooleans = $scope.cons_info.custom.boolean;
        var customStrings = $scope.cons_info.custom.string;
        $scope.groupArray = [].concat(customBooleans, customStrings);


    });

    $scope.checkIn = function() {

        //Log a check-in interaction in Luminate
        LogInteraction.log($scope.cons_id, $scope.notes);

        //Display Coney
        $scope.coney = true;

        //Return to Search
        $timeout(function() {
            $location.path('/search');
        }, 1000);

    }
});