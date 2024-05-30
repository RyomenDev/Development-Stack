const nodemailer = require("nodemailer");

const mailSender = async (email, title, body) => {
  try {
    const transporter = nodemailer.createTransport({
      host: process.env.HOST,
      //   service: "gmail",
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
      },
    });

    const mailOptions = {
      //   from: process.env.MAIL_USER,
      from: "StudyNotion || study",
      to: ${email},
      subject: ${title},
      html: ${body},
    };

    await transporter.sendMail(mailOptions);
    //
    return mailOptions;
  } catch (err) {
    console.log(err.message);
  }
};

module.exports = mailSender;
