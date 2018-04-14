//Include directly after AngularJS and app dependencies

var onlineCheckin = angular.module('onlineCheckin', ["ui.bootstrap", "ngRoute","ngCookies"]);

onlineCheckin.config(function($routeProvider) {
    $routeProvider
        .when("/", {
            templateUrl: "views/login.html",
            controller: "loginCtrl"
        })
        .when("/login", {
            templateUrl: "views/login.html",
            controller: "loginCtrl"
        })
        .when("/search", {
            templateUrl: "views/participant-search.html",
            controller: "participantSearch"
        })
        .when("/participant/:cons_id", {
            templateUrl: "views/participant-information.html",
               controller: "participantInformation"
        })
        .when("/rsvp", {
            templateUrl: "views/rsvp-search.html",
            controller: "rsvpSearch"
        })        
        .when("/guest", {
            templateUrl: "views/guest-info.html",
            controller: "guestInformation"
        })
        .otherwise({
            templateUrl: "views/404.html"
        });

});

onlineCheckin.service('LogInteraction', function($http, $rootScope, $log) {

    //This service is used to simplify logging interactions in Controllers

    return {
        luminateServlet: "CRConsAPI",
        luminateMethod: "method=logInteraction",
        sso_auth_token: "&sso_auth_token=" + $rootScope.sso_auth_token,
        consId: "&cons_id=",
        interactionTypeId: "&interaction_type_id=1000",
        interactionSubject: "&interaction_subject=ALC-Check-In",
        interactionBody:"&interaction_body=Checked in.\n\nNotes:\n",
        log: function(cons_id,notes) {

            $http({
                method: 'POST',
                url: $rootScope.uri + this.luminateServlet,
                data: this.luminateMethod + $rootScope.postdata + this.interactionTypeId + this.interactionSubject + this.interactionBody + notes + this.consId + cons_id + this.sso_auth_token,
                headers: $rootScope.header
            })
            .then(function(responseData) {
                //Success
                $log.info("Log Interaction Successful for cons: " + cons_id);
                $log.info(responseData);
            }, function(responseData) {
                //Error
                $log.error("Log Interaction Unsuccessful");
                $log.error(responseData);
            });
        }

    } //End Return

});

onlineCheckin.run(function($rootScope, $http, $log) {

    //Luminate API Settings
    $rootScope.header = {'Content-Type': 'application/x-www-form-urlencoded'};
    $rootScope.uri = "https://actnow.tofighthiv.org/site/";
    $rootScope.postdata = "&api_key=4E7231022132358DD8&v=1.0&response_format=json";
    $rootScope.sso_auth_token = "";
    $rootScope.fr_id = "2050";


    $rootScope.loggedIn = false;
    $rootScope.logInError = false;

    $rootScope.teamRaiserData = {}

    $rootScope.badgeInformation = {};

    $http({
        method: 'GET',
        url: "js/participants.json"
    }).then(function(responseData) {
        //success
        $rootScope.teamRaiserData = angular.copy(responseData);
        
    }, function(responseData) {
        //error
        $rootScope.teamRaiserData = {};
    });

});
