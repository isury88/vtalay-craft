/*----------------------------------------------*\
    GULP TASK: LIVE RELOAD
\*----------------------------------------------*/

module.exports = function (gulp, plugins, paths, buildType) {
    return function () {
        gulp.src( paths.dist.static.root + '/**/*' )
            .pipe(plugins.connect.reload());
    };
};
