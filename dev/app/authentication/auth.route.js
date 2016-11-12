angular
    .module('vowolita.auth.route', [])
    .config(config);

function config($stateProvider) {
	console.log('scr.auth.route');
    $stateProvider
    .state('auth', {
        url: '/auth',
        cache: false, // force controller to run each time
        templateUrl: 'authentication/auth.html',
        controller: 'AuthCtrl as ctrl'
    });
}