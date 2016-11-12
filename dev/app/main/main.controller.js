angular
    .module('vowolita.main.controller', [])
    .controller('MainCtrl', ctrl);

function ctrl(DomainHelper, $http, $scope, $ionicPopup) {
    console.log('scr.main.controller');
    var vm = this;

    vm.image = "";
    vm.desc = 'Some content...';

    ////////////////////////

    vm.unlock = unlock;
    vm.lock = lock;

    function lock(){
        console.log("Lock");
    }

    function unlock(){

        var show = $ionicPopup.show({
                     title: 'Select Unlocking Type',
                     subTitle: 'Please use normal things',
                     buttons: [
                                { 
                                    text: '<b>Finger-print</b>',
                                    type: 'button-positive',
                                    onTap: function(e) {
                                      console.log('Finger-print');
                                      return "finger";
                                    }
                                },
                                { 
                                    text: '<b>Pin number</b>',
                                    type: 'button-positive',
                                    onTap: function(e) {
                                      console.log('PIN number');
                                      return "number";
                                    }
                                }
                              ]
                });

        show.then(function(decision){
            console.log(decision);
        });

    }

     $scope.$on('$ionicView.afterEnter', function(){
      $http.post(DomainHelper.domainUrl + '/api/ekey')
    	.success(function(data){
    	console.log(data);
    	vm.key = data;
    });
});
 }
    