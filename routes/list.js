'use strict';

module.exports = [

    {
        /**
         * @api {post} /mailer/send Request To Send an Email
         * @apiName SendMail
         * @apiGroup Mailer
         *
         * @apiParam {String} recipients string for recipients to send and email to
         * @apiParam {String} subject subject is mandatory to send an email body
         * @apiParam {String} message contains of message body do you want to send
         *
         * @apiSuccess {String} api_message Message from API server
         * @apiSuccess {String} data Contains data return from API, it can be object or string
         *
         * @apiSuccessExample Success-Response:
         *     HTTP/1.1 200 OK
         *     {
         *      "api_message": "request success",
         *      "data": {
         *          "id": "<20170807021426.125674.A006ABF78F16CF1A@mail.atmaji.id>",
         *          "message": "Queued. Thank you."
         *      }
         *      }
         *
         * @apiErrorExample Error-Response:
         *     HTTP/1.1 201 Error
         *     {
         *      "api_message": "request failed",
         *      "data": {
         *      "message": "recipients, subject and message body are mandatory and cannot be empty"
         *      }
         *     }
         */

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