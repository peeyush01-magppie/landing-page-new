import { useEffect, useRef, useState } from 'react'
import { budgets, interests, states, timelines, unionTerritories } from '../data/content'
import { ArrowUpRight, ChevronDown, Eyebrow } from './ui'

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function Label({ htmlFor, required, children }) {
  return (
    <label htmlFor={htmlFor} className="text-[13px] leading-[normal] font-medium sm:text-[15px]">
      {children}
      {required && (
        <span aria-hidden="true" className="text-stone">
          {' '}*
        </span>
      )}
    </label>
  )
}

function SelectField({ id, name, label, required, placeholder, compact, autoComplete = 'off', children }) {
  return (
    <div className={`flex min-w-0 flex-col ${compact ? 'flex-[1_1_130px]' : 'flex-[1_1_200px]'}`}>
      <Label htmlFor={id} required={required}>
        {label}
      </Label>
      <div className="relative">
        <select id={id} name={name} required autoComplete={autoComplete} defaultValue="" className="field">
          <option value="" disabled>
            {placeholder}
          </option>
          {children}
        </select>
        <ChevronDown />
      </div>
    </div>
  )
}

const options = (list) => list.map((o) => <option key={o}>{o}</option>)

/**
 * Validate the form values. Returns an error message, or '' when valid.
 * Mirrors the rules of the original page.
 */
/**
 * Browser autofill (autocomplete="tel") may insert an international number such as
 * "+91 98765 43210" or "098765 43210". Reduce it to the 10-digit national number.
 */
function toMobile10(value) {
  const digits = value.replace(/\D/g, '')
  if (digits.length === 12 && digits.startsWith('91')) return digits.slice(2)
  if (digits.length === 11 && digits.startsWith('0')) return digits.slice(1)
  return digits
}

function validate(data) {
  const mobile = toMobile10(data.mobile)
  if (!data.name || !data.state || !data.email || !data.interest) return 'Please fill in all the required fields.'
  if (mobile.length !== 10) return 'Please enter a valid 10-digit mobile number.'
  if (!EMAIL_RE.test(data.email)) return 'Please enter a valid email address.'
  if (!data.consent) return 'Please agree to be contacted so we can respond to your enquiry.'
  return ''
}

