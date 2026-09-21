'use client'

import ButtonPrimary from '@/components/button-primary'
import { Field, Label } from '@/components/fieldset'
import Input from '@/components/input'
import Textarea from '@/components/textarea'
import { SentIcon } from '@hugeicons/core-free-icons'
import { HugeiconsIcon } from '@hugeicons/react'
import { FormEvent } from 'react'

const recipientEmail = 'nazuneog@gmail.com'

const ContactForm = () => {
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const formData = new FormData(event.currentTarget)
    const name = String(formData.get('name') ?? '').trim()
    const email = String(formData.get('email') ?? '').trim()
    const message = String(formData.get('message') ?? '').trim()
    const subject = 'New Enquiry - Lovely Homestay'
    const body = `Visitor name: ${name}\nVisitor email: ${email}\n\nMessage:\n${message}`

    window.location.href = `mailto:${recipientEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
  }

  return (
    <form className="grid grid-cols-1 gap-6" onSubmit={handleSubmit}>
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
