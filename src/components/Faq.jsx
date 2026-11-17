import { useId, useState } from 'react'
import { faqs } from '../data/content'
import { CapsButton, Eyebrow, SectionHeading } from './ui'

function PlusIcon({ open }) {
  return (
    <span
      aria-hidden="true"
      className={`relative inline-flex size-7 flex-none sm:mt-1 sm:size-9 items-center justify-center border transition-colors duration-300 ${
        open ? 'border-ink bg-ink text-cream' : 'border-ink/25 text-ink group-hover:border-ink'
      }`}
    >
      <span className="absolute h-px w-3 bg-current sm:w-3.5" />
      <span
        className={`absolute h-3 w-px bg-current transition-transform sm:h-3.5 duration-300 ${open ? 'scale-y-0' : 'scale-y-100'}`}
      />
    </span>
  )
}

function FaqItem({ index, q, a, open, onToggle }) {
  const id = useId()
  const num = String(index + 1).padStart(2, '0')

  return (
    <div className="border-b border-ink/15">
      <h3 className="m-0">
        <button
          type="button"
          id={`${id}-q`}
          aria-expanded={open}
          aria-controls={`${id}-a`}
          onClick={onToggle}
          className="group flex w-full cursor-pointer items-start gap-3 border-0 bg-transparent py-3.5 text-left text-ink [-webkit-tap-highlight-color:transparent] sm:gap-8 sm:py-7"
        >
          <span className="mt-[5px] w-5 flex-none text-[10px] font-medium tracking-[0.14em] text-stone sm:mt-2 sm:w-6 sm:text-xs sm:tracking-[0.16em]">{num}</span>
          <span className="flex-1 font-serif text-base leading-[1.3] font-light sm:text-[24px] sm:leading-[1.25]">{q}</span>
          <PlusIcon open={open} />
        </button>
      </h3>
      <div
        id={`${id}-a`}
        role="region"
        aria-labelledby={`${id}-q`}
        aria-hidden={!open}
        className={`grid transition-[grid-template-rows] duration-500 ease-out ${open ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}
      >
        <div className="overflow-hidden">
          <div className="flex max-w-[640px] flex-col gap-2.5 pr-1 pb-4 pl-8 text-[13px] leading-relaxed text-stone sm:pr-14 sm:pb-7 sm:pl-14 sm:text-base">
            {a.map((p) => (
              <p key={p} className="m-0">
                {p}
              </p>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

/** FAQPage structured data so answers can appear in Google results. */
const jsonLd = JSON.stringify({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map(({ q, a }) => ({
    '@type': 'Question',
    name: q,
    acceptedAnswer: { '@type': 'Answer', text: a.join(' ') },
  })),
})

export default function Faq() {
  const [openIndex, setOpenIndex] = useState(() => (typeof window !== 'undefined' && window.innerWidth < 768 ? -1 : 0))

  return (
    <section id="faq" aria-labelledby="faq-title" className="bg-cream">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd }} />
      <div className="mx-auto grid max-w-[1320px] grid-cols-1 gap-y-5 sm:gap-y-10 px-4 py-12 sm:px-10 sm:py-28 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:grid-rows-[auto_1fr] lg:gap-x-20 lg:gap-y-0 lg:py-32">
        <div className="flex flex-col gap-2.5 sm:gap-5 lg:col-start-1 lg:row-start-1">
          <div>
            <Eyebrow className="mb-2.5 sm:mb-5">Questions, answered</Eyebrow>
            <SectionHeading id="faq-title">Before you begin.</SectionHeading>
          </div>
          <p className="m-0 max-w-[380px] text-sm leading-relaxed text-stone sm:text-base">
            Pricing, materials, guarantees and timelines: the things our clients most often ask before they plan their
            space.
          </p>
        </div>

        <div className="border-t border-ink/15 lg:col-start-2 lg:row-span-2 lg:row-start-1">
          {faqs.map((f, i) => (
            <FaqItem
              key={f.q}
              index={i}
              {...f}
              open={openIndex === i}
              onToggle={() => setOpenIndex(openIndex === i ? -1 : i)}
            />
          ))}
        </div>

        <div className="flex flex-col gap-2.5 bg-sand/60 p-4 sm:gap-4 sm:p-8 lg:col-start-1 lg:row-start-2 lg:mt-12 lg:max-w-[400px] lg:self-start lg:bg-transparent lg:p-0 lg:pt-7 lg:[border-top:1px_solid_rgb(27_27_27/0.15)]">
          <p className="m-0 font-serif text-lg leading-tight font-light sm:text-2xl">Still have a question?</p>
          <p className="m-0 text-[13px] leading-relaxed text-stone sm:text-[15px]">
            A Magppie design consultant will walk you through it, with no obligation.
          </p>
          <CapsButton variant="dark" className="mt-1 justify-between self-stretch sm:mt-0 sm:self-start sm:justify-start">
            Talk to a consultant <span aria-hidden="true">↗</span>
          </CapsButton>
        </div>
      </div>
    </section>
  )
}
