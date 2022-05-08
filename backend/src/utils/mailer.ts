const nodemailer = require('nodemailer');
require('dotenv').config();

export default async function mailer(info: Object) {
  try {
    const transporter = nodemailer.createTransport({
      host: process.env.MAILER_HOST,
      port: process.env.MAILER_PORT,
      auth: {
        user: process.env.MAILER_USER,
        pass: process.env.MAILER_PASSWORD
      }
    });

    await transporter.sendMail(info);
  } catch (error: any) {
    console.log(error);
    throw new Error(error);
  }
}
