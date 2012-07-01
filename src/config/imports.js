require.config({
    paths: {
        nowjs: 'nowjs/now',
        client: 'client',
        underscore: 'underscore',
        backbone: 'backbone'
    },
    shim: {
        nowjs: {
            exports: 'now'
        },
        underscore:{
            exports: '_'
        },
        backbone: {
            deps: ['underscore', 'nowjs'],
            exports: 'backbone'
        },
        client: {
            deps: ['nowjs', 'backbone']
        }
    }
});

require(['nowjs', 'client'], function (now) {

    });