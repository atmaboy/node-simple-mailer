'use strict';

module.exports = function(args)
{

    var MailerController = {

        send : function (req, res, next) {
            if((!req.body.recipients || req.body.recipients === null) &&
                (!req.body.subject || req.body.subject === null)&&
                (!req.body.message || req.body.message === null)){
                next({message : "mandatory"},null);
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
                    text: msg
                };

                mailgun.messages().send(data, function (error, body) {
                    if (error) {
                        next({message : "mailgun error",errorData : error}, null)
                    }else{
                        next(null, body)
                    }
                });
            }
        },

        view : function (req,res, next) {
            next(null, {mesasage : "bisa view nih"})
        }
    }

    return MailerController;
}