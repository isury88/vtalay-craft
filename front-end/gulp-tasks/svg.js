/*----------------------------------------------*\
    GULP TASK: SVG
\*----------------------------------------------*/

module.exports = function (gulp, plugins, paths, buildType) {

    if(buildType === 'static') {
        var dest = paths.dist.static.svg;
    }
    else {
        var dest = paths.dist.website.svg;
    }

    return function () {
        return gulp.src(paths.src.svg + '/*.svg')
                   .pipe(plugins.svgmin())
                   .pipe(plugins.svgSymbols({
                       templates: ['default-svg']
                   }))
                   .pipe(gulp.dest(dest));
    };
};
