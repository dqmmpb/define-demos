import SmtpClient from 'emailjs-smtp-client'

class SMTPClient {
  constructor(host, port, options = {}) {
    this.options = options;
    this.client = new SmtpClient(host, port, options);
  }

  getOptions() {
    return this.options
  }

  connect() {
    return new Promise((resolve, reject) => {
      try {
        this.client.onidle = () => {
          resolve()
        };
        this.client.onerror = (error) => {
          reject(error)
        };
        this.client.connect();
      } catch (e) {
        reject(e)
      }
    });
  }

  send({envelope, body}) {
    return new Promise((resolve, reject) => {
      try {
        const {from, to} = envelope;
        this.client.useEnvelope({
          from,
          to,
        });

        this.client.onready = (failedRecipients) => {
          if(failedRecipients.length){
            reject(new Error(`The following addresses were rejected: ${failedRecipients}`))
          }
          this.client.send(body);
          this.client.end();
        };

        this.client.ondone = (success) => {
          if(success){
            resolve();
          } else {
            reject(new Error(`The message was transmitted failed`))
          }
        }
      } catch (e) {
        reject(e)
      }
    })
  }

  quit() {
    return new Promise((resolve, reject) => {
      try {
        this.client.quit()
        resolve()
      } catch (e) {
        reject(e)
      }
    })
  }
}

export default SMTPClient;
