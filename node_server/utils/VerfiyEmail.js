import nodemailer from "nodemailer";

export const sendVerificationEmail = async (email, token) => {
  try {
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false, // Use `true` for port 465, `false` for all other ports
      auth: {
        user: process.env.EMAIL,
        pass: process.env.APP_PASSWORD,
      },
    });
    const mailOptions = {
      from: {
        name: "DocTalk",
        address: "doctalktest@gmail.com",
      },
      to: email,
      subject: "Verify your email for DocTalk",
      html: `<style>body {font-family: Arial, sans-serif;margin: 0;padding: 0;background-color: #f5f5f5;}.container {max-width: 600px;margin: 20px auto;padding: 20px;background-color: #fff;border-radius: 8px;box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);}h1 {color: #333;}p {color: #666;}.button {display: inline-block;padding: 10px 20px;background-color: #007bff;color: #fff;text-decoration: none;border-radius: 5px;transition: background-color 0.3s;}.button:hover {background-color: #0056b3;}</style><body><div class="container"><h1>Email Verification</h1><p>Congratulations on signing up!</p><p>Please click the button below to verify your email address.</p><a href="${process.env.BACKEND_BASE_URL}/auth/verify-email/${token}" class="button">Verify Email</a><p>If you didn't sign up for an account, you can safely ignore this email.</p></div></body>`,
    };

    const resEmail = await transporter.sendMail(mailOptions);
    return email;
  } catch (error) {
    console.log(error);
  }
};
