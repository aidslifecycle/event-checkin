//Include directly after AngularJS and app dependencies
var onlineCheckin = angular.module('onlineCheckin', ['ui.bootstrap', 'ngRoute', 'ngCookies']);

onlineCheckin.config(function($routeProvider) {
	$routeProvider
		.when('/', {
			templateUrl: 'views/login.html',
			controller: 'loginCtrl'
		})
		.when('/login', {
			templateUrl: 'views/login.html',
			controller: 'loginCtrl'
		})
		.when('/checkin-search', {
			templateUrl: 'views/participant-search.html',
			controller: 'participantSearch'
		})
		.when('/incentive-search', {
			templateUrl: 'views/participant-search.html',
			controller: 'incentiveSearch'
		})
		.when('/checkin-participant/:cons_id', {
			templateUrl: 'views/participant-information.html',
			controller: 'participantInformation'
		})
		.when('/incentives-participant/:cons_id', {
			templateUrl: 'views/incentive-information.html',
			controller: 'incentiveInformation'
		})
		.when('/rsvp', {
			templateUrl: 'views/rsvp-search.html',
			controller: 'rsvpSearch'
		})
		.when('/guest', {
			templateUrl: 'views/guest-info.html',
			controller: 'guestInformation'
		})
		.otherwise({
			templateUrl: 'views/404.html'
		});
});

onlineCheckin.run(function($rootScope, $http, $log) {
	//Luminate API Settings
	$rootScope.header = {
		'Content-Type': 'application/x-www-form-urlencoded'
	};
	$rootScope.uri = 'https://actnow.tofighthiv.org/site/';
	$rootScope.postdata = '&api_key=' + luminate_config.api_key + '&v=1.0&response_format=json';
	$rootScope.sso_auth_token = '';
	$rootScope.fr_id = '2110';
	$rootScope.loggedIn = false;
	$rootScope.logInError = false;
	$rootScope.teamRaiserData = {};
	$rootScope.badgeInformation = {};

	$http({
		method: 'GET',
		url: 'js/participants.json'
	}).then(
		function(responseData) {
			//success
			$rootScope.teamRaiserData = angular.copy(responseData);
		},
		function(responseData) {
			//error
			$rootScope.teamRaiserData = {};
		}
	);
});

var firebaseIncentives = firebase.initializeApp(fb_incentives_config, 'firebaseIncentives');
var firebaseCheckin = firebase.initializeApp(fb_incentives_checkin, 'firebaseCheckin');
