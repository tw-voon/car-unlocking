angular
.module('vowolita.core.run', [])
.run(run);

function run($ionicPlatform, $ionicPopup, $state, StorageService, $ionicHistory, $rootScope, menuDrawer, $cordovaToast, $stateParams) {
    console.log('scr.core.run');
    var backView,
        currentState;

    // $ionicPlatform.ready(function() {
        // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
        // for form inputs)
        if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
            cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
            cordova.plugins.Keyboard.disableScroll(true);

        }
        if (window.StatusBar) {
            // org.apache.cordova.statusbar required
            StatusBar.styleLightContent();
        }

        // check login ...
        var login = false;

        if (login) {
            $state.go('app.main');
        } else {
            $state.go('auth');
        }

    $ionicPlatform.registerBackButtonAction(function(event) {
        backView = $ionicHistory.backView();
        currentState = $state.$current.name;
        console.log("BACK!!!!!");
        console.log($ionicHistory.viewHistory());

        if (menuDrawer.openned) {
            // hide menu if it is opened
            menuDrawer.hide();

        } else if (backView===null || currentState==="auth"  || currentState==='app.main' || backView.stateName===currentState) {
            // e.preventDefault();
            // e.stopPropagation();
            $ionicPopup.confirm({
                title: 'Exit',
                template: 'Exit app?',
                okType: 'button-assertive'
            }).then(function(ok) {
                if(ok){
                    navigator.app.exitApp();
                }
            });
        } else {
            $ionicHistory.goBack();
        }

    }, 100);
}
