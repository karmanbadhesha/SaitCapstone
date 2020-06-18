var fs = require("fs");
var nodemailer = require("nodemailer");
var ejs = require("ejs");
var transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
        user: process.env.EMAIL_EMAIL,
        pass: process.env.EMAIL_PASS
    }
});

async function sendEmail(to, name, type, token) {
    var mainOptions = null;

    console.log(`DATA:` + token);
    if (type === "reset") {
        await ejs.renderFile(__dirname + "/templates/reset.ejs", { name: name, token: token }, function (err, data) {
            if (err) {
                console.log(err);
            } else {
                mainOptions = {
                    from: "Karman <no-reply@SAITCapstone.com>",
                    to: to,
                    subject: `SAIT Capstone Password Reset`,
                    html: data
                };
            }
        });
    } else if (type === "register") {
        await ejs.renderFile(__dirname + "/templates/register.ejs", { name: name, token: token }, function (err, data) {
            if (err) {
                console.log(err);
            } else {
                mainOptions = {
                    from: "Karman <no-reply@SAITCapstone.com>",
                    to: to,
                    subject: `SAIT Capstone Password Reset`,
                    html: data
                };
                // console.log("html data ======================>", mainOptions.html);
            }
        });
    }
    transporter.sendMail(mainOptions, function (err, info) {
        if (err) {
            console.log(err);
        } else {
            console.log('Message sent: ' + info.response);
        }
    });
}

module.exports = { sendEmail }