(function() {
  'use strict';

  angular
    .module('trinetixTz')
    .run(runBlock);

  /** @ngInject */
  function runBlock($log) {

    $log.debug('runBlock end');
  }

})();
