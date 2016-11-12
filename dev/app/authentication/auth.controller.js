angular
    .module('vowolita.auth.controller', [])
    .controller('AuthCtrl', ctrl);

function ctrl($state, DomainHelper, $scope, $ionicPopup, StorageService) {
    console.log("scr.auth.controller");
    var vm = this;

    vm.username = "";
    vm.password = "";

    vm.login = login;
    vm.check_status = status;

    /////////////

    function status(){
        console.log("hello");
        console.log(vm.username, vm.password);
    }

    function login() {
    	$http.post(DomainHelper.domainUrl + '/api/login', {
    		'username': vm.username,
            'password': vm.password
    		}).success(function(data){
                console.log(data + "line27");
                if(data === 'null')
                {
                    console.log(data);
                    $ionicPopup.alert({
                     title: 'Authenticate Problem',
                     template: 'Invalid Username or password, please try again.',
                     okType: 'button-positive'
                });
                }
                else
                {
                    StorageService.setObject('userdetails', data);
                    $state.go('app.main');
                }
    	   })
        
    }
}