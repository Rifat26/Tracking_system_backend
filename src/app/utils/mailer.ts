import nodemailer from 'nodemailer'
import config from '../config/index'
import fs from 'fs'
import path from 'path'

interface EmailOptions {
  to: string | string[]
  subject: string
  body: string
  attachmentPath?: string
}

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  secure: false, // Use `true` for port 465, `false` for all other ports
  auth: {
    user: config.emailSender.email,
    pass: config.emailSender.app_pass,
  },
  tls: {
    rejectUnauthorized: false,
  },
})

const sendMail = async ({
  to,
  subject,
  body,
  attachmentPath,
}: EmailOptions): Promise<void> => {
  const attachment = attachmentPath
    ? {
        filename: path.basename(attachmentPath),
        content: fs.readFileSync(attachmentPath),
        encoding: 'base64',
      }
    : undefined

  const mailOptions = {
    from: '"Location Track" <rifat@gmail.com>',
    to,
    subject,
    html: body,
    attachments: attachment ? [attachment] : [],
  }

  await transporter.sendMail(mailOptions)
}

export default sendMail
