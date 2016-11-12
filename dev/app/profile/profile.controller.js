angular
    .module('vowolita.profile.controller', [])
    .controller('ProfileCtrl', ctrl);

function ctrl(DomainHelper, $http, $scope, StorageService) 
{
	console.log('profile.controller');
    var vm = this;
    vm.userdetails = StorageService.getObject('userdetails');
    console.log(vm.userdetails);
}