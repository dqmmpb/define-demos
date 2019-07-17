import ImapClient from 'emailjs-imap-client'
import {QQ, GMAIL} from "./email-ignore";
import moment from 'moment';
import _ from 'lodash';
import Page from './Page';
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
const client = new ImapClient(GMAIL.IMAP.host, GMAIL.IMAP.port, {
  auth: {
    user: GMAIL.user,
    pass: GMAIL.pass,
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
  return client.search('INBOX', { all: true }, {byUid: true}).then((result) => {
    console.log('before: ', result);
    // result.forEach((uid) => console.log('Message ' + uid + ''));
    const reverseUids = _.reverse(result);
    const page = new Page(reverseUids);

    console.log('after: ', page);
    client.listMessages('INBOX', page.list.join(','), ['uid', 'flags', 'envelope'], {byUid: true}).then((messages) => {
      const reverseMessages = _.reverse(messages);
      reverseMessages.forEach((message) => console.log(`${message.uid} ${moment(message.envelope.date).format('L')} ${message.envelope.from.map(item => item.address)} ${message.envelope.subject} : ${message.flags.join(', ')}`));
    });
  });
  // return client.listMessages('INBOX', '1:10', ['uid', 'flags', 'envelope']).then((messages) => {
  //   messages.forEach((message) => console.log(`${message.envelope.subject} Flags for ${message.uid} : ${message.flags.join(', ')}`));
  // });
}).then(() => {
  return client.logout().then(() => { /* connection terminated */ });
}).then(() => {
  client.close().then(() => { /* connection terminated */ });
})
