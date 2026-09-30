'use client'

import ButtonPrimary from '@/components/button-primary'
import { Field, Label } from '@/components/fieldset'
import Input from '@/components/input'
import Textarea from '@/components/textarea'
import { SentIcon } from '@hugeicons/core-free-icons'
import { HugeiconsIcon } from '@hugeicons/react'
import { FormEvent, useState } from 'react'

const ContactForm = () => {
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  function submitContact(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const form = event.currentTarget
    if (!form.checkValidity()) {
      form.reportValidity()
      return
    }

    const formData = new FormData(form)
    const name = String(formData.get('name') ?? '').trim()
    const email = String(formData.get('email') ?? '').trim()
    const phone = String(formData.get('phone') ?? '').trim()
    const message = String(formData.get('message') ?? '').trim()
    const subject = 'New Contact Inquiry — Lovely Homestay'
    const body = `Name: ${name}\n\nEmail: ${email}\n\nPhone: ${phone}\n\nMessage:\n${message}`
    const mailtoUrl = `mailto:lovelyhomestay2026@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`

    try {
      window.location.href = mailtoUrl
      setError(null)
      setSuccess(true)
    } catch {
      setSuccess(false)
      setError('Your email app could not be opened. Please email us directly at lovelyhomestay2026@gmail.com.')
    }
  }

  return (
    <form className="grid grid-cols-1 gap-6" onSubmit={submitContact}>
      <Field className="block">
        <Label htmlFor="contact-name">Full name</Label>
        <Input
          id="contact-name"
          name="name"
          placeholder="Example Doe"
          type="text"
          autoComplete="name"
          minLength={2}
          maxLength={100}
          required
          className="mt-1"
        />
      </Field>
      <Field className="block">
        <Label htmlFor="contact-phone">Phone</Label>
        <Input
          id="contact-phone"
          name="phone"
          placeholder="Your phone number"
          type="tel"
          autoComplete="tel"
          maxLength={40}
          className="mt-1"
        />
      </Field>
      <Field className="block">
        <Label htmlFor="contact-email">Email address</Label>
        <Input
          id="contact-email"
          name="email"
          type="email"
          placeholder="example@example.com"
          autoComplete="email"
          maxLength={254}
          required
          className="mt-1"
        />
      </Field>
      <Field className="block">
        <Label htmlFor="contact-message">Message</Label>
        <Textarea
          id="contact-message"
          name="message"
          className="mt-1"
          rows={6}
          minLength={10}
          maxLength={3000}
          required
        />
      </Field>

      {error && <p className="rounded-xl bg-red-50 p-3 text-sm text-red-700" role="alert">{error} <a className="underline" href="mailto:lovelyhomestay2026@gmail.com">lovelyhomestay2026@gmail.com</a></p>}
      {success && <p className="rounded-xl bg-green-50 p-3 text-sm text-green-700" role="status">Your email app has been opened with your enquiry. Please send the message to complete your request.</p>}

      <div>
        <ButtonPrimary type="submit">
          Send Message
          <HugeiconsIcon icon={SentIcon} size={16} />
        </ButtonPrimary>
      </div>
    </form>
  )
}

export default ContactForm
