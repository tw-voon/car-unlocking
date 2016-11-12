module.exports = function (gulp,plugins,options,standardHandler,dirPath,param){
	return function(){
	    if(options.showbrowser=="y"){
	    	var showopen = "external"
	    }else{
	    	var showopen = false;
	    }

	    plugins.browserSync({
	    	notify: false,
	    	reloadDelay: 50,
	    	ghostMode: false,
	    	files: [dirPath.publicfolder+"/js/**/*.js",dirPath.publicfolder+"/css/**/*.css"],
	    	browser: "chrome",
	    	open: showopen,
	    	minify: false,
	    	server: {
	    		baseDir: dirPath.publicfolder,
	    		index: "index.html"
	    	}
	    });
	}
};