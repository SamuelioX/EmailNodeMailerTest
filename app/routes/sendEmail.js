/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
var express = require('express');
const nodemailer = require('nodemailer');
var router = express.Router();

router.post('/', function (req, res) {
//    var userId = req.query.userId;
    var email = {
        receivers: req.body.receivers,
        subject: req.body.subject,
        body: req.body.body
    }
    console.log(email);
    sendEmail(email, function (data) {
        res.setHeader('Content-Type', 'application/json');
        res.json(data);
    });
});

function sendEmail(email, callback) {
    // Connect to the database
//    db.connect(db.MODE_DEVELOPMENT);
    // # get user data
//    console.log(email);
    var receivers = email.receivers;
    var emailSubject = email.subject;
    var emailBody = email.body;
    console.log(receivers);
// create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true, // secure:true for port 465, secure:false for port 587
        auth: {
            user: process.env.TESTEMAIL,
            pass: process.env.TESTEMAILPASS
        }
    });
    //mail options can be set here when needed to be notified
    var emailReceivers = '';
    //go until the second to last array 
    
    for (var i = 0; i < receivers.length - 1; i++) {
        emailReceivers += '' + receivers[i] + ', ';
    }
    emailReceivers += '' + receivers[receivers.length - 1];
    console.log(emailReceivers + ' list of receivers');
    let mailOptions = {
        from: '"Fred Foo 👻" <foo@blurdybloop.com>', // sender address
        to: emailReceivers, // list of receivers
        subject: emailSubject, // Subject line
        text: emailBody, // plain text body
        html: textToHTML(emailBody) // html body
    };

    // send mail with defined transport object
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
        console.log('Message %s sent: %s', info.messageId, info.response);
    });
    callback({"success": true});
}

function textToHTML(text) {
    // 1: Plain Text Search
    text = text.replace(/&/g, "&amp;").
            replace(/</g, "&lt;").
            replace(/>/g, "&gt;");

    // 2: Line Breaks
    text = text.replace(/\r\n?|\n/g, "<br>");

    // 3: Paragraphs
    text = text.replace(/<br>\s*<br>/g, "</p><p>");

    // 4: Wrap in Paragraph Tags
    text = "<p>" + text + "</p>";
    return text;
}
module.exports = router;
