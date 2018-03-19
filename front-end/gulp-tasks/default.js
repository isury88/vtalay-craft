/*------------------------------------*\
    GULP TASK: DEFAULT
\*------------------------------------*/

module.exports = function (gulp, plugins, paths, buildType) {
    return function () {
        gulp.start('serve');
    }
}
