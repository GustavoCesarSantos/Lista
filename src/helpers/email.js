const nodemailer = require('nodemailer')

class Email {
  async sendEmail () {
    const testEmail = await nodemailer.createTestAccount()
    const transporter = nodemailer.createTransport({
      host: 'smtp.ethereal.email',
      auth: testEmail
    })

    const sendedEmail = await transporter.sendMail(this)

    console.log('URL: ' + nodemailer.getTestMessageUrl(sendedEmail))
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
