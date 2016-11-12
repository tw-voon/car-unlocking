angular
.module('vowolita.profile.route', [])
.config(config);

function config($stateProvider) {
    console.log('scr.profile.route');
    $stateProvider
    .state('app.profile', {
        url: '/profile',
        views: {
            'menuContent': {
                templateUrl: 'profile/profile.html',
                controller: 'ProfileCtrl as vm'
            }
        }
    });
}