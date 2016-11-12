module.exports = function (gulp,plugins,options,standardHandler,dirPath,param){
	return function(){
		gulp.src(param.source)
		    .pipe(plugins.jshint())
		    .pipe(plugins.jshint.reporter('jshint-stylish'));
	}
}