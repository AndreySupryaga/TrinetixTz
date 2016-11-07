(function () {
    'use strict';

    angular
        .module('trinetixTz')
        .controller('gridController', MainController);

    function MainController($scope, $http, toastr, $uibModal, $filter, confirmDialog) {

        $scope.limit = '10';
        $scope.currentPage = '1';
        $scope.ageRange = 'all';
        $scope.userModel = [];
        $scope.isAllSelected = false;
        $scope.checkboxes = {};
        $scope.userEdit = userEdit;
        $scope.userDelete = userDelete;
        $scope.userDeleteSelected = userDeleteSelected;
        $scope.selectUser = selectUser;

        /**
         * Getting users data
         */
        $http.get('app/userList.json').then(function (response) {
            $scope.userModel = response.data;
            $scope.userList = filterUserList();
            $scope.loader = false;
        });
        /**
         * Watch for filter data
         */
        $scope.$watch('[currentPage, limit, sortReverse, searchTerm, ageRange]', function () {
            $scope.userList = filterUserList();
        }, true);

        $scope.editInPlaceSave = function (arg) {
            toastr.success(arg.previousValue + ' => ' + arg.value, 'Changed');
        };

        /**
         * Edit select user in dialog window
         * @param {Object} user - User data
         */
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

        /**
         * Delete select user in dialog window
         * @param {Object} user - User data
         */
        function userDelete(user) {
            var title = 'Delete user';
            var descr = 'You really want to delete ' + user.firstName + ' ' + user.lastName;
            confirmDialog(title, descr)
                .then(function () {
                    modelDeleteItem(user);
                    $scope.userList = filterUserList();
                    toastr.success('Deleted', 'Success');
                });
        }

        /**
         * Delete selected users in dialog window
         */
        function userDeleteSelected() {
            var title = 'Delete users';
            var descr = 'You really want to delete selected users';
            confirmDialog(title, descr)
                .then(function () {
                    for (var i = 0; i < $scope.userList.length; i++) {
                        if ($scope.checkboxes[$scope.userList[i].id]) {
                            modelDeleteItem($scope.userList[i]);
                        }
                    }
                    $scope.userList = filterUserList();
                    $scope.isAllSelected = false;
                    $scope.checkboxes = {};
                    toastr.success('Selected item deleted', 'Success');
                });
        }

        /**
         * Select all users using the checkboxSelect all items in page
         */
        $scope.selectAll = function () {
            if ($scope.isAllSelected) {
                angular.forEach($scope.userList, function (item) {
                    $scope.checkboxes[item.id] = $scope.isAllSelected;
                })
            } else {
                $scope.checkboxes = {};
            }
        };

        /**
         * The user's choice using checkbox
         * @param {String} id - User's id
         */
        function selectUser(id) {
            if (!$scope.checkboxes[id]) {
                delete $scope.checkboxes[id];
            } else {
                $scope.checkboxes[id] = true;
            }
        }

        /**
         * Filter for users
         * @returns {Array} {*} - Array with filtered user
         */
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
            filteredData = $filter('limitTo')(filteredData, $scope.limit, $scope.currentPage === 1 ? 0 : ($scope.currentPage - 1) * $scope.limit);
            return filteredData;
        }

        $scope.isEmptyObject = function (obj) {
            return angular.equals({}, obj);
        };


        function modelDeleteItem(item) {
            $scope.userModel.splice($scope.userModel.indexOf(item), 1);

        }

    }
})();
