import { collections } from '../data/content'
import { SectionIntro } from './ui'

/** Scrolls to the enquiry form and pre-selects the matching interest. */
const selectInterest = (interest) => () => window.dispatchEvent(new CustomEvent('mg:interest', { detail: interest }))

function CollectionCard({ img, alt, eyebrow, title, body, specs, cta, interest }) {
  return (
    <a
      href="#enquire"
      onClick={selectInterest(interest)}
      className="group relative block aspect-[3/4] w-[68vw] max-w-[280px] lg:aspect-[4/5.4] flex-none snap-start overflow-hidden bg-sand-dark text-cream no-underline md:w-auto md:max-w-none"
    >
      <img
        src={img}
        alt={alt}
        loading="lazy"
        className="absolute inset-0 size-full object-cover transition-transform duration-[900ms] ease-out group-hover:scale-105"
      />
      {/* Legibility gradients */}
      <div aria-hidden="true" className="absolute inset-x-0 top-0 h-20 bg-gradient-to-b sm:h-28 from-black/45 to-transparent" />
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/55 via-50% to-transparent to-80% transition-opacity duration-500 group-hover:opacity-95"
      />

      <p className="absolute top-4 left-4 m-0 text-[10px] font-medium tracking-[0.18em] sm:top-7 sm:left-7 sm:text-[11px] sm:tracking-label text-cream/85 uppercase sm:top-7 sm:left-7">
        {eyebrow}
      </p>

      <div className="absolute inset-x-0 bottom-0 flex flex-col gap-3 p-4 sm:gap-4 sm:p-7">
        <h3 className="m-0 font-serif [text-shadow:0_1px_18px_rgba(0,0,0,0.35)] text-[20px] leading-[1.15] font-light sm:text-[28px] sm:leading-[1.1] lg:text-[32px]">{title}</h3>

        {/* Supporting line: revealed on hover (pointer devices only) */}
        <div className="grid grid-rows-[0fr] transition-[grid-template-rows] duration-500 ease-out group-hover:grid-rows-[1fr] group-focus-visible:grid-rows-[1fr]">
          <p className="m-0 overflow-hidden text-sm leading-relaxed text-cream/80 sm:text-[15px]">{body}</p>
        </div>

        <ul className="m-0 flex list-none flex-wrap gap-1.5 p-0 sm:gap-2">
          {specs.map(([k], i) => (
            <li
              key={k}
              className={`border border-cream/35 px-2 py-0.5 text-[10px] tracking-[0.06em] text-cream/90 sm:px-2.5 sm:py-1 sm:text-[11px] sm:tracking-[0.08em] ${i > 0 ? 'max-sm:hidden' : ''}`}
            >
              {k}
            </li>
          ))}
        </ul>

        <span className="flex items-center justify-between border-t border-cream/25 pt-2.5 text-[13px] font-medium sm:mt-1 sm:pt-4 sm:text-[15px]">
          {cta}
          <span
            aria-hidden="true"
            className="inline-flex size-7 items-center justify-center border text-xs sm:size-9 sm:text-base border-cream/40 transition-colors duration-300 group-hover:border-cream group-hover:bg-cream group-hover:text-ink"
          >
            ↗
          </span>
        </span>
      </div>
    </a>
  )
}

export default function Collections() {
  return (
    <section aria-labelledby="collections-title" className="bg-sand">
      <div className="mx-auto max-w-[1320px] px-5 py-16 sm:px-10 sm:py-32">
        <div className="mb-8 sm:mb-16">
          <SectionIntro
            id="collections-title"
            eyebrow="The collections"
            title="One stone. Every room."
            copy="Every piece is built entirely in Silverstone™, with a 25-year unconditional guarantee."
          />
        </div>

        {/* Swipeable row on phones, three-up grid from tablet */}
        <div className="-mx-5 flex snap-x snap-mandatory scroll-px-5 gap-3 overflow-x-auto px-5 sm:gap-4 [scrollbar-width:none] sm:-mx-10 sm:scroll-px-10 sm:px-10 md:mx-0 md:grid md:grid-cols-3 md:gap-6 md:overflow-visible md:px-0 md:pb-0 [&::-webkit-scrollbar]:hidden">
          {collections.map((c) => (
            <CollectionCard key={c.eyebrow} {...c} />
          ))}
        </div>
      </div>
    </section>
  )
}
