import nodemailer from 'nodemailer'
import {QQ, GMAIL} from "./email-ignore";

// const transporter = nodemailer.createTransport({
//   host: QQ.SMTP.host,
//   port: QQ.SMTP.port,
//   secure: true, // use TLS
//   auth: {
//     user: QQ.user,
//     pass: QQ.pass,
//   }
// });

const transporter = nodemailer.createTransport({
  host: GMAIL.SMTP.host,
  port: GMAIL.SMTP.port,
  secure: true, // use TLS
  auth: {
    user: GMAIL.user,
    pass: GMAIL.pass,
  }
});

transporter.verify(function(error, success) {
  if (error) {
    console.log(error);
  } else {
    console.log("Server is ready to take our messages");
    transporter.sendMail({
      from: 'dqmmpb@gmail.com',
      to: 'dqmmpb@qq.com',
      subject: 'Message title',
      text: 'Plaintext version of the message',
      html: '<p>HTML version of the message</p>'
    })
  }
});

