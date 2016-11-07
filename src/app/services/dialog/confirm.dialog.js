(function() {
    'use strict';

    angular
        .module('trinetixTz')
        .service('confirmDialog', function ($uibModal){

            return function (title, descr) {
                var modalInstance = $uibModal.open({
                    template: '<div class="modal-header"><h3 class="modal-title">{{title}}</h3></div><div class="modal-body">{{descr}}</div><div class="modal-footer"><button class="btn btn-primary" type="button" ng-click="ok()">OK</button><button class="btn btn-warning" type="button" ng-click="cancel()">Cancel</button></div>',
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
