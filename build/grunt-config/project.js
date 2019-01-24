module.exports = {
	paths: {
		less: 'src/assets/less',
		css: 'src/assets/css',
		css_dist: 'dist/css',
		js: 'src/assets/js',
		js_dist: 'dist/js',
	},
	name: 'leaflet.extra-markers',
	banner:
		'/*!\n' +
		' * <%= pkg.name %>\n' +
		' * <%= pkg.description %>\n' +
		' * <%= pkg.title %>\n' +
		' * <%= pkg.url %>\n' +
		' * @author <%= pkg.author %>\n' +
		' * @version <%= pkg.version %>\n' +
		' */\n',
};