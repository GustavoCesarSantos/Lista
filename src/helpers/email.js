const nodemailer = require('nodemailer')

module.exports = {
  async sendEmail (user) {
    const testEmail = await nodemailer.createTestAccount()
    const transporter = nodemailer.createTransport({
      host: 'smtp.ethereal.email',
      auth: testEmail
    })

    const sendedEmail = await transporter.sendMail({
      from: '"Teste" <gustavocs789@gmail.com>',
      to: user.email,
      subject: 'teste de email',
      text: 'TESTE TESTE TESTE'
    })

    console.log('URL: ' + nodemailer.getTestMessageUrl(sendedEmail))
  }
}
