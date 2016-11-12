angular
    .module('vowolita.ekey.controller', [])
    .controller('ekeyCtrl', ctrl);

function ctrl($state, $timeout, $scope, $ionicModal, $cordovaDatePicker, $http, DomainHelper, StorageService, $ionicLoading, $filter, $ionicPopup){

	var vm = this;

	$scope.numberOfKey = [];
	$scope.dateValue = new Date();
    $scope.timeValue = new Date();
    $scope.datetimeValue = new Date();

    vm.temp = {};
    vm.eKey = [];
    vm.maxKey = 2;
    vm.registered = [];
    vm.params = {
                  "request": true,
                  "statusReceiver": false,
                  "restoreKey" : "bluetoothleplugin"
                }

	vm.setup = setup;
	vm.remove = remove;
	vm.openPopover = open;
	vm.hideModal = hide;
	vm.showDate = showDate;
    vm.showTime = showTime;
    vm.generate = generate;

	var date_options = {
    date: Date(),
    mode: 'date', // or 'time'
    minDate: Date() - 10000,
    allowOldDates: true,
    allowFutureDates: false,
    doneButtonLabel: 'DONE',
    doneButtonColor: '#F2F3F4',
    cancelButtonLabel: 'CANCEL',
    cancelButtonColor: '#000000'
  	};

  	var time_options = {
    date: Date(),
    mode: 'time', // or 'time'
    minDate: Date() - 10000,
    allowOldDates: true,
    allowFutureDates: false,
    doneButtonLabel: 'DONE',
    doneButtonColor: '#F2F3F4',
    cancelButtonLabel: 'CANCEL',
    cancelButtonColor: '#000000'
  	};

    bluetoothle.initialize(vm.initializeResult, vm.params);
    $timeout(function() {console.log(vm.params);}, 10000);
    vm.userdetails = StorageService.getObject('userdetails');

	function setup(){
		console.log('generate');
        if(vm.maxKey === 0)
            alert("Maximum key reached");
        else{  
		  open();
        }
		//$scope.numberOfKey.push($scope.numberOfKey.length);
		//console.log($scope.numberOfKey.length);
	}

    function generate(){
        console.log(vm.temp);
        $ionicLoading.show();

        vm.temp.fromdate = $filter('date')(vm.temp.from_date, "yyyy-MM-dd");
        vm.temp.fromtime = $filter('date')(vm.temp.from_time, "HH:mm:ss");
        vm.temp.todate = $filter('date')(vm.temp.to_date, "yyyy-MM-dd");
        vm.temp.totime = $filter('date')(vm.temp.to_time, "HH:mm:ss");

        console.log("date:" + vm.temp.from_date + " " + "time:" + vm.temp.from_time);

        $http.post(DomainHelper.domainUrl + '/api/ekey', {details: vm.temp, id: vm.userdetails.id})
        .success(function(data){
            console.log(data);

            if(angular.isString(data)){
                $ionicLoading.hide();
                $scope.modal.hide();
                var show = $ionicPopup.confirm({
                                title: 'Please check your input data',
                                subTitle: data
                           });
            }
            else{
                $scope.numberOfKey.push({'key_1': data.key});
                vm.registered.push(data);
                console.log($scope.numberOfKey);
                vm.eKey[vm.eKey.length] = data;
                vm.maxKey = vm.maxKey - 1;
                console.log("key: " + vm.maxKey);
                $ionicLoading.hide();
                $scope.modal.hide();
            }
               
        }).error(function(data){
            console.log(data);
            $ionicLoading.hide();
            $scope.modal.hide();
            var show = $ionicPopup.confirm({
                                title: 'Something went wrong',
                                subTitle: "Please retry again or contact us"
                           });
        });
        
    }

	function remove(index){
        console.log($scope.numberOfKey);
		console.log(index);        
		$scope.numberOfKey.splice(index, 1);
        vm.maxKey = vm.maxKey + 1;
        console.log($scope.numberOfKey);
	}

	function open(){
		$scope.modal.show();
	}

	function hide(){
		$scope.modal.hide();
	}

	function showDate(){
        console.log("show");
		window.datePicker.show(date_options, function(date) {
                        console.log("date result " + date);
                    });
	}

    function showTime(){
        window.datePicker.show(time_options);
    }

	$ionicModal.fromTemplateUrl('e-key/register-e-key.html', {
    	scope: $scope,
    	animation: 'slide-in-up'
  	}).then(function(modal) {
    	$scope.modal = modal;
 	});

  	 
	
}