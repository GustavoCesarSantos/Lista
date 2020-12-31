const nodemailer = require('nodemailer')

const productionEmailConfiguration = {
  host: process.env.EMAIL_HOST,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD
  },
  secure: true
}

const testEmailConfiguration = (testEmail) => ({
  host: 'smtp.ethereal.email',
  auth: testEmail
})

async function createEmailConfiguration () {
  if (process.env.NODE_ENV === 'production') {
    return productionEmailConfiguration
  } else {
    const testEmail = await nodemailer.createTestAccount()
    return testEmailConfiguration(testEmail)
  }
}

class Email {
  async sendEmail () {
    const emailConfiguration = await createEmailConfiguration()
    const transporter = nodemailer.createTransport(emailConfiguration)
    const sendedEmail = await transporter.sendMail(this)

    if (process.env.NODE_ENV !== 'production') console.log('URL: ' + nodemailer.getTestMessageUrl(sendedEmail))
  }
}

class VerificationEmail extends Email {
  constructor (user) {
    super()
    this.address = `${process.env.BASE_URL}/users/${user.id}/email/verify`
    this.from = '"Teste" <gustavocs789@gmail.com>'
    this.to = user.email
    this.subject = 'teste de email'
    this.text = `Verifique seu e-mail aqui: ${this.address}`
    this.html = `Verifique seu e-mail aqui: <a href="${this.address}">${this.address}</a>`
  }
}

module.exports = { VerificationEmail }
