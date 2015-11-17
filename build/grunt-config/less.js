// directory based instead of using specific file names
// http://gruntjs.com/configuring-tasks#building-the-files-object-dynamically
module.exports = {
	dev: {
		options: {
			banner: "<%= project.banner %>",
			paths: ["src/assets/css"]
		},
		files: {
			'<%= project.paths.css %>/<%= pkg.name %>.css': '<%= project.paths.less %>/<%= pkg.name %>.less'
		}
	},
	build: {
		options: {
			banner: "<%= project.banner %>",
			paths: ["dist/css"],
			compress: true,
			plugins: [
			new (require('less-plugin-autoprefix'))({browsers: ["last 2 versions"]}),
			],
		},
		files: {
			'<%= project.paths.css_dist %>/<%= pkg.name %>.min.css': '<%= project.paths.less %>/<%= pkg.name %>.less'
		}
	}
};

