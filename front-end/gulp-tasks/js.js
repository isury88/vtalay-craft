/*------------------------------------*\
    GULP TASK: JS
\*------------------------------------*/

module.exports = function (gulp, plugins, paths, buildType) {
    var sources = [
        paths.src.js + '/_helpers.js',
        paths.src.js + '/modules/*.js',
        paths.src.js + '/app.js'
    ];

    if(buildType === 'static') {
        var dest = paths.dist.static.js;
    }
    else {
        var dest = paths.dist.website.js;
    }

    return function () {
        // Process libs first
        gulp.start('js-libs');

        return gulp.src(sources)
                   .pipe(plugins.plumber())
                   .pipe(plugins.concat('app.js'))
                   .pipe(plugins.if(buildType === 'production', plugins.uglify()))
                   .pipe(gulp.dest(dest));
    };
};
