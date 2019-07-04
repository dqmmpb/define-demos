import ImapClient from 'emailjs-imap-client'
import {QQ, GMAIL} from "./email-ignore";
import io from 'socket.io-client';

/**
 * Web端不支持tls，使用TCPSocket，需要开启TCPSocket代理
 * 修改
 *     `emailjs-IMAP-client@2.0.3`和`emailjs-tcp-socket@1.0.2`代码，添加依赖`socket.io-client`
 * 参看
 *     `git+https://github.com/dqmmpb/emailjs-imap-client.git#feature/socket.io`
 *     `git+https://github.com/dqmmpb/emailjs-tcp-socket.git#feature/socket.io`
 *
 * 启动
 *      https://github.com/emailjs/emailjs-tcp-proxy
 *      git clone git@github.com:emailjs/emailjs-tcp-proxy.git
 *      cd emailjs-tcp-proxy
 *      PROXY_PORT=8889 npm start
 */
const client = new ImapClient(QQ.IMAP.host, QQ.IMAP.port, {
  auth: {
    user: QQ.user,
    pass: QQ.pass,
  },
  ws: {
    url: 'http://localhost:8888',
    options: {
      upgrade: false
    }
  }
});
// const client = new ImapClient(GMAIL.IMAP.host, GMAIL.IMAP.port, {
//   auth: {
//     user: GMAIL.user,
//     pass: GMAIL.pass,
//   },
//   ws: {
//     url: 'http://localhost:8889',
//     options: {
//       upgrade: false
//     }
//   }
// });

client.onerror = (error) => {
  console.log(error)
}

client.connect().then(() => {
  return client.listMailboxes().then((mailboxes) => {
    console.log(mailboxes)
  })
}).then(() => {
  return client.selectMailbox('INBOX').then((mailbox) => {
    console.log(mailbox)
  });
}).then(() => {
  return client.listMessages('INBOX', '1:10', ['uid', 'flags', 'envelope']).then((messages) => {
    messages.forEach((message) => console.log(`${message.envelope.subject} Flags for ${message.uid} : ${message.flags.join(', ')}`));
  });
}).then(() => {
  return client.logout().then(() => { /* connection terminated */ });
}).then(() => {
  client.close().then(() => { /* connection terminated */ });
})
