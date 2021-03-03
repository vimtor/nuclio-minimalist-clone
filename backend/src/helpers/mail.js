import nodemailer from "nodemailer";

export const sendEmail = async (receiverEmail) => {
  // Generate test SMTP service account from ethereal.email
  // Only needed if you don't have a real mail account for testing
  //let testAccount = await nodemailer.createTestAccount();

  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: "mona.carroll7@ethereal.email",
      pass: "fTSeKzWCVA1ErH3PFg",
    },
  });

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: '"Minimal Task team 🤟" <foo@minimaltask.com>', // sender address
    to: receiverEmail, // list of receivers
    subject: "Welcome to Minimalist Task ✔",
    text: "Do you wanna save time?", // plain text body
    html: "<b>Welcome!!</b><br/>Thank you for your registration!! ❤", // html body
  });

  console.log("Message sent: %s", info.messageId);

  // Preview only available when sending through an Ethereal account
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));

  return info.messageId;
};
