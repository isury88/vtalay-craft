/*------------------------------------*\
    GULP TASK: JS LIBS
\*------------------------------------*/

module.exports = function (gulp, plugins, paths, buildType) {
    var sources = [
        'node_modules/jquery/dist/jquery.js',
        'node_modules/popper.js/dist/umd/popper.js',
        'node_modules/bootstrap/dist/js/bootstrap.js',
        paths.src.js + '/libs/*.js'
    ];

    if(buildType === 'static') {
        var dest = paths.dist.static.js;
    }
    else {
        var dest = paths.dist.website.js;
    }

    return function () {
        gulp.src(sources)
            .pipe(plugins.plumber())
            .pipe(plugins.order([
                '**/jquery.js',
                '**/popper.js',
                '**/bootstrap.js',
                '**/*.js'
            ]))
            .pipe(plugins.concat('lib.js'))
            .pipe(plugins.uglify())
            .pipe(gulp.dest(dest));
    };
};
