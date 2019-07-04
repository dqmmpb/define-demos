import ImapClient from 'emailjs-imap-client'
import {QQ, GMAIL} from "./email-ignore";

// const client = new ImapClient(QQ.IMAP.host, QQ.IMAP.port, {
//   auth: {
//     user: QQ.user,
//     pass: QQ.pass,
//   }
// });

const client = new ImapClient(GMAIL.IMAP.host, GMAIL.IMAP.port, {
  auth: {
    user: GMAIL.user,
    pass: GMAIL.pass,
  }
});


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
    console.log(messages)
    messages.forEach((message) => console.log(`Date: ${message.envelope.date} Subject: ${message.envelope.subject} Flags for ${message.uid} : ${message.flags.join(', ')}`));
  });
}).then(() => {
  return client.logout().then(() => { /* connection terminated */ });
}).then(() => {
  client.close().then(() => { /* connection terminated */ });
})

