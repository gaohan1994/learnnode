var fs = require('fs');

function addMapping (router, mapping) {
    for (var url in mapping) {
        if (url.startsWith('GET ')) {
            //如果url类似 'GET XX'
            var path = url.substring(4);
            router.get(path, mapping[url]);
            console.log(`register URL mapping: GET ${path}`);
        } else if (url.startsWith('POST ')) {
            var path = url.substring(5);
            router.post(path, mapping[url]);
            console.log(`register URL mapping: POST ${path}`)
        } else {
            console.log('无效的url')
        }
    }
}

function addControllers (router) {
    var files = fs.readdirSync(__dirname + '/controllers');
    var js_file = files.filter((f) => {
        return f.endsWith('.js');
    });

    for (var f of js_file) {
        let mapping = require(__dirname + '/controllers' + f);
        addMapping(router, mapping);
    }
}

module.exports = function (dir) {
    let
        controllers_dir = dir || `controllers`,
        router = require('koa-router')();

    addControllers(router, controllers_dir);
    return router.routes();
}