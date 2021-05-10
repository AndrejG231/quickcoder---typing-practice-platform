import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  port: 587,
  secure: false,
  auth: {
    user: process.env.GM_USER!,
    pass: process.env.GM_PASS!,
  },
});

interface sendMailProps {
  to: string;
  subject: string;
  html?: string;
  text?: string;
  customFrom?: string;
}

interface sendMail {
  (data: sendMailProps): Promise<Boolean>;
}

const sendMail: sendMail = async ({ to, subject, text, html, customFrom }) => {
  const mailInfo = await transporter.sendMail({
    from: customFrom ? customFrom : "QuickCoder.com, <noreply@quickcoder.com>",
    subject: subject,
    to: to,
    text: text ? text : "",
    html: html ? html : "",
  });

  return mailInfo.accepted.length > 0;
};

export default sendMail;
