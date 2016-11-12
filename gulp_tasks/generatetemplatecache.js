module.exports = function (gulp,plugins,options,standardHandler,dirPath,param){
	return function(){
		gulp.src(param.source)
		.pipe(plugins.minifyHtml({quotes: true}))
		.pipe(plugins.angularTemplatecache({ module:param.modulename, standalone:true}).on('error', standardHandler))
		.pipe(gulp.dest(param.output));
	}
}