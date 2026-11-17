/** Small shared building blocks used across sections. */

export function Eyebrow({ children, light = false, className = '' }) {
  return (
    <p
      className={`m-0 text-[10px] font-medium tracking-[0.2em] uppercase sm:text-xs sm:tracking-label ${
        light ? 'text-cream/70' : 'text-stone'
      } ${className}`}
    >
      {children}
    </p>
  )
}

export function SectionHeading({ id, children, className = '' }) {
  return (
    <h2
      id={id}
      className={`m-0 font-serif text-[26px] leading-[1.1] font-light sm:text-[clamp(36px,4vw,56px)] sm:leading-[1.08] ${className}`}
    >
      {children}
    </h2>
  )
}

/** Eyebrow + heading on the left, supporting copy on the right. */
export function SectionIntro({ id, eyebrow, title, copy, light = false, copyWidth = 'basis-[380px]' }) {
  return (
    <div className="flex flex-wrap items-end justify-between gap-x-20 gap-y-3 sm:gap-y-8">
      <div className="min-w-0 flex-[1_1_520px]">
        <Eyebrow light={light} className="mb-2.5 sm:mb-5">
          {eyebrow}
        </Eyebrow>
        <SectionHeading id={id}>{title}</SectionHeading>
      </div>
      {copy && (
        <p
          className={`m-0 shrink grow-0 ${copyWidth} text-sm leading-relaxed sm:text-base ${
            light ? 'text-cream/75' : 'text-stone'
          }`}
        >
          {copy}
        </p>
      )}
    </div>
  )
}

/** Edge-to-edge horizontal scroller used for card rows on phones. */
export function SwipeRow({ className = '', children, ...rest }) {
  return (
    <div
      className={`-mx-4 flex snap-x snap-mandatory scroll-px-4 gap-3 overflow-x-auto px-4 [scrollbar-width:none] sm:-mx-10 sm:scroll-px-10 sm:px-10 [&::-webkit-scrollbar]:hidden ${className}`}
      {...rest}
    >
      {children}
    </div>
  )
}

const buttonVariants = {
  light: 'bg-cream text-ink hover:bg-black hover:text-cream',
  dark: 'bg-ink text-cream hover:bg-black hover:text-cream',
}

/** Uppercase tracked button (anchor). */
export function CapsButton({ href = '#enquire', variant = 'light', className = '', children }) {
  return (
    <a
      href={href}
      className={`inline-flex min-h-11 items-center gap-5 px-5 text-[11px] font-medium tracking-[0.16em] uppercase no-underline transition-colors duration-200 sm:min-h-[52px] sm:px-6 sm:text-xs sm:tracking-button ${buttonVariants[variant]} ${className}`}
    >
      {children}
    </a>
  )
}

export function ChevronDown() {
  return (
    <svg
      aria-hidden="true"
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.4"
      className="pointer-events-none absolute top-1/2 right-1 -translate-y-1/2 text-ink"
    >
      <path d="M3 6l5 5 5-5" />
    </svg>
  )
}

export function ArrowUpRight({ size = 18 }) {
  return (
    <svg aria-hidden="true" width={size} height={size} viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M4 14L14 4M6 4h8v8" />
    </svg>
  )
}
