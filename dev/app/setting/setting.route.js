angular
    .module('vowolita.setting.route', [])
    .config(config);

function config($stateProvider) {
    console.log('ekey.route');
    $stateProvider
    .state('app.setting', {
        url: '/setting',
        views: {
            'menuContent': {
                templateUrl: 'setting/setting.html',
                controller: 'settingCtrl as ctrl'
            }
        }
    });
}