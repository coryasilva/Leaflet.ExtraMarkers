module.exports = function(grunt) {

  'use strict';

  // require it at the top and pass in the grunt instance
  require('time-grunt')(grunt);

  /*****************************************************
    Grunt Init Config:
    load each task config into grunt via require
  *****************************************************/
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    // Project Config
    project: require('./build/grunt-config/project'), // Contains paths and banner
    less: require('./build/grunt-config/less'), // Config to compile and autoprefix less files
    uglify: require('./build/grunt-config/uglify'),
    jshint: require('./build/grunt-config/jshint'), // Lint Javascript

  });

  /*****************************************************
    Dev Tasks - Compile and check files withing the /src/assets/ directory
  *****************************************************/

  // Default grunt task compiles & checks dev files
  grunt.registerTask('default', [], function(){
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.task.run('less:dev','js-dev');
  });

  // Javascript Dev Build - Checks for Errors in Javascript
  grunt.registerTask('js-dev', [], function(){
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.task.run('jshint:all', 'uglify:dev');
  });

  /*****************************************************
    Dist Tasks
  *****************************************************/

  // 'grunt build' global build command for both less and js files
  grunt.registerTask('build', 'Compiles all files for live environment', function() {
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.task.run('less:build', 'js-build');
  });

  // 'grunt js-build' compiles only javascript
  grunt.registerTask('js-build', [], function(){
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.task.run('jshint:all', 'uglify:build');
  });


  // 'grunt less-build' compiles only less
  grunt.registerTask('less-build', [], function(){
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.task.run('less:build');
  });

};