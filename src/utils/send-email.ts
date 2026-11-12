import nodemailer from 'nodemailer'

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_APP_PASSWORD,
  },
})

export const sendEmail = async ({
  to,
  subject,
  html,
}: {
  to: string[]
  subject: string
  html: string
}) => {
  // Фильтруем невалидные адреса
  const validEmails = to.filter((email) => email && email.includes('@'))
  if (validEmails.length === 0) return // ← уже есть, но проверь что to не содержит '---'

  await transporter.sendMail({
    from: `"Identity Foundation / Ինքնություն հիմնադրամ" <${process.env.GMAIL_USER}>`,
    bcc: validEmails,
    subject,
    html,
  })
}
