'use strict';

module.exports = function(args)
{
    args.MODULES.EXPRESS_APP.get('/mailer/send', function (req, res) {
        var mailgun = args.MODULES.MAILGUN({
            apiKey: args.CONFIGOBJ.mailgun.api_key,
            domain: args.CONFIGOBJ.mailgun.domain
        });

        var data = {
            from: 'Atmaji <atmaji@mail.atmaji.id>',
            to: 'atmaji.wiryawan@gmail.com',
            subject: 'Hello',
            text: 'Testing some Mailgun awesomness!'
        };

        mailgun.messages().send(data, function (error, body) {
            if(error){
                res.status(201).send(error)
            }

            res.status(200).send(body)
        });
    });

    args.MODULES.EXPRESS_APP.post('/mailer/store', function (req, res) {
        var incoming = {
            sender      : req.body.sender ? req.body.sender : null,
            recipient   : req.body.recipient ? req.body.recipient : null,
            subject     : req.body.subject ? req.body.subject : null,
            body_plain  : req.body.body-plain ? req.body-plain:null,
            body_w_q    : req.body.stripped-text ? req.body.stripped-text : null
        }

        console.log('incoming message : ', incoming)
    })

    args.MODULES.EXPRESS_APP.post('/test', function (req, res) {
        res.send(req.body.content)
    })
}