'use strict';

angular.module('stockTracker.version', [
  'stockTracker.version.interpolate-filter',
  'stockTracker.version.version-directive'
])

.value('version', '0.1');
