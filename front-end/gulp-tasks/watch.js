/*------------------------------------*\
    GULP TASK: WATCH
\*------------------------------------*/

module.exports = function (gulp, plugins, paths, buildType) {
    var runSequence = require('run-sequence').use(gulp);

    return function () {

        runSequence('build-all-assets', function() {

            // Watch for changes with SVG
            plugins.watch(paths.src.svg + '/*.svg', function() {
                gulp.start('svg');
            });

            // Watch for JS changes
            plugins.watch(paths.src.js + '/**/*.js', function() {
                gulp.start('js');
            });

            // Watch for SCSS changes
            plugins.watch(paths.src.scss + '/**/*.scss', function() {
                gulp.start('sass');
            });

            // Watch for template changes
            plugins.watch(paths.src.templates + '/**/*.html', function() {
                gulp.start('templates');
            });

            // Watch for image changes
            plugins.watch(paths.src.images + '/**/*', function() {
                gulp.start('images');
            });

            if(buildType === 'static') {
                // Watch for changes in the static dist folder
                plugins.watch(paths.dist.static.root + '/**', function() {
                    gulp.start('livereload');
                });

                // Watch for changes to the data file
                plugins.watch(paths.src.data, function() {
                    gulp.start('templates');
                });

                // Run the webserver
                gulp.start('webserver');
            }

        });

    }
}
