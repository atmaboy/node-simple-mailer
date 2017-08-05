var express         = require('express');
var bodyParser 		= require('body-parser');

var args            = {};
args.CONFIGOBJ  = require('./config/config.json')

args.MODULES    = {
    EXPRESS_APP      : express(),
    ASYNC            : require('async'),
    REDIS            : require('redis'),
    FS               : require('fs'),
    PATH             : require('path'),
    CHALK 		     : require('chalk'),
    FIGLET           : require('figlet'),
    BOXEN		     : require('boxen'),
    MAILGUN          : require('mailgun-js')
}

args.CONSOLE 		= {
    ERROR       : args.MODULES.CHALK.white.bgRed.bold,
    INFO        : args.MODULES.CHALK.white.bgGreen.bold,
    WARNING     : args.MODULES.CHALK.white.bgYellow.bold
};

args.LOGGER			= {
    error : function(obj) {
        console.log(args.CONSOLE.ERROR(obj));
    },

    info : function(obj) {
        console.log(args.CONSOLE.INFO(obj));
    },

    warning : function(obj) {
        console.log(args.CONSOLE.WARNING(obj));
    }
};
var port        = args.CONFIGOBJ.app_port;
var loadRouter  = require('./router')(args);
args.MODULES.EXPRESS_APP.use(bodyParser.json());
args.MODULES.EXPRESS_APP.use(bodyParser.urlencoded({
    extended: true
}));

args.MODULES.FIGLET.text('MAIL SENDER', {
    font: 'Slant',
    horizontalLayout: 'default',
    verticalLayout: 'default'
}, function(err, data) {
    if (err) {
        console.dir(err);
        return;
    }
    console.log(data);
    console.log("© 2017 Atmaji Haryo Wiryawan, Hooq Challenges Apps");
    console.log("\n");
    loadRouter
    args.MODULES.EXPRESS_APP.listen(port, function() {
        console.log(args.MODULES.BOXEN("Application Running on port : "+port, {padding: 1}));
        exports.args = args;
    })
})