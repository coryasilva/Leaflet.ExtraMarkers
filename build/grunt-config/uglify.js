module.exports = {
    options: {
      banner: '<%= project.banner %>',
    },
    dev: {
      options: {
        mangle: false, // Stops uglify from mangling variables https://github.com/gruntjs/grunt-contrib-uglify#mangle
        compress: false,
        beautify: true,
      },
      files: {
        '<%= project.paths.js_dist %>/<%= project.name %>.js.min.js': ['<%= project.paths.js_dist %>/<%= project.name %>.js']
      }
    },
    build: {
      files: {
        '<%= project.paths.js_dist %>/<%= project.name %>.min.js': ['<%= project.paths.js_dist %>/<%= project.name %>.js']
      }
    },
};