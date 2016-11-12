angular
    .module('vowolita.mainmenu.controller', [])
    .controller('MainmenuController', ctrl);


function ctrl($scope, $state, StorageService, DomainHelper, menuDrawer, $ionicHistory, $timeout, $ionicPopup, $window, $ionicViewSwitcher, $ionicModal) {
    console.log('scr.mainmenu.controller');
    var vm = this;

    $('#updatepage').css('background-color','#ffffff');

    vm.debugMode = debugmode;
    console.log('debug is', debugmode);

    vm.reload = reload;
    vm.signOut = signOut;
    $scope.goBack = goBack;
    $scope.hide = hide;
    $scope.toggle = toggle;
    $scope.hideMenuFromBackDrop =  hideMenuFromBackDrop;

    menuDrawer.init();

    /////////////

    function reload() {
        console.log("reload");
        $('#updatepage').css('background-color', '#000');
        window.location.reload(true);
    };

    function signOut(argument) {
        $state.go("auth");
    }

    function goBack() {
        $ionicHistory.goBack();
    }

    function hideMenuFromBackDrop() {
        menuDrawer.hide();
    }

    function toggle() {
        menuDrawer.toggle();
    }

    function hide() {
        console.log('hide');
        menuDrawer.hide();
    }
}
