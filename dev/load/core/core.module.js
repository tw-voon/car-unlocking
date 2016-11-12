angular
    .module('app.core', [
        'app.core.run'
    ])
    .config(['$compileProvider', function ($compileProvider) {
  // disable debug info
  $compileProvider.debugInfoEnabled(false);
}]);