module.exports = {
  options: {
    curly: true,
    eqeqeq: true,
    eqnull: true,
    browser: true,
    esversion: 6,
    globals: {
      jQuery: true
    },
  },
  all: [
    'Gruntfile.js',
    '<%= project.paths.js %>/<%= project.name %>.js',
  ],
};