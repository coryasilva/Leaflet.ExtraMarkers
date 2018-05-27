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
        '<%= project.paths.js_dist %>/<%= pkg.name %>.js.min.js': ['<%= project.paths.js_dist %>/<%= pkg.name %>.js']
      }
    },
    build: {
      files: {
        '<%= project.paths.js_dist %>/<%= pkg.name %>.min.js': ['<%= project.paths.js_dist %>/<%= pkg.name %>.js']
      }
    },
};