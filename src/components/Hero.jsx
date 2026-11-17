import heroImg from '../assets/images/hero.webp'
import logo from '../assets/images/logo.svg'
import { heroStats } from '../data/content'
import EnquiryForm from './EnquiryForm'

export default function Hero({ onEnquiry }) {
  return (
    <header className="relative w-full overflow-hidden bg-ink">
      <img
        src={heroImg}
        alt="A Magppie Silverstone wellness kitchen"
        className="absolute inset-0 size-full object-cover object-center"
        fetchPriority="high"
      />
      <div aria-hidden="true" className="absolute inset-0 bg-[rgba(20,19,17,0.55)]" />

      <div className="relative mx-auto flex max-w-[1320px] items-center justify-between gap-4 px-4 pt-4 sm:gap-6 sm:px-10 sm:pt-8">
        <a href="https://magppie.com/" aria-label="Magppie home" className="block leading-none">
          <img src={logo} alt="Magppie" className="h-[22px] w-auto sm:h-7 lg:h-[34px]" />
        </a>
        <a
          href="#enquire"
          className="inline-flex min-h-9 items-center bg-cream px-3.5 text-[10px] font-medium tracking-[0.14em] text-ink uppercase no-underline transition-colors duration-200 hover:bg-black hover:text-cream sm:min-h-11 sm:px-[22px] sm:text-xs sm:tracking-button"
        >
          Book a consultation
        </a>
      </div>

      <div className="relative mx-auto flex max-w-[1320px] flex-wrap items-start justify-between gap-6 px-4 pt-7 pb-4 sm:gap-x-16 sm:gap-y-10 sm:px-10 sm:pt-12 sm:pb-20">
        <div className="min-w-0 flex-[1_1_440px] text-cream lg:pt-14">
          <p className="mb-2.5 text-[10px] font-medium tracking-[0.18em] text-cream/80 uppercase sm:mb-7 sm:text-xs sm:tracking-label">
            KBIS 2026 · Most Unexpected Innovation
          </p>
          <h1 className="m-0 font-serif text-[34px] leading-[1.05] font-light tracking-[-0.01em] sm:text-[clamp(44px,5.4vw,76px)] sm:leading-[1.04]">
            The world’s first
            <br />
            Wellness Kitchen.
          </h1>
          <p className="mt-3 max-w-[460px] text-sm leading-relaxed font-light text-cream/85 sm:mt-7 sm:text-lg">
            Kitchens, wardrobes and vanities built entirely in patented, antibacterial Silverstone™. No wood. No
            formaldehyde. Nothing to decay.
          </p>
          <div className="mt-4 grid max-w-[560px] grid-cols-3 gap-3 border-t border-cream/25 pt-3.5 sm:mt-14 sm:flex sm:flex-wrap sm:gap-10 sm:pt-7">
            {heroStats.map((s) => (
              <div key={s.label} className="flex flex-col gap-1 sm:gap-1.5">
                <span className="font-serif text-[22px] leading-none sm:text-[34px]">{s.value}</span>
                <span className="text-[9px] leading-snug tracking-[0.12em] text-cream/75 uppercase sm:text-[11px] sm:tracking-button">
                  {s.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        <EnquiryForm onSubmit={onEnquiry} />
      </div>
    </header>
  )
}
