// Karma configuration
// Generated on Fri Apr 28 2017 21:08:56 GMT+0200 (Central Europe Daylight Time)

module.exports = function(config) {
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '',


    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['jasmine'],


    // list of files / patterns to load in the browser
    files: [
        "Scripts/jquery-3.1.1.js",
        "Scripts/angular/angular.js",
        "Scripts/angular-mocks.js",
        "Scripts/angular-route.js",
        "Scripts/angular-resource.min.js",
        "Scripts/angular-animate/angular-animate.js",
        "Scripts/angular-aria/angular-aria.js",
        "Scripts/angular-messages.js",
        "Scripts/angular-material/angular-material.js",
        "Scripts/angular-indexed-db.js",
        "app/app.module.js",
        "app/app.config.js",
        "app/register/registerService.js",
        "app/register/registry-form.module.js",
        "app/register/registry-form.component.js",
        "spec/*.js"
    ],


    // list of files to exclude
    exclude: [
    ],


    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
    },


    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['progress'],


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
    singleRun: false,

    // Concurrency level
    // how many browser should be started simultaneous
    concurrency: Infinity
  })
}
