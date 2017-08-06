'use strict';

module.exports = [

    {
        method : "post",
        endpoint : "mailer/send",
        controller : "MailController",
        funcs : "send"
    },
    {
        method : "get",
        endpoint : "mailer/view",
        controller : "MailController",
        funcs : "view"
    }

]