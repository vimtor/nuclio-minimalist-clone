const nodemailer = require('nodemailer')

const sendWelcomeEmail = async ({email}) => {
    const testAccount = await nodemailer.createTestAccount();

    const transporter = nodemailer.createTransport({
        host: "smtp.ethereal.email",
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
            user: testAccount.user, // generated ethereal user
            pass: testAccount.pass, // generated ethereal password
        },
    });

    // send mail with defined transport object
    await transporter.sendMail({
        from: '"Victor Navaro" <victor@vimtor.io>', // sender address
        to: email, // list of receivers
        subject: "Welcome to Mimalist", // Subject line
        text: "Welcome abroad", // plain text body
        html: "Hi 👋, I'm Victor Navarro <b>Welcome to the party 🎉🎉</b>", // html body
    });
}

module.exports = {
    sendWelcomeEmail
}
