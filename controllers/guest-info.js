// @ts-ignore
onlineCheckin.controller('guestInformation', function($rootScope, $scope, $http, $log) {

    if ($rootScope.loggedIn === false) {
        alert("You are not logged in!");
        window.location.href = '#!/';
    }

    $scope.$watchGroup(["guest.firstName", "guest.lastName", "guest.email"], function(newValues, oldValues) {

        console.log(newValues);

        if (newValues[0] !== undefined && newValues[1] !== undefined && newValues[3] !== undefined) {

            $rootScope.badgeInformation = {
                firstName: $scope.guest.firstName,
                lastName: $scope.guest.lastName,
                partType: "Guest",
                teamName: $scope.guest.company,
                isTeamCaptain: true,
                isRoadieCaption: false,
                roadieTeamAssignment: null
            };

            $scope.printButton = true;

        } else {
            $scope.printButton = true;
        }
    });

    $scope.printBadge = function() {
        window.print();
        $scope.checked = false;
    };

    $scope.clearFields = function() {
        delete $scope.guest.firstName;
        delete $scope.guest.lastName;
        delete $scope.guest.email;
        delete $scope.guest.company;
    };

    $scope.submitGuest = function() {

        $http({
            method: 'POST',
            url: "https://hooks.zapier.com/hooks/catch/702577/ztott3/",
            data: "firstname=" + $scope.guest.firstName + "&lastname=" + $scope.guest.lastName + "&vendorname=" + $scope.guest.company + "&email=" + $scope.guest.email,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        }).then(function(responseData) {
            //Success
            $log.info("Zapier task successful for: " + $scope.guest.firstName + " " + $scope.guest.lastName);
            $log.info(responseData);
            var guest_success = document.getElementById("guest-success");
            guest_success.classList.add("guest-fadeIn");
            $scope.clearFields();
            setTimeout(function () {
                guest_success.classList.remove("guest-fadeIn");
            }, 3000);
        }, function(responseData) {
            //Error
            $log.error("Zapier task unsuccessful");
            $log.error(responseData);
        });

    }
});
