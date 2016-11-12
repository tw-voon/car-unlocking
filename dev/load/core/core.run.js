angular
.module('app.core.run', ['ngCordova'])
.run(run);

function run($http, $timeout, appStorageService, $q, $cordovaFile, $cordovaSplashscreen, $cordovaAppVersion, $cordovaDialogs, $window) {
	var load, lang, appVersion, retryCheck = 0, checkinterval = 300000;

	var domain = "http://192.168.112.2/CarLockApps/server";

	document.addEventListener("deviceready", onDeviceReady, false);

	function onDeviceReady() {
		console.log("ready");
		load = appStorageService.getObject("load");
		console.log(load);

		if(lang === undefined){
			lang = 'en';
		}

		$cordovaAppVersion.getVersionNumber().then(function (version) {
			appVersion = version;
			console.log("App Version:"+appVersion);
			checkversion();
			appStorageService.set("appVersion",appVersion);
		});
	}

	function checkversion(){
		$http.get(domain+"/version.json?r="+Math.random(),{timeout: 5000}).success(function(data){
			console.log("checkversion");
			if(load.build!=data.build){
				var appV = appVersion.split(".");
				var dataV = data.version.split(".");
				if(appV[0]>dataV[0]){
					runupdate(data);
				}else if(appV[0]==dataV[0] && appV[1]>dataV[1] ){
					runupdate(data);
				}else if(appV[0]==dataV[0] && appV[1]==dataV[1] && appV[2]>=dataV[2] ){
					runupdate(data);
				}else{
					// Newer app version needed!!!
					if(ionic.Platform.isIOS()){
						$cordovaDialogs.alert('You need to update your app in order to continue using.', 'Alert', 'Upgrade')
						.then(function() {
							cordova.plugins.market.open('net.lucky8888.app');
						});
					}else{
						$cordovaDialogs.confirm('You need to update your app in order to continue using.', 'Alert', ['Exit','Upgrade'])
						.then(function(buttonIndex) {
							// no button = 0, 'OK' = 1, 'Cancel' = 2
							// btnIndex = buttonIndex;
							console.log(buttonIndex);
							if(buttonIndex==2){
								// upgrade
								// alert("Perform upgrading...");
								cordova.plugins.market.open('net.lucky8888.app');
							}
							navigator.app.exitApp();
						});
					}
				}

			} else {
				$("#updatepage .loading").show();
				init();
			}

		}).error(function(){

			retryCheck = retryCheck+1;
			if(retryCheck<3){
				checkversion();
			}else{

				if(ionic.Platform.isIOS()){
					$cordovaDialogs.alert('Fail to connect to server', 'Error', 'Retry')
					.then(function() {
						retryCheck = 0;
						checkversion();
					});
				}else{
					$cordovaDialogs.confirm('Fail to connect to server', 'Error', ['Exit','Retry'])
					.then(function(buttonIndex) {
						// no button = 0, 'OK' = 1, 'Cancel' = 2
						// btnIndex = buttonIndex;
						console.log(buttonIndex);
						if(buttonIndex==2){
							retryCheck = 0;
							checkversion();
						}else{
							navigator.app.exitApp();
						}
					});
				}
			}

		});
	}

	function intervalcheck(){
		console.log('intervalcheck');
		$http.get(domain+"/version.json?r="+Date.now(), {timeout: 5000}).success(function(data){
			if(load.build!=data.build){
				$('#updatepage').css('background-color','#fff');
				window.location.reload(true);
			}else{
				$timeout(function(){ intervalcheck(); }, checkinterval);
			}
		}).error(function(){
			$timeout(function(){ intervalcheck(); }, checkinterval);
		});
	}

	function runupdate(data){
		$("#updatepage .outer").show(0,'',function(){
			$cordovaSplashscreen.hide();
			update(data);
		});
	}

	function update(data){
		console.log("running update");
		var url = [data.css[0],data.js[0]];
		var css = [];
		var js = [];

		var promises = [];
		var writepromises = [];

		var nativeURL;

		var createDir = $cordovaFile.createDir(cordova.file.dataDirectory,"load",true).then(function(res){
			nativeURL = res.nativeURL;
		});
		promises.push(createDir);

		url.forEach(function(d) {
			promises.push($http.get(d).success(function(data){
				// console.log("fetch success"+d);
				// console.log("File extension:"+d.split('.').pop());
				if(d.split('.').pop() == "css"){
					css.push(data);
				}else{
					js.push(data);
				}
			}));
		});

		$q.all(promises).then(function(results){
			console.log("success........");

			for (var i=0; i<css.length;i++){
				css[i]='<style type="text/css">'+css[i]+'</style>';

				writepromises.push($cordovaFile.writeFile(cordova.file.dataDirectory,"css"+i+".dat",css[i], true));
			}

			for (var i=0; i<js.length;i++){
				writepromises.push($cordovaFile.writeFile(cordova.file.dataDirectory,"js"+i+".dat",js[i], true));
			}

			load = data;
			appStorageService.setObject("load",data);

			$q.all(writepromises).then(function(results){
				init();
			});

			// angular.bootstrap(document, ['ts']);
		},function(results){
			console.log("download update fail, retrying...");
			console.log(results);
			// alert("fail");
			update(data);
		});
	}

	function init(){
		var resultcss = [];
		var resultjs = [];
		var resultimg = [];
		var allPromise = [];

		console.log("running init");

		for (var i=0; i<load.css.length;i++){
			console.log("read css file");
			resultcss.push($cordovaFile.readAsText(cordova.file.dataDirectory,"css"+i+".dat"));
		}

		for (var i=0; i<load.js.length;i++){
			console.log("read js file");
			resultjs.push($cordovaFile.readAsText(cordova.file.dataDirectory,"js"+i+".dat"));
		}

		allPromise.push(resultimg);
		allPromise.push(resultcss);
		allPromise.push(resultjs);

		$q.all(allPromise).then(function(results){
			console.log("all success");

			for (var i=0; i<resultcss.length;i++){

				resultcss[i].then(function(data){
					$("head").append(data);
				});
			}

			for (var i=0; i<resultjs.length;i++){
				resultjs[i].then(function(data){
					eval(data);
				});
			}

			setTimeout(function(){ $cordovaSplashscreen.hide();},1500);

		}, function(results) {
			console.log("fail to read cached files");
			console.log(results);
			// alert("Fail to read all files");
			if(ionic.Platform.isIOS()){
				$cordovaDialogs.alert('Fail to read files', 'Error', 'OK')
				.then(function() {
					// navigator.app.exitApp();
				});
			}else{
				$cordovaDialogs.alert('Fail to read files', 'Error', 'Exit App')
				.then(function() {
					navigator.app.exitApp();
				});
			}
		});

		setTimeout(function(){ $("#updatepage .outer").hide(); intervalcheck(); }, 5000);
	}

}

