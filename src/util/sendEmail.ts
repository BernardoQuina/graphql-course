import nodemailer, { TransportOptions } from 'nodemailer'
import { google } from 'googleapis'

const oAuth2Client = new google.auth.OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  'https://developers.google.com/oauthplayground'
)

oAuth2Client.setCredentials({ refresh_token: process.env.GOOGLE_REFRESH_TOKEN })

export const sendEmail = async (to: string, html: string) => {
  try {
    const accessToken = await oAuth2Client.getAccessToken()

    let transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        type: 'OAuth2',
        user: 'bernardoquina@gmail.com',
        clientId: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        refreshToken: process.env.GOOGLE_REFRESH_TOKEN,
        accessToken: accessToken,
        expires: 1000 * 60 * 60 * 24 * 30,
      },
      tls: {
        rejectUnauthorized: process.env.NODE_ENV === 'production',
      },
    } as TransportOptions)

    let info = await transporter.sendMail({
      from: '"Bernardo Quina" <benrardoquina@gmail.com>',
      to,
      subject: 'Change Password',
      html,
    })

    console.log('Message sent: %s', info.envelope)
  } catch (error) {
    console.log('error: ', error)
  }
}
