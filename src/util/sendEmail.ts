import nodemailer from 'nodemailer'

export const sendEmail = async (to: string, html: string) => {
  // let testAccount = await nodemailer.createTestAccount()
  
  // console.log('testAccount', testAccount)

  let transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    secure: false,
    auth: {
      user: 'in53almi5w37csqp@ethereal.email',
      pass: '8N1HchDFFY1T9f3BhX'
    }
  })

  let info = await transporter.sendMail({
    from: '"Fred Foo 👻" <foo@example.com>',
    to,
    subject: 'Change Password',
    html
  })

  console.log('Message sent: %s', info.messageId)

  console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info))
}
