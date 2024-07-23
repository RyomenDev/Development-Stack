const { instance } = require("../Configuration/Razorpay");
const Course = require("../Model/Course");
const crypto = require("crypto"); // in built-in
const User = require("../Model/User");
const mailSender = require("../Util/MailSender");
const mongoose = require("mongoose");
const {
  courseEnrollmentEmail,
} = require("../Mail/Template/CourseEnrollmentEmail");
const { paymentSuccessEmail } = require("../Mail/Template/PaymentSuccessEmail");
const CourseProgress = require("../Model/CourseProgress");

//

exports.capturePayment = async (req, res) => {
  // fetch course details
  const { courses } = req.body;
  const userId = req.user.id;
  if (!courses.length) {
    return res.json({ success: false, message: "Please Provide Course ID" });
  }
  let total_amount = 0;
  for (const course_id of courses) {
    let course;
    // validate course details
    try {
      course = await Course.findById(course_id);
      if (!course) {
        return res
          .status(200)
          .json({ success: false, message: "Could not find the Course" });
      }
      // already payed and enrolled
      const uid = new mongoose.Types.ObjectId(userId);
      if (course.studentsEnrolled.includes(uid)) {
        return res
          .status(200)
          .json({ success: false, message: "Student is already Enrolled" });
      }
      total_amount += course.price;
    } catch (error) {
      console.log(error);
      return res.status(500).json({ success: false, message: error.message });
    }
  }
  // create order
  const options = {
    amount: total_amount * 100, // ₹1 : 1.00
    currency: "INR",
    receipt: Math.random(Date.now()).toString(),
    // notes: {
    //   courseId: course_id,
    //   userId,
    // },
  };
  try {
    // initiate Payment using razorpay
    const paymentResponse = await instance.orders.create(options);
    console.log(paymentResponse);
    res.json({
      success: true,
      data: paymentResponse,
    });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ success: false, message: "Could not initiate order." });
  }
};

//

exports.verifyPayment = async (req, res) => {
  const razorpay_order_id = req.body?.razorpay_order_id;
  // const webHookSecret = "xxxxxxxxxx";
  const razorpay_payment_id = req.body?.razorpay_payment_id;
  //   const razorpay_signature = req.headers["x-razorpay-signature"];
  const razorpay_signature = req.body?.razorpay_signature;
  const courses = req.body?.courses;
  const userId = req.user.id;
  if (
    !razorpay_order_id ||
    !razorpay_payment_id ||
    !razorpay_signature ||
    !courses ||
    !userId
  ) {
    return res.status(200).json({ success: false, message: "Payment Failed" });
  }
  let body = razorpay_order_id + "|" + razorpay_payment_id;
  // hmac: hashed based msg authentication code
  // algo: sha-secure hashing algo
  const expectedSignature = crypto
    .createHmac("sha256", process.env.RAZORPAY_SECRET)
    .update(body.toString())
    .digest("hex"); // output(form) : hex
  // digest === signature
  if (expectedSignature === razorpay_signature) {
    try {
      // const {courseId,userId} = req.body.payload.payment.entity.notes;
      // const enrollStudents = await Course.findOneAndUpdate)(
      // {_id:courseId},
      // {$push:{studentsEnrolled:userId},
      // {new:true}
      // );

      //   if(!enrollStudents){
      //     return res.status(500).json({
      //         success:false,
      //         message:`Course not found`,
      //     })
      //   }

      // find student & add the course to their list enrolled courses
      //   const enrolledStudent = await User.findOneAndUpdate(
      //     {_id:userId},
      //     {$push:{course}:course_id},
      //     {new:true},
      //   )
      await enrollStudents(courses, userId, res);
      return res
        .status(200)
        .json({ success: true, message: "Payment Verified" });
    } catch (error) {
      console.log("error in sending mail", error);
      return res
        .status(400)
        .json({ success: false, message: "Could not find enrolledStudent" });
    }
  }
  return res.status(200).json({ success: false, message: "Payment Failed" });
};

//

exports.sendPaymentSuccessEmail = async (req, res) => {
  const { orderId, paymentId, amount } = req.body;

  const userId = req.user.id;

  if (!orderId || !paymentId || !amount || !userId) {
    return res
      .status(400)
      .json({ success: false, message: "Please provide all the details" });
  }

  try {
    const enrolledStudent = await User.findById(userId);

    await mailSender(
      enrolledStudent.email,
      `Payment Received`,
      paymentSuccessEmail(
        `${enrolledStudent.firstName} ${enrolledStudent.lastName}`,
        amount / 100,
        orderId,
        paymentId
      )
    );
  } catch (error) {
    console.log("error in sending mail", error);
    return res
      .status(400)
      .json({ success: false, message: "Could not send email" });
  }
};

//

const enrollStudents = async (courses, userId, res) => {
  if (!courses || !userId) {
    return res.status(400).json({
      success: false,
      message: "Please Provide Course ID and User ID",
    });
  }

  for (const courseId of courses) {
    try {
      const enrolledCourse = await Course.findOneAndUpdate(
        { _id: courseId },
        { $push: { studentsEnrolled: userId } },
        { new: true }
      );

      if (!enrolledCourse) {
        return res
          .status(500)
          .json({ success: false, error: "Course not found" });
      }
      console.log("Updated course: ", enrolledCourse);

      const courseProgress = await CourseProgress.create({
        courseID: courseId,
        userId: userId,
        completedVideos: [],
      });

      const enrolledStudent = await User.findByIdAndUpdate(
        userId,
        {
          $push: {
            courses: courseId,
            courseProgress: courseProgress._id,
          },
        },
        { new: true }
      );

      console.log("Enrolled student: ", enrolledStudent);

      const emailResponse = await mailSender(
        enrolledStudent.email,
        `Successfully Enrolled into ${enrolledCourse.courseName}`,
        courseEnrollmentEmail(
          enrolledCourse.courseName,
          `${enrolledStudent.firstName} ${enrolledStudent.lastName}`
        )
      );

      console.log("Email sent successfully: ", emailResponse.response);
    } catch (error) {
      console.log(error);
      return res.status(400).json({ success: false, error: error.message });
    }
  }
};
