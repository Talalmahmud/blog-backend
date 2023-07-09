const nodemailer = require("nodemailer");

exports.sendEmail = async (options) => {
    console.log(options);
    const transport = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.USER,
            pass: process.env.PASS,
        },
    });

    const mailOptions = {
        from: process.env.USER,
        to: options.email,
        subject: options.subject || "",
        text: options.verifiedLink,
    };
    await transport.sendMail(mailOptions);
};
