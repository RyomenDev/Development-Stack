const { contactUsEmail } = require("../Mail/Template/ContactForm");
const mailSender = require("../Util/MailSender");

exports.contactUsController = async (req, res) => {
  const { email, firstName, lastName, message, phoneNo, countryCode } =
    req.body;
  console.log(req.body);
  try {
    await mailSender(
      email,
      "Your Data send successfully",
      contactUsEmail(email, firstName, lastName, message, phoneNo, countryCode)
    );
    return res.json({
      success: true,
      message: "Email send successfully",
    });
  } catch (error) {
    console.error(error);
    return res.json({
      success: false,
      message: "Something went wrong...",
    });
  }
};
