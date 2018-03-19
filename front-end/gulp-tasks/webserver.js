/*----------------------------------------------*\
    GULP TASK: WEBSERVER
\*----------------------------------------------*/

module.exports = function (gulp, plugins, paths, buildType) {
    return function () {
        plugins.connect.server({
            root: paths.dist.static.root,
            port: 8003,
            livereload: true
        });
    };
};
