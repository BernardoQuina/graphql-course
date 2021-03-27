import nodemailer from 'nodemailer'

export const sendEmail = async (to: string, html: string) => {
  // let testAccount = await nodemailer.createTestAccount()
  
  // console.log('testAccount', testAccount)

  let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIl,
      pass: process.env.EMAIL_PASS
    }
  })

  let info = await transporter.sendMail({
    from: '"Bernardo Quina" <benrardoquina@gmail.com>',
    to,
    subject: 'Change Password',
    html
  })

  console.log('Message sent: %s', info.messageId)

  console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info))
}
