/*----------------------------------------------*\
    GULP TASK: CLEAN STATIC
    Remove everything from the static assets
    folder
\*----------------------------------------------*/

var del = require('del');

module.exports = function (gulp, plugins, paths, buildType) {

    if(buildType === 'static') {
        var toDelete = paths.dist.static.root + '/assets';
    }
    else {
        var toDelete = paths.dist.website.assets_root;
    }

    return function (callback) {
        return del(toDelete, {force: true});

        callback();
    };
};
