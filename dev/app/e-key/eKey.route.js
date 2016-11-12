angular
    .module('vowolita.ekey.route', [])
    .config(config);

function config($stateProvider) {
    console.log('ekey.route');
    $stateProvider
    .state('app.ekey', {
        url: '/ekey',
        views: {
            'menuContent': {
                templateUrl: 'e-key/ekey.html',
                controller: 'ekeyCtrl as ctrl'
            }
        }
    });
}