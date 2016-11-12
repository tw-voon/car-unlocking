angular
.module('vowolita.main.route', [])
.config(config);

function config($stateProvider) {
    console.log('scr.main.route');
    $stateProvider
    .state('app.main', {
        url: '/main',
        views: {
            'menuContent': {
                templateUrl: 'main/main.html',
                controller: 'MainCtrl as ctrl'
            }
        }
    });
}
