/*----------------------------------------------*\
    GULP TASK: IMAGES
\*----------------------------------------------*/

module.exports = function (gulp, plugins, paths, buildType) {

    if(buildType === 'static') {
        var dest = paths.dist.static.images;
    }
    else {
        var dest = paths.dist.website.images;
    }

    return function () {
        return gulp.src([paths.src.images + '/**/*'])
                   .pipe(gulp.dest(dest));
    };
};
