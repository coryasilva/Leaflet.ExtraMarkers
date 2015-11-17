module.exports = {
  options: {
    curly: true,
    eqeqeq: true,
    eqnull: true,
    browser: true,
    globals: {
      jQuery: true
    },
  },
  all: [
    'Gruntfile.js',
    '<%= project.paths.js %>/<%= pkg.name %>.js',
  ],
};