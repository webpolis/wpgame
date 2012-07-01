var util = require('util');
var http = require('http');
var url = require('url');
var fs = require('fs');
var helper_url = require('./helpers/url');
var mime = require('./helpers/mime');
var config = require('./config/server');
var zlib = require('zlib');

var server = http.createServer(
    function(req,ret){
        var params = url.parse(req.url, true);
        var reqfile = __dirname + '/public/' + params.pathname;
        
        // custom url rules
        if(params.pathname.match(/^\/?require\.js$/gi)){
            reqfile = __dirname+'/../lib/requirejs/require.js';
        }else if(params.pathname.match(/^\/?backbone\.js$/gi)){
            reqfile = __dirname+'/../lib/backbone/backbone-min.js';
        }else if(params.pathname.match(/^\/?underscore\.js$/gi)){
            reqfile = __dirname+'/../lib/underscore/underscore-min.js';
        }else if(params.pathname.match(/^\/?init\.js$/gi)){
            reqfile = __dirname+'/config/imports.js';
        }else if(params.pathname.match(/^\/?client\.js$/gi)){
            reqfile = __dirname+'/client.js';
        }else if(params.pathname.match(/^.*\.html?$/gi)){
            reqfile = __dirname + '/'+config.PATH_VIEWS + params.pathname;
        }
        
        fs.readFile(reqfile,function(err,data){
            if(err){
                ret.writeHead(400);
                ret.end();
                return;
            }
            
            var acceptEncoding = req.headers['accept-encoding'];
            var raw = fs.createReadStream(reqfile);

            if (!acceptEncoding) {
                acceptEncoding = '';
            }
            
            if (acceptEncoding.match(/\bdeflate\b/)) {
                ret.writeHead(200, {
                    'Content-Encoding': 'deflate',
                    'Content-Type': mime.lookup(reqfile)
                });
                raw.pipe(zlib.createDeflate()).pipe(ret);
            } else if (acceptEncoding.match(/\bgzip\b/)) {
                ret.writeHead(200, {
                    'Content-Encoding': 'gzip',
                    'Content-Type': mime.lookup(reqfile)
                });
                raw.pipe(zlib.createGzip()).pipe(ret);
            } else {
                ret.writeHead(200,  {
                    'Content-Type': mime.lookup(reqfile)
                });
                raw.pipe(ret);
            }
        });
        
    }
    );

server.listen(7777);

var everyone = require('./modules/now').initialize(server);

everyone.now.config = {
    APPLICATION_NAME : config.APPLICATION_NAME
}
