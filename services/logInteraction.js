onlineCheckin.service('LogInteraction', function($http, $rootScope, $log) {

    // Simplify logging interactions in Controllers
    return {
        luminateServlet: "CRConsAPI",
        luminateMethod: "method=logInteraction",
        sso_auth_token: "&sso_auth_token=" + $rootScope.sso_auth_token,
        consId: "&cons_id=",
        interactionTypeId: "&interaction_type_id=1000",
        interactionSubject: "&interaction_subject=ALC-Check-In",
        interactionBody: "&interaction_body=DOTR NUMBER: ",
        log: function(cons_id, notes) {
            $http({
                method: 'POST',
                url: $rootScope.uri + this.luminateServlet,
                data: this.luminateMethod + $rootScope.postdata + this.interactionTypeId + this.interactionSubject + this.interactionBody + notes + this.consId + cons_id + this.sso_auth_token,
                headers: $rootScope.header
            }).then(function(responseData) {
                //Success
                $log.info("Log Interaction Successful for cons: " + cons_id);
            }, function(responseData) {
                //Error
                $log.error("Log Interaction Unsuccessful");
                $log.error(responseData);
            });
        }
    }

});