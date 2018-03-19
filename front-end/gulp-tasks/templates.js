/*----------------------------------------------*\
    GULP TASK: TEMPLATES
\*----------------------------------------------*/
module.exports = function (gulp, plugins, paths, buildType) {
    var fs = require('fs'),
        contents = fs.readFileSync(paths.src.data);

    return function () {
        gulp.src(paths.src.templates + '/*.html')
            .pipe(plugins.data(function(file) {
                return JSON.parse(contents);
            }))
            .pipe(plugins.nunjucksRender({
                path: paths.src.templates
            }))
            .pipe(plugins.prettify({indent_size: 4}))
            .pipe(gulp.dest(paths.dist.static.root));
    };
};
