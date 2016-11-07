(function () {
    'use strict';

    angular.module('trinetixTz')
        .filter('rangeFilter', function () {
            return function (items, min, max) {
                var result = [];
                min = parseInt(min);
                max = parseInt(max) || Number.MAX_VALUE;
                if (min) {
                    for (var i = 0; i < items.length; i++) {
                        if (items[i].age >= min && items[i].age <= max) {
                            result.push(items[i]);
                        }
                    }
                    return result;
                }
                return items;
            };
        })

})();