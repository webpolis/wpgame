require.config({
    paths: {
        nowjs: '/nowjs/now',
        client: 'client',
        underscore: 'underscore-min',
        backbone: 'backbone-min',
        jquery: 'jquery-1.7.2.min'
    },
    shim: {
        nowjs: {
            exports: 'now'
        },
        underscore:{
            exports: '_',
            deps: ['jquery']
        },
        backbone: {
            deps: ['underscore', 'nowjs'],
            exports: 'Backbone'
        },
        client: {
            deps: ['nowjs', 'underscore', 'backbone', 'jquery']
        }
    }
});

require(['nowjs', 'client'], function (now) {

    });