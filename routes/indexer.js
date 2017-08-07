'use strict';

module.exports = function (args) {
    var app = args.MODULES.EXPRESS_APP;
    var list = require('./list');
    var controllerPath = '../controller/';

    list.forEach(function (routes) {
        var url             = "/" + routes.endpoint + "/";

        try {
            var controller      = controllerPath + routes.controller;
            var controllerName  = require(controller)(args);
        }catch (e){
            args.LOGGER.error(e);
            args.LOGGER.error("no handler for" + url);
        }

        var controllerFunc  = routes.funcs;

        app[routes.method](url, function(req, res) {
            args.LOGGER.info(args.CONFIGOBJ.date + " || request hit : " + args.CONFIGOBJ.base_url + url);
            controllerName[controllerFunc](req,res, function (err,result) {
                var retBody = {
                    api_message : "",
                    data : ""
                };

                if(err){
                    retBody.api_message = "request failed"
                    retBody.data = err;
                    res.status(201).send(retBody)
                }else{
                    retBody.api_message = "request success"
                    retBody.data = result;
                    res.status(200).send(retBody)
                }
            })
        });
    })
}