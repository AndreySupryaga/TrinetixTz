(function () {
    "use strict";

    angular.module('trinetixTz')
        .config(function ($routeProvider) {
            $routeProvider
                .when("/", {
                    templateUrl: "app/components/user/user.grid.html",
                    controller: "userGridCtrl"
                })
                .otherwise({
                    redirectTo: '/'
                });
        });
})();