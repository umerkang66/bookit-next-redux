import nodemailer, { SendMailOptions } from 'nodemailer';

type SendMail = (options: SendMailOptions) => Promise<void>;

export const sendEmail: SendMail = async options => {
  const {
    MAILTRAP_URL: host,
    MAILTRAP_PORT: port,
    MAILTRAP_USERNAME: user,
    MAILTRAP_PASSWORD: pass,
  } = process.env;

  const transporter = nodemailer.createTransport({
    host,
    port: parseInt(port as string),
    auth: { user, pass },
  });

  await transporter.sendMail(options);
};
