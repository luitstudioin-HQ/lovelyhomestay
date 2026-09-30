'use client'

import ButtonPrimary from '@/components/button-primary'
import { Field, Label } from '@/components/fieldset'
import Input from '@/components/input'
import Textarea from '@/components/textarea'
import { SentIcon } from '@hugeicons/core-free-icons'
import { HugeiconsIcon } from '@hugeicons/react'
import { useActionState, useEffect, useRef } from 'react'
import { initialContactSubmissionState, submitContactSubmission } from './actions'

const ContactForm = () => {
  const formRef = useRef<HTMLFormElement>(null)
  const [state, formAction, isPending] = useActionState(submitContactSubmission, initialContactSubmissionState)

  useEffect(() => {
    if (state.success) formRef.current?.reset()
  }, [state.success])

  return (
    <form ref={formRef} className="grid grid-cols-1 gap-6" action={formAction}>
      <input
        type="text"
        name="website"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="sr-only"
      />
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

      {state.error && <p className="rounded-xl bg-red-50 p-3 text-sm text-red-700" role="alert">{state.error}</p>}
      {state.success && <p className="rounded-xl bg-green-50 p-3 text-sm text-green-700" role="status">Thanks for your enquiry. We&apos;ll get back to you soon.</p>}

      <div>
        <ButtonPrimary type="submit" disabled={isPending}>
          {isPending ? 'Sending...' : 'Send Message'}
          <HugeiconsIcon icon={SentIcon} size={16} />
        </ButtonPrimary>
      </div>
    </form>
  )
}

export default ContactForm
