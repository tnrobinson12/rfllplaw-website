'use client';

import { useState, type FormEvent } from 'react';
import { legal } from '@/content/site';
import { practices } from '@/content/practices';
import { ArrowRight } from '@/components/Icons';

type Status = 'idle' | 'submitting' | 'success' | 'error';

type Errors = Partial<Record<'name' | 'email' | 'message' | 'consent', string>>;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

/**
 * Contact form wired to Netlify Forms.
 *
 * Netlify detects forms in static HTML at deploy time, so the form definition
 * also lives in /public/__forms.html. This component posts URL-encoded data to
 * that path, which is how Netlify Forms is used with the Next.js App Router.
 * No server route, no third-party dependency.
 */
export function ContactForm() {
  const [status, setStatus] = useState<Status>('idle');
  const [errors, setErrors] = useState<Errors>({});

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);

    // Honeypot — silently succeed for bots.
    if ((data.get('bot-field') as string)?.length) {
      setStatus('success');
      return;
    }

    const nextErrors: Errors = {};
    const name = (data.get('name') as string)?.trim();
    const email = (data.get('email') as string)?.trim();
    const message = (data.get('message') as string)?.trim();
    const consent = data.get('consent');

    if (!name) nextErrors.name = 'Please enter your name.';
    if (!email) nextErrors.email = 'Please enter an email address.';
    else if (!EMAIL_RE.test(email)) nextErrors.email = 'Please enter a valid email address.';
    if (!message) nextErrors.message = 'Please tell us briefly how we can help.';
    if (!consent) nextErrors.consent = 'Please acknowledge the notice below to continue.';

    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      const firstKey = Object.keys(nextErrors)[0];
      form.querySelector<HTMLElement>(`[name="${firstKey}"]`)?.focus();
      return;
    }

    setStatus('submitting');

    try {
      const response = await fetch('/__forms.html', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams(data as unknown as Record<string, string>).toString(),
      });

      if (!response.ok) throw new Error(`Request failed: ${response.status}`);
      form.reset();
      setStatus('success');
    } catch {
      setStatus('error');
    }
  }

  if (status === 'success') {
    return (
      <div className="form-status" role="status">
        <p>
          <strong>Thank you — your message has been sent.</strong>
        </p>
        <p style={{ marginTop: '0.75rem' }}>
          An attorney will review your inquiry and respond. Please remember that sending this
          message does not create an attorney-client relationship, and no confidential information
          should be sent until such a relationship has been established in writing.
        </p>
      </div>
    );
  }

  return (
    <form
      className="form"
      name="contact"
      method="POST"
      action="/__forms.html"
      data-netlify="true"
      data-netlify-honeypot="bot-field"
      onSubmit={handleSubmit}
      noValidate
    >
      <input type="hidden" name="form-name" value="contact" />

      <div className="field field--honeypot" aria-hidden="true">
        <label htmlFor="bot-field">Do not fill this out</label>
        <input id="bot-field" name="bot-field" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="form-row">
        <div className="field">
          <label className="field__label" htmlFor="contact-name">
            Name<span className="field__req" aria-hidden="true">*</span>
          </label>
          <input
            id="contact-name"
            name="name"
            type="text"
            autoComplete="name"
            required
            aria-required="true"
            aria-invalid={errors.name ? 'true' : undefined}
            aria-describedby={errors.name ? 'error-name' : undefined}
          />
          {errors.name ? (
            <p className="field__error" id="error-name">
              {errors.name}
            </p>
          ) : null}
        </div>

        <div className="field">
          <label className="field__label" htmlFor="contact-email">
            Email<span className="field__req" aria-hidden="true">*</span>
          </label>
          <input
            id="contact-email"
            name="email"
            type="email"
            autoComplete="email"
            required
            aria-required="true"
            aria-invalid={errors.email ? 'true' : undefined}
            aria-describedby={errors.email ? 'error-email' : undefined}
          />
          {errors.email ? (
            <p className="field__error" id="error-email">
              {errors.email}
            </p>
          ) : null}
        </div>
      </div>

      <div className="form-row">
        <div className="field">
          <label className="field__label" htmlFor="contact-phone">
            Phone
          </label>
          <input id="contact-phone" name="phone" type="tel" autoComplete="tel" />
        </div>

        <div className="field">
          <label className="field__label" htmlFor="contact-company">
            Company
          </label>
          <input id="contact-company" name="company" type="text" autoComplete="organization" />
        </div>
      </div>

      <div className="field">
        <label className="field__label" htmlFor="contact-subject">
          Area of interest
        </label>
        <select id="contact-subject" name="subject" defaultValue="">
          <option value="">Select a practice area</option>
          {practices.map((practice) => (
            <option key={practice.slug} value={practice.name}>
              {practice.name}
            </option>
          ))}
          <option value="Other">Other</option>
        </select>
      </div>

      <div className="field">
        <label className="field__label" htmlFor="contact-message">
          How can we help?<span className="field__req" aria-hidden="true">*</span>
        </label>
        <textarea
          id="contact-message"
          name="message"
          rows={6}
          required
          aria-required="true"
          aria-invalid={errors.message ? 'true' : undefined}
          aria-describedby={
            [errors.message ? 'error-message' : null, 'message-hint']
              .filter(Boolean)
              .join(' ') || undefined
          }
        />
        <p className="field__hint" id="message-hint">
          Please describe your matter in general terms only. Do not include confidential or
          sensitive information in this message.
        </p>
        {errors.message ? (
          <p className="field__error" id="error-message">
            {errors.message}
          </p>
        ) : null}
      </div>

      <div className="field">
        <label className="checkbox" htmlFor="contact-consent">
          <input
            id="contact-consent"
            name="consent"
            type="checkbox"
            required
            aria-required="true"
            aria-invalid={errors.consent ? 'true' : undefined}
            aria-describedby={errors.consent ? 'error-consent' : undefined}
          />
          <span>{legal.noRelationship}</span>
        </label>
        {errors.consent ? (
          <p className="field__error" id="error-consent">
            {errors.consent}
          </p>
        ) : null}
      </div>

      {status === 'error' ? (
        <div className="form-status form-status--error" role="alert">
          Your message could not be sent. Please try again, or email the firm directly using the
          address listed on this page.
        </div>
      ) : null}

      <div>
        <button type="submit" className="btn" disabled={status === 'submitting'}>
          {status === 'submitting' ? 'Sending…' : 'Send Message'}
          <ArrowRight />
        </button>
      </div>
    </form>
  );
}
