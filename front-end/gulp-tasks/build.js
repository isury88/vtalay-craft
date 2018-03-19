/*------------------------------------*\
    GULP TASK: BUILD
\*------------------------------------*/

module.exports = function (gulp, plugins, paths, buildType) {
    var runSequence = require('run-sequence').use(gulp);

    return function () {
        gulp.start('build-all-assets');
    }
}
