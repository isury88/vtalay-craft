/*----------------------------------------------*\
    GULP TASK: SASS
\*----------------------------------------------*/
module.exports = function (gulp, plugins, paths, buildType) {
    var fs = require('fs'),
        packageJson = JSON.parse(fs.readFileSync('./package.json'));

    if(buildType === 'static') {
        var dest = paths.dist.static.css;
    }
    else {
        var dest = paths.dist.website.css;
    }

    return function () {
        return gulp.src('scss/**/*.scss')
                   .pipe(plugins.plumber())
                   .pipe(plugins.sourcemaps.init())
                   .pipe(plugins.sass().on('error', plugins.sass.logError))
                   .pipe(plugins.autoprefixer({
                       browsers: packageJson.browserslist,
                       cascade: false
                   }))
                   .pipe(plugins.cleanCss())
                   .pipe(plugins.sourcemaps.write('.'))
                   .pipe(gulp.dest(dest));
    };
};
