//Include after app module and participant-search.js
onlineCheckin.controller('participantInformation', function($scope, $http, $rootScope, $log, $uibModalInstance, participant) {

    //ALC Options
    var header = {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        uri = "https://actnow.tofighthiv.org/site/",
        postdata = "&api_key=" + luminate_config.api_key + "&v=1.0&response_format=json";

    $scope.checkInButtonDisable = false;
    $scope.selected = participant;
    $scope.dotrNumber = null;

    $scope.ok = function() {

            $rootScope.badgeInformation = {};

            var luminateServlet = "CRConsAPI",
                luminateMethod = "method=logInteraction",
                sso_auth_token = "&sso_auth_token=" + $rootScope.sso_auth_token,
                //What is the consId?
                consId = "&cons_id=" + $scope.selected.consInfo.cons_id,
                interactionTypeId = "&interaction_type_id=1000",
                interactionSubject = "&interaction_subject=Event check-in",
                interactionBody = "&interaction_body=" + luminate_config.interaction_body;

            $http({
                method: 'POST',
                url: uri + luminateServlet,
                data: luminateMethod + postdata + interactionTypeId + interactionSubject + interactionBody + consId + sso_auth_token,
                headers: header
            }).then(function(responseData) {
                //Success
                $log.info("Log Interaction Successful for cons: " + $scope.selected.consInfo.cons_id);
                $log.info(responseData);
                var checkin_success = document.getElementById("checkin-success");
                checkin_success.classList.add("fadeIn");
                setTimeout(function() {
                    checkin_success.classList.remove("fadeIn");
                    $uibModalInstance.close($scope.selected);
                }, 1000);
            }, function(responseData) {
                //Error
                $log.error("Log Interaction Unsuccessful");
                $log.error(responseData);
                alert("Session timed out. Please login.");
                $uibModalInstance.close($scope.selected);
                window.location.href = '#!/';
            });
    };

    $scope.cancel = function() {
        $uibModalInstance.dismiss('cancel');
    };
});
