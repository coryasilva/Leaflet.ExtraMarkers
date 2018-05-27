const rollupGitVersion = require('rollup-plugin-git-version');
const json = require('rollup-plugin-json');
const gitRev = require('git-rev-sync');

const pkg = require('../../package.json');
let release;

// Skip the git branch+rev in the banner when doing a release build
if (process.env.NODE_ENV === 'release') {
    release = true;
} else {
    release = false;
    const branch = gitRev.branch();
    const rev = gitRev.short();
    let version;
    version += '+' + branch + '.' + rev;
}

const banner = require("./project").banner;

module.exports = {
    options: {
        format: 'umd',
        moduleName: 'leaflet.extra-markers',
        banner: banner,
        plugins: [
            release ? json() : rollupGitVersion(),
        ],
        sourceMap: true,
        legacy: true // Needed to create files loadable by IE8
    },
    files: {
        'dest': 'dist/js/leaflet.extra-markers.js',
        'src': 'src/assets/js/leaflet.extra-markers.js'
    }
};