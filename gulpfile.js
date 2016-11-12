var gulp = require('gulp');
var plugins = require('gulp-load-plugins')({
    pattern: ['gulp-*', 'gulp.*', 'browser-sync','merge2','minimist','run-sequence']
});
var fs = require('fs');
var library_source = require('./library.json');

var dirPath = {
  'publicfolder': 'server',
  'lib':'lib',
  'app':'dev/app',
  'load':'dev/load'
}

var stream2 = [
                dirPath.app+'/**/*.js',
                '!'+dirPath.app+'/**/*.module.js',
                '!'+dirPath.app+'/**/*.min.js',
                '!'+dirPath.app+'/**/*.test.js'
              ];

var stream1 = [];

for(var i=0; i<library_source.length; i++){
  stream1.push(library_source[i]);
}

var stream2 = stream1.concat(stream2);

var knownOptions = {
  // string: 'env',
  // default: { env: process.env.NODE_ENV || 'production' }
  default: {
    "showbrowser":"n",
    "output":"1",
    "jshint":"n"
  }
};

var options = plugins.minimist(process.argv.slice(2), knownOptions);

var standardHandler = function(err){
  // Log to console
  var error = err.message+ " (line number:"+err.lineNumber+")";
  plugins.browserSync.notify(error, 12000);
  plugins.util.log(plugins.util.colors.red('Error'), error);
}

plugins.path = require('path');

function getTask(task,param){
    return require('./gulp_tasks/'+task)(gulp,plugins,options,standardHandler,dirPath,param);
}

//===================================

//setup browser-sync
gulp.task('browser-sync', getTask('browser-sync'));

gulp.task('bs-reload', function () {
  plugins.browserSync.reload();
});

//===================================

gulp.task('jshint:app', getTask('jshint',{'source':dirPath.app+'/**/*.js'}));

gulp.task('jshint:load', getTask('jshint',{'source':dirPath.load+'/**/*.js'}));

//===================================

gulp.task('generatetemplatecache',
  getTask('generatetemplatecache',
    {'source':[dirPath.app+'/**/*.html'],
    'output':dirPath.app,
    'modulename':'vowolita.templates'})
);

gulp.task('generateloadtemplatecache',
  getTask('generatetemplatecache',
    {'source':[dirPath.load+'/**/*.html'],
    'output':dirPath.load,
    'modulename':'app.templates'})
);
//===================================

gulp.task('compressjs:app',
  getTask('compressjs', {
    'source': {
      'stream1': [dirPath.app+'/**/*.module.js'],
      'stream2': stream2
    },
    'output':{
      'dest':dirPath.publicfolder+'/js',
      'debug':'vowolita-debug.min.js',
      'production':'vowolita.min.js'
    }
  })
);

gulp.task('compressjs:load',
  getTask('compressjs', {
    'source': {
      'stream1': [dirPath.load+'/**/*.module.js'],
      'stream2': [
        dirPath.load+'/**/*.js',
            '!'+dirPath.load+'/**/*.module.js',
            '!'+dirPath.load+'/**/*.min.js',
            '!'+dirPath.load+'/**/*.test.js'
        ]
    },
    'output':{
      'dest':'www',
      'debug':'load-debug.min.js',
      'production':'load.min.js'
    }
  })
);


//===================================

gulp.task('sass:vowolita', function(done) {
  gulp.src('dev/scss/vowolita.scss')
    .pipe(plugins.sass({
      errLogToConsole: true
    }))
    // .pipe(gulp.dest('./www/css/'))
    .pipe(plugins.minifyCss({
      keepSpecialComments: 0
    }))
    .pipe(plugins.rename({ extname: '.min.css' }))
    .pipe(gulp.dest(dirPath.publicfolder+'/css/'))
    .on('end', done);
});

gulp.task('sass:ionic', function(done) {
  gulp.src('./scss/ionic.app.scss')
    .pipe(plugins.sass({
      errLogToConsole: true
    }))
    // .pipe(gulp.dest('./www/css/'))
    .pipe(plugins.minifyCss({
      keepSpecialComments: 0
    }))
    .pipe(plugins.rename({ extname: '.min.css' }))
    .pipe(gulp.dest('./www/css/'))
    .on('end', done);
});

//===================================

gulp.task('duplicateIndex', function () {
  gulp.src('www/index.html')
    .pipe(gulp.dest('server'));
});

gulp.task('duplicateLib', function () {
  gulp.src('www/lib/**/*.*')
    .pipe(gulp.dest('server/lib'));
});

//===================================
gulp.task('default', ['browser-sync'], function () {
  plugins.runSequence('generatetemplatecache', 'generateloadtemplatecache', 'compressjs:app','compressjs:load', 'sass:ionic','sass:vowolita','duplicateLib','duplicateIndex');

  plugins.watch('dev/app/**/*.html',plugins.batch(function (events, done) {
    plugins.runSequence('generatetemplatecache',done);
  }));

  plugins.watch('dev/load/**/*.html',plugins.batch(function (events, done) {
    plugins.runSequence('generateloadtemplatecache',done);
  }));

  plugins.watch([
      'dev/app/**/*.js',
      '!dev/app/**/*.min.js',
      '!dev/app/**/*.test.js',
      library_source],
      plugins.batch(function (events, done) {
        if(options.jshint.toUpperCase()=="Y"){
          plugins.runSequence('compressjs:app','jshint:app',done);
        }else{
          plugins.runSequence('compressjs:app',done);
        }
  }));

  plugins.watch([
      'dev/load/**/*.js',
      '!dev/load/**/*.min.js',
      '!dev/load/**/*.test.js'],
      plugins.batch(function (events, done) {
        if(options.jshint.toUpperCase()=="Y"){
          plugins.runSequence('compressjs:load','jshint:load',done);
        }else{
          plugins.runSequence('compressjs:load',done);
        }
  }));

  plugins.watch([dirPath.publicfolder+'/css/**/*.css',dirPath.publicfolder+'/js/**/*.js'],function(){
    var d = new Date();
    // var n = d.getTime();
    var file = 'version.txt';
    var outputfile = dirPath.publicfolder+'/version.json';
    var json = JSON.parse(fs.readFileSync(file));
    json.build = d.toString();
    fs.writeFile(outputfile, JSON.stringify(json));
  });

/*  plugins.watch(['www/index.html'],function(){
     plugins.runSequence('duplicateIndex');
  });*/

  // plugins.watch(['www/**/*.*'],function(file){
  gulp.watch('www/**/*.*').on('change', function (file) {
     // plugins.runSequence('duplicateLib');
     // plugins.util.log(plugins.util.colors.red('Error'), file.path);
    //  gulp.src(file.path)
    // .pipe(gulp.dest('server'));

    gulp.src('www/**/*.*')
        .pipe(plugins.changed('server'))
        .pipe(gulp.dest('server'));
  });

  plugins.watch(['dev/scss/**/*.scss','dev/scss/**/*.scss'],plugins.batch(function (events, done) {
    plugins.runSequence('sass:vowolita',done);
  }));

  gulp.watch('./scss/**/*.scss', ['sass:ionic']);
});
