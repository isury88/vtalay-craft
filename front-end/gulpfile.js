/*----------------------------------------------*\
    LOAD PLUGINS
\*----------------------------------------------*/
var gulp = require('gulp'),
    plugins = require('gulp-load-plugins')();

/*----------------------------------------------*\
    ARE WE IN PRODUCTION?
\*----------------------------------------------*/
var buildType = process.env.NODE_ENV;

/*----------------------------------------------*\
    DEFINE PATHS
\*----------------------------------------------*/
var paths = {
    src: {
        scss: "scss",
        js: "js",
        images: "images",
        svg: "svg",
        templates: "templates",
        data: "data.json"
    },
    dist: {
        static: {
            root: ".public",
            css: ".public/assets/css",
            js: ".public/assets/js",
            images: ".public/assets/images",
            svg: ".public/assets/images/icons"
        },
        website: {
            assets_root: "../httpdocs/assets",
            css: "../httpdocs/assets/css",
            js: "../httpdocs/assets/js",
            images: "../httpdocs/assets/images",
            svg: "../httpdocs/assets/images/icons"
        }
    }
};

/*----------------------------------------------*\
    LOAD TASKS
\*----------------------------------------------*/
function getTask(task) {
    return require('./gulp-tasks/' + task)(gulp, plugins, paths, buildType);
}

// Tasks
gulp.task('clean', getTask('clean'));

gulp.task('sass', getTask('sass'));
gulp.task('js', getTask('js'));
gulp.task('js-libs', getTask('js-libs'));
gulp.task('templates', getTask('templates'));
gulp.task('images', getTask('images'));
gulp.task('svg', getTask('svg'));

gulp.task('webserver', getTask('webserver'));
gulp.task('livereload', getTask('live-reload'));

gulp.task('build-all-assets', getTask('build-all-assets'));

gulp.task('watch', getTask('watch'));
gulp.task('build', getTask('build'));

gulp.task('default', getTask('default'));