export default function EnquiryForm({ onSubmit }) {
  const [error, setError] = useState('')
  const [firstName, setFirstName] = useState(null)

  // Product cards elsewhere on the page can pre-select "I'm interested in".
  useEffect(() => {
    const onInterest = (e) => {
      const el = document.getElementById('f-interest')
      if (el) el.value = e.detail
    }
    window.addEventListener('mg:interest', onInterest)
    return () => window.removeEventListener('mg:interest', onInterest)
  }, [])

  // Autofocus the name field on load so the browser's saved-details list is one step away.
  // Desktop only: on phones it would pop the keyboard over the hero before the visitor has read anything.
  const nameRef = useRef(null)
  useEffect(() => {
    if (window.matchMedia('(min-width: 768px) and (pointer: fine)').matches) {
      nameRef.current?.focus({ preventScroll: true })
    }
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    const f = e.currentTarget
    const get = (n) => String(f.elements[n]?.value ?? '').trim()
    const data = {
      name: get('name'),
      mobile: get('mobile'),
      state: get('state'),
      email: get('email'),
      interest: get('interest'),
      budget: get('budget'),
      timeline: get('timeline'),
      consent: f.elements.consent.checked,
    }
    const msg = validate(data)
    if (msg) {
      setError(msg)
      return
    }
    setError('')
    // Hook for wiring up a CRM / API endpoint.
    await onSubmit?.({ ...data, mobile: toMobile10(data.mobile) })
    setFirstName(data.name.split(' ')[0])
  }

  return (
    <section
      id="enquire"
      aria-labelledby="form-title"
      className="min-w-0 flex-[0_1_560px] scroll-mt-3 bg-cream px-6 pt-8 pb-8 shadow-[0_18px_50px_-20px_rgba(0,0,0,0.6)] text-ink sm:px-14 sm:pt-14 sm:pb-10"
    >
      {firstName === null ? (
        <>
          <Eyebrow className="mb-3 sm:mb-[18px]">Your next chapter starts here</Eyebrow>
          <h2 id="form-title" className="m-0 font-serif text-[28px] leading-[1.12] sm:leading-[1.08] font-light tracking-[-0.01em] sm:text-[46px]">
            Make room for something <span className="text-stone">beautiful.</span>
          </h2>
          <p className="mt-2.5 mb-7 text-sm leading-relaxed sm:mt-[18px] sm:mb-8 sm:text-base text-stone">
            Tell us a little about the space you have in mind.
          </p>

          <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-6 sm:gap-[26px]">
            <div className="flex flex-col">
              <Label htmlFor="f-name" required>Your name</Label>
              <input ref={nameRef} id="f-name" name="name" type="text" autoComplete="name" required placeholder="Full name" className="field" />
            </div>

            <div className="flex flex-wrap gap-x-5 gap-y-6 sm:gap-x-8 sm:gap-y-[26px]">
              <div className="flex min-w-0 flex-[1_1_130px] flex-col sm:flex-[1_1_200px]">
                <Label htmlFor="f-mobile" required>Mobile number</Label>
                <input
                  id="f-mobile"
                  name="mobile"
                  type="tel"
                  inputMode="tel"
                  autoComplete="tel"
                  onBlur={(e) => {
                    const m = toMobile10(e.target.value)
                    if (m.length === 10) e.target.value = m
                  }}
                  required
                  placeholder="10-digit number"
                  className="field"
                />
              </div>
              <SelectField id="f-state" name="state" label="Your state" required compact placeholder="Select state" autoComplete="address-level1">
                <optgroup label="States">{options(states)}</optgroup>
                <optgroup label="Union Territories">{options(unionTerritories)}</optgroup>
              </SelectField>
            </div>

            <div className="flex flex-col">
              <Label htmlFor="f-email" required>Email address</Label>
              <input id="f-email" name="email" type="email" autoComplete="email" required placeholder="you@example.com" className="field" />
            </div>

            <div className="flex flex-wrap gap-x-5 gap-y-6 sm:gap-x-8 sm:gap-y-[26px]">
              <SelectField id="f-interest" name="interest" label="I’m interested in" required compact placeholder="Select">
                {options(interests)}
              </SelectField>
              <SelectField id="f-budget" name="budget" label="Budget range" compact placeholder="Select…">
                {options(budgets)}
              </SelectField>
            </div>

            <div className="flex">
              <SelectField id="f-timeline" name="timeline" label="How soon do you need Magppie?" placeholder="Select timeline">
                {options(timelines)}
              </SelectField>
            </div>

            <label className="flex cursor-pointer items-start gap-2.5 text-xs leading-normal text-stone sm:gap-3 sm:text-sm">
              <input name="consent" type="checkbox" className="mt-px size-4 flex-none accent-ink sm:mt-0.5 sm:size-[18px]" />
              <span>
                I agree to be contacted about my enquiry and accept the{' '}
                <a href="https://magppie.com/privacy" className="text-ink underline">
                  privacy policy
                </a>
                .
              </span>
            </label>

            {error && (
              <p role="alert" className="-mt-2 text-sm text-error">
                {error}
              </p>
            )}

            <button
              type="submit"
              className="flex min-h-12 w-full cursor-pointer items-center justify-between border-0 bg-ink px-5 text-[15px] sm:min-h-16 sm:px-8 sm:text-[17px] font-medium text-cream transition-colors duration-200 hover:bg-black"
            >
              <span>Let’s discuss your space</span>
              <ArrowUpRight />
            </button>
            <p className="-mt-2 text-center text-xs text-stone sm:text-[13px]">
              We’ll use your details only to respond to your enquiry.
            </p>
          </form>
        </>
      ) : (
        <div role="status" className="flex flex-col gap-4 pt-4 pb-4 sm:gap-5 sm:pt-10 sm:pb-6">
          <Eyebrow>Enquiry received</Eyebrow>
          <h2 className="m-0 font-serif text-[28px] leading-[1.08] font-light sm:text-[46px]">Thank you, {firstName}.</h2>
          <p className="m-0 text-sm leading-relaxed text-stone sm:text-[17px]">
            A Magppie design consultant will call you shortly to plan your space. Meanwhile, you are welcome at any of our
            experience centres.
          </p>
          <a
            href="#stores"
            className="self-start border-b border-ink/30 pb-0.5 text-[15px] font-medium text-ink no-underline hover:border-ink"
          >
            Find your nearest experience centre →
          </a>
        </div>
      )}
    </section>
  )
}
