angular
    .module('vowolita.core.config', ['vowolita.domainHelper.module'])
    .config(config);

function config($urlRouterProvider, $ionicConfigProvider, DomainHelperProvider, $compileProvider) {
    // $urlRouterProvider.otherwise('/app/main');
    // .otherwise('/startup_setting');
	$ionicConfigProvider.scrolling.jsScrolling(false);
	// $ionicConfigProvider.views.transition('none');
    // $ionicConfigProvider.views.maxCache(0);

    // enable forwardCache
    $ionicConfigProvider.views.forwardCache(true);

    // DomainHelperProvider.setDomain('http://192.168.191.3/sky8888/3win8a.com');
    DomainHelperProvider.setDomain('http://192.168.112.2/SmartCarLock/public');
    DomainHelperProvider.setApiPath('/app/'); // url to api
}