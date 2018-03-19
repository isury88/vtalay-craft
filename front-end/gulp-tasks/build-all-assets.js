/*------------------------------------*\
    GULP TASK: BUILD ALL ASSETS
\*------------------------------------*/

module.exports = function (gulp, plugins, paths, buildType) {
    var runSequence = require('run-sequence').use(gulp);

    return function (callback) {

        runSequence('clean', function() {
            gulp.start('svg');
            gulp.start('sass');
            gulp.start('js');
            gulp.start('images');

            if(buildType === 'static') {
                gulp.start('templates');
            }
        });

        callback();
    }
}
