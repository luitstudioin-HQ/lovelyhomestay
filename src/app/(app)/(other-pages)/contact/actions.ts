'use server'

import { createServiceRoleClient } from '@/lib/supabase/server'

export type ContactSubmissionState = {
  error?: string
  success?: boolean
}

export const initialContactSubmissionState: ContactSubmissionState = {}

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function readText(formData: FormData, key: string) {
  const value = formData.get(key)
  return typeof value === 'string' ? value.trim() : ''
}

export async function submitContactSubmission(
  _previousState: ContactSubmissionState,
  formData: FormData,
): Promise<ContactSubmissionState> {
  if (readText(formData, 'website')) return { success: true }

  const name = readText(formData, 'name')
  const email = readText(formData, 'email')
  const message = readText(formData, 'message')

  if (name.length < 2 || name.length > 100) {
    return { error: 'Please enter your full name.' }
  }

  if (email.length > 254 || !EMAIL_PATTERN.test(email)) {
    return { error: 'Please enter a valid email address.' }
  }

  if (message.length < 10 || message.length > 3000) {
    return { error: 'Please enter a message between 10 and 3,000 characters.' }
  }

  const supabase = createServiceRoleClient()
  if (!supabase) {
    console.error('Contact submissions are not configured: missing service role credentials.')
    return { error: 'We could not send your message. Please try again later.' }
  }

  const { error } = await supabase.from('contact_submissions').insert({ name, email, message })
  if (error) {
    console.error('Unable to save contact submission:', error.message)
    return { error: 'We could not send your message. Please try again later.' }
  }

  return { success: true }
}
