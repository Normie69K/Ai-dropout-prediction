import nodemailer from 'nodemailer'
import twilio from 'twilio'

const transporter = nodemailer.createTransporter({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT) || 587,
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS
  }
})

const twilioClient = twilio(
  process.env.TWILIO_ACCOUNT_SID!,
  process.env.TWILIO_AUTH_TOKEN!
)

export async function sendEmail(to: string, subject: string, html: string) {
  try {
    await transporter.sendMail({
      from: process.env.EMAIL_FROM || 'noreply@eduews.com',
      to,
      subject,
      html
    })
    return true
  } catch (error) {
    console.error('Email error:', error)
    throw new Error('Failed to send email')
  }
}

export async function sendWhatsApp(to: string, message: string) {
  try {
    // Ensure phone number is in E.164 format
    const phoneNumber = to.startsWith('+') ? to : `+91${to}`
    
    await twilioClient.messages.create({
      from: process.env.TWILIO_WHATSAPP_FROM || 'whatsapp:+14155238886',
      to: `whatsapp:${phoneNumber}`,
      body: message
    })
    return true
  } catch (error) {
    console.error('WhatsApp error:', error)
    throw new Error('Failed to send WhatsApp message')
  }
}