import { NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

import { env } from '@/env'

export const runtime = 'nodejs'

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: env.EMAIL_USER,
    pass: env.EMAIL_PASS,
  },
})

type SendEmailOptions = {
  to: string
  subject: string
  text: string
  from?: string
}

export async function POST(req: Request) {
  const apiKey = req.headers.get('x-api-key')

  if (apiKey !== env.EMAIL_API_KEY) {
    return NextResponse.json(
      { success: false, error: 'Unauthorized' },
      { status: 401 }
    )
  }

  try {
    const {
      to,
      subject,
      text,
      from = env.EMAIL_USER,
    } = (await req.json()) as SendEmailOptions

    const info = await transporter.sendMail({
      from,
      to,
      subject,
      text,
    })

    return NextResponse.json({ success: true, messageId: info.messageId })
  } catch (error) {
    console.error('Encountered an error when sending email:', error)
    return NextResponse.json(
      { success: false, error: 'error' },
      { status: 500 }
    )
  }
}
