(function () {
    'use strict';

    angular
        .module('trinetixTz')
        .run(runBlock);

    /** @ngInject */
    function runBlock($rootScope) {
        $rootScope.loader = true;
    }

})();
