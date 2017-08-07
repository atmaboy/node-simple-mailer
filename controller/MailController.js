'use strict';

module.exports = function(args)
{
    var MailerController = {

        send : function (req, res, next) {
            var self = this;

            if(!req.body.recipients || !req.body.subject || !req.body.message){
                next({message : "recipients, subject and message body are mandatory and cannot be empty"},null);
            }else {

                let recipients = req.body.recipients;
                let subject = req.body.subject;
                let msg = req.body.message;


                var mailgun = args.MODULES.MAILGUN({
                    apiKey: args.CONFIGOBJ.mailgun.api_key,
                    domain: args.CONFIGOBJ.mailgun.domain
                });

                var data = {
                    from: 'Atmaji <me@mail.atmaji.id>',
                    to: recipients,
                    subject: subject,
                    text: msg + "\n" + "api.atmaji.id | sent using mailgun service"
                };

                mailgun.messages().send(data, function (error, body) {
                    if (error) {
                        if(error.statusCode === 400){
                            args.LOGGER.warning(error);
                            self.sendMandrill(req, res, next)
                        }else{
                            next({message : "mailgun error",errorData : error}, null)
                        }
                    }else{
                        next(null, body)
                    }
                });
            }
        },

        view : function (req,res, next) {
            next(null, {mesasage : "bisa view nih"})
        },

        sendMandrill : function (req,res, next) {
            var mandrill = new args.MODULES.MANDRILL.Mandrill('ZuAeJ0vFFLaJklA1kNX3pA');
            var message = {
                subject     : req.body.subject,
                text        : req.body.message,
                from_email  : "me@atmaji.id",
                from_name   : "Atmaji Wiryawan",
                to: [{
                    email   : req.body.recipients,
                    type    : "to"
                }]
            }

            mandrill.messages.send({"message" : message, async   : false,ip_pool : "Main Pool",send_at : args.CONFIGOBJ.date},
                function (result) {
                    next(null, {mesasage : "mailgun service down error / user not in whitelist, using mandrill service", result : result})
                },
                function (e) {
                    args.LOGGER.warning(e);
                    next(null, {mesasage : "mailgun service down error user not in whitelist, using mandrill service", errorData : e})
            });
        }
    }

    return MailerController;
}