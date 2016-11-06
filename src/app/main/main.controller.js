(function () {
    'use strict';

    angular
        .module('trinetixTz')
        .controller('gridController', MainController);

    function MainController($scope, userList, toastr, $uibModal, $filter) {


        $scope.limit = '10';
        $scope.currentPage = 1;
        $scope.ageRange = 'all';
        $scope.userModel = angular.copy(userList);
        $scope.userList = userList;
        $scope.userEdit = userEdit;
        $scope.userDelete = userDelete;
        $scope.isAllSelected = false;
        $scope.checkboxes = {};

        $scope.sellectAll = function () {
            angular.forEach($scope.userList, function (item) {
                $scope.checkboxes[item.id] = $scope.isAllSelected;
            })
        };

        $scope.$watch('[currentPage, limit, sortReverse, searchTerm, ageRange]', function () {
            $scope.userList = filterUserList();
        }, true);

        function filterUserList() {
            var filteredData;
            if ($scope.ageRange) {
                var rangeArr = $scope.ageRange.split('-');
                rangeArr = rangeArr[1] ? rangeArr : $scope.ageRange.split('+');
                filteredData = $filter('rangeFilter')($scope.userModel, rangeArr[0], rangeArr[1]);
            }
            filteredData = $filter('filter')(filteredData, $scope.searchTerm);
            filteredData = $filter('orderBy')(filteredData, $scope.sortType, $scope.sortReverse);
            $scope.pagesLength = filteredData.length;
            filteredData = $filter('limitTo')(filteredData, $scope.limit, $scope.currentPage===1 ? 0 : ($scope.currentPage - 1) * $scope.limit);
            return filteredData;
        }

        function userEdit(user) {
            var modalInstance = $uibModal.open({
                templateUrl: 'editModal.html',
                controller: function ($scope) {
                    $scope.userModel = angular.copy(user);
                    $scope.ok = function () {
                        modalInstance.close($scope.userModel);
                    };
                    $scope.cancel = function () {
                        modalInstance.dismiss('cancel');
                    };
                }
            });
            modalInstance.result.then(function (changedModel) {
                angular.extend(user, changedModel);
                toastr.success('Edited', 'Success');
            });
        }

        function userDelete(user) {
            var modalInstance = $uibModal.open({
                templateUrl: 'deleteModal.html',
                controller: function ($scope) {
                    $scope.name = user.firstName + ' ' + user.lastName;
                    $scope.ok = function () {
                        modalInstance.close();
                    };
                    $scope.cancel = function () {
                        modalInstance.dismiss('cancel');
                    };
                }
            });
            modalInstance.result.then(function () {
                $scope.userList.splice($scope.userList.indexOf(user), 1);
                $scope.userModel.splice($scope.userModel.indexOf(user), 1);
                toastr.success('Deleted', 'Success');
            });
        }

    }
})();
