(function () {
    'use strict';

    angular
        .module('trinetixTz')
        .service('confirmDialog', function ($uibModal) {
            return function (title, descr) {
                var modalInstance = $uibModal.open({
                    templateUrl: 'app/services/dialog/confirm/confirm.dialog.html',
                    controller: function ($scope) {
                        $scope.title = title;
                        $scope.descr = descr;
                        $scope.ok = function () {
                            modalInstance.close();
                        };
                        $scope.cancel = function () {
                            modalInstance.dismiss('cancel');
                        };
                    }
                });
                return modalInstance.result;
            }
        });

})();
