module.exports = function (gulp,plugins,options,standardHandler,dirPath,param){
	return function(){
		/*if (!param.output.dest instanceof Array){
			param.output.dest = [param.output.dest];
		}*/

		var stream1 = gulp.src(param.source.stream1)
	    .pipe(plugins.sourcemaps.init());

	    var stream2 = gulp.src(param.source.stream2)
	    .pipe(plugins.sourcemaps.init())
	    // wrap each individual JS file
	    .pipe(plugins.insert.wrap('(function(){"use strict";', '\n})();'))
	    // add required injection for every scripts
	    .pipe(plugins.ngAnnotate().on('error', standardHandler));

	    if(options.output=="1"){
	        compressjsdebug(stream1,stream2,param.output.debug);
	    }else if(options.output=="2"){
	        compressjsproduction(stream1,stream2,param.output.production);
	    }else if(options.output=="3" || options.dist == true){
	        compressjsdebug(stream1,stream2,param.output.debug);
	        compressjsproduction(stream1,stream2,param.output.production);
	    }
	}

	function compressjsdebug(stream1,stream2,output){
		// Output for DEBUG
	    var stream = plugins.merge2(stream1,stream2)
	    // purpose compress here is only to give better error report
	    .pipe(plugins.uglify().on('error', standardHandler))
	    .pipe(plugins.concat(output))
	    // final wrap of whole js file
	    .pipe(plugins.insert.wrap('(function(){"use strict";', '\n})();'))
	    // compress here to get best final compression
	    // .pipe(uglify().on('error', standardHandler))
	    .pipe(plugins.sourcemaps.write('.'))
	    .pipe(gulp.dest(param.output.dest));

	    /*if(param.output.dest.length>1){
	    	multidestination(stream)
	    }*/
	}

	function compressjsproduction(stream1,stream2,output){
		 // Output for Production
	    plugins.merge2(stream1,stream2)
	    .pipe(plugins.concat(output))
	    .pipe(plugins.insert.wrap('(function(){"use strict";', '\n})();'))
	    // compress here to get best final compression
	    .pipe(plugins.uglify({
	        compress: {
	            drop_console: true
	        }
	    }).on('error', standardHandler))
	    .pipe(gulp.dest(param.output.dest));
	}

	/*function multidestination(stream){
		for(i=1;i<param.output.dest.length;i++){
			stream.pipe(gulp.dest(param.output.dest[i]));
		}
	}*/

}
