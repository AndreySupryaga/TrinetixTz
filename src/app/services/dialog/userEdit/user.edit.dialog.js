(function () {
    'use strict';

    angular
        .module('trinetixTz')
        .service('userEditDialog', function ($uibModal) {
            return function (user) {
                var modalInstance = $uibModal.open({
                    templateUrl: 'app/services/dialog/userEdit/user.edit.dialog.html',
                    controller: function ($scope) {
                        $scope.userModel = angular.copy(user);
                        $scope.ok = function () {
                            angular.equals(user, $scope.userModel) ?
                                modalInstance.close() :
                                modalInstance.close($scope.userModel);
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
