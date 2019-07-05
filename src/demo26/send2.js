import SMTPClient from './SMTPClient'
import fs from 'fs';
import path from 'path';
import tz from 'timezone/loaded'
import MimeBuilder from 'emailjs-mime-builder'
import {QQ, GMAIL} from "./email-ignore";

// const client = new SMTPClient(QQ.SMTP.host, QQ.SMTP.port, {
//   auth: {
//     user: QQ.user,
//     pass: QQ.pass,
//   }
// });

const client = new SMTPClient(GMAIL.SMTP.host, GMAIL.SMTP.port, {
  auth: {
    user: GMAIL.user,
    pass: GMAIL.pass,
  }
});

const readFile = file => {
  return new Promise((resolve, reject) => {
    fs.readFile(file, (err, data) => {
      if(err){
        reject(err);
      }
      else{
        resolve({
          fileName: path.basename(file),
          data,
        })
      }
    });
  });
};

const readFiles = files => {
  return Promise.all(files.map(file => readFile(file)))
};


const attachmentBuilder = (from, to, attachments = []) => {
  const rootNode = new MimeBuilder("multipart/mixed").setHeader({
    from,
    to,
    subject: "test attachment",
    date: tz(new Date(), "%a, %0d %b %Y %T %z", "Asia/Shanghai"),
  });

  attachments.forEach(attachmenet => {
    const {fileName, data} = attachmenet;
    const childNodeAttachment = rootNode.createChild(false, {filename: fileName})
      .setHeader({
        "Content-Disposition": 'attachment',
        "Content-Transfer-Encoding": "base64",
      })
      .setContent(data);
  })

  return rootNode.build();
};

const alternativeBuilder = (from, to) => {
  const rootNode = new MimeBuilder("multipart/alternative").setHeader({
    from,
    to,
    subject: "test alternative",
    date: tz(new Date(), "%a, %0d %b %Y %T %z", "Asia/Shanghai"),
  });
  const childNodeText = rootNode.createChild("text/plain").setContent("Plain Text Content");
  const childNodeHtml = rootNode.createChild("text/html").setContent("<html><header></header><body><h1>HTML Content</h1></body></html>");
  return rootNode.build();
};

const mixedBuilder = (from, to) => {
  const rootNode = new MimeBuilder("multipart/mixed").setHeader({
    from,
    to,
    subject: "test mixed",
    date: tz(new Date(), "%a, %0d %b %Y %T %z", "Asia/Shanghai"),
  });
  const childNodeText = rootNode.createChild("text/plain").setContent("Plain Text Content");
  const childNodeHtml = rootNode.createChild("text/html").setContent("<html><header></header><body><h1>HTML Content</h1></body></html>");
  return rootNode.build();
};

const textBuilder = (from, to) => {
  const rootNode = new MimeBuilder("text/plain").setHeader({
    from,
    to,
    subject: "test plain",
    date: tz(new Date(), "%a, %0d %b %Y %T %z", "Asia/Shanghai"),
  });
  rootNode.setContent("Message body");
  return rootNode.build();
};

client.connect()
.then(() => {
  return readFiles([
    "/home/alphabeta/Desktop/email/image.jpg",
    // "/home/alphabeta/Desktop/email/video.mp4",
    // "/home/alphabeta/Desktop/email/中文.txt",
    // "/home/alphabeta/Desktop/email/小程序需求框架.doc",
    // "/home/alphabeta/Desktop/email/pptx.pptx",
  ]);
})
.then((attachments) => {
  console.log('connect success');
  console.log(attachments[0].data)
  const from = client.getOptions().auth.user;
  // const to = ["dqmmpb@gmail.com"];
  const to = ["dqmmpb@gmail.com", "dqmmpb@qq.com"];
  const body = attachmentBuilder(from, to, attachments);
  console.log(body)
  return client.send({
    envelope: {
      from,
      to,
    },
    body,
  })
}).then(() => {
  return client.quit()
}).then(() => {
  console.log("quit")
}).catch((e) => {
  console.log(e)
});
