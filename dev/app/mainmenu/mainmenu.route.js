angular
.module('vowolita.mainmenu.route', [])
.config(config);

function config($stateProvider) {
    console.log('scr.mainmenu.route');
    $stateProvider
    .state('app', {
        url: '/app',
        abstract: true,
        templateUrl: 'mainmenu/mainmenu.html',
        controller: 'MainmenuController as menuCtrl'
    });
}
