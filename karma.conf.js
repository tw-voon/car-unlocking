// Karma configuration
// Generated on Tue Dec 30 2014 12:04:30 GMT+0800 (Malay Peninsula Standard Time)

var devfolder = "dev";

var preprocessors = {};
preprocessors[devfolder +'/**/*.html'] = ['ng-html2js'];

module.exports = function(config) {
    
  config.set({
    // plugins : [
    //   'karma-htmlfile-reporter'
    // ],

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '',


    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['jasmine', 'sinon'],


    // list of files / patterns to load in the browser
    files: [
      'lib/angular/angular.js',
      // 'lib/angular-animate/angular-animate.js',
      'lib/angular-mocks/angular-mocks.js',
      'lib/angular-sanitize/angular-sanitize.min.js',
      'lib/angular-ui-router/release/angular-ui-router.min.js',
      'lib/jquery/dist/jquery.min.js',
      'lib/ionic/js/ionic.js',
      'lib/ionic/js/ionic-angular.min.js',
      'server/js/templates.js',
      devfolder+'/**/*.test.js',
      devfolder+'/**/*.html'
      //devfolder+'/public/app/**/bootstrap.js'
      // 'js/*.js'
    ],

     // 'server/js/teaspoon.min.js',

    // list of files to exclude
    exclude: [
    ],

    proxies: {
    },

    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: preprocessors,
    
    ngHtml2JsPreprocessor: {
        // strip this from the file path 
        stripPrefix: devfolder
    },

    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['progress'],

    // htmlReporter: {
    //   outputFile: 'tests/units.html',
    // },

    // web server port
    port: 9876,


    // enable / disable colors in the output (reporters and logs)
    colors: true,


    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,


    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ['Chrome'],


    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: false
  });
};