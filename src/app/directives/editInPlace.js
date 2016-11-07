(function () {
    'use strict';

    angular
        .module('trinetixTz')
        .directive('editInPlace', function () {
            return {
                restrict: 'A',
                scope: {
                    type: '@',
                    value: '=editInPlace',
                    onSave: '='
                },
                template: '<span ng-click="handleClick()" ng-bind="value"></span><input type="{{type || \'text\'}}" ng-model="modelCopy" style="width:100%;">',
                link: function ($scope, element) {

                    var inputChild = angular.element(element.children()[1]),
                        previousValue;
                    element.addClass('edit-in-place');
                    $scope.editing = false;

                    $scope.handleClick = function () {
                        if (!$scope.editing) {
                            $scope.beginEdit();
                        }
                    };

                    $scope.beginEdit = function () {
                        $scope.editing = true;
                        $scope.modelCopy = $scope.value;
                        previousValue = $scope.value;
                        element.addClass('active');
                        inputChild[0].focus();
                    };

                    inputChild.prop('onblur', function () {
                        if ($scope.editing) {
                            $scope.acceptEdits();
                        }
                    });

                    inputChild.prop('onkeyup', function (e) {
                        if ($scope.editing) {
                            if (e.keyCode === 13) {
                                $scope.acceptEdits();
                            }
                            else if (e.keyCode === 27) {
                                $scope.cancelEdits();
                            }
                        }
                    });

                    $scope.acceptEdits = function () {
                        $scope.value = $scope.modelCopy;
                        $scope.$apply();
                        if ($scope.editing) {
                            $scope.editing = false;
                            element.removeClass('active');
                            if ($scope.modelCopy !== previousValue) {
                                $scope.onSave({value: $scope.modelCopy, previousValue: previousValue});
                            }
                        }
                    };

                }
            };
        });
})();
