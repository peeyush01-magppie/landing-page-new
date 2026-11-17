import logo from '../assets/images/logo.svg'

const explore = [
  ['Wellness Kitchens', 'https://magppie.com/kitchens'],
  ['Wellness Wardrobes', 'https://magppie.com/wardrobes'],
  ['Wellness Vanities', 'https://magppie.com/vanities'],
  ['The Wellness Movement', 'https://magppie.com/about'],
  ['Gallery', 'https://magppie.com/gallery'],
]

const social = [
  ['Instagram', 'https://www.instagram.com/magppie_wellness/'],
  ['Facebook', 'https://www.facebook.com/magppiewellnesshomes/'],
  ['YouTube', 'https://www.youtube.com/@MAGPPIEWELLNESSHOMES/featured'],
]

const linkCls = 'text-cream no-underline transition-colors hover:text-white'

function ColumnTitle({ children }) {
  return <p className="mb-1 text-[10px] font-medium tracking-[0.2em] text-cream/60 uppercase sm:mb-2 sm:text-[11px] sm:tracking-[0.22em]">{children}</p>
}

export default function Footer() {
  return (
    <footer className="bg-ink text-cream">
      <div className="mx-auto max-w-[1320px] px-4 pt-12 pb-24 sm:px-10 sm:pt-28 md:pb-10">
        <div className="flex flex-wrap justify-between gap-x-6 gap-y-8 sm:gap-x-20 sm:gap-y-14">
          <div className="flex min-w-0 flex-[1_1_420px] flex-col gap-3.5 sm:gap-6">
            <img src={logo} alt="Magppie" className="h-6 w-auto self-start sm:h-8" />
            <p className="mt-1 font-serif text-2xl leading-[1.1] sm:mt-2 sm:text-[40px] font-light">For People and Planet.</p>
            <p className="m-0 max-w-[420px] text-[13px] leading-relaxed text-cream/70 sm:text-[15px]">
              The world’s first Wellness Kitchen, Wellness Wardrobe and Wellness Vanity brand. Built entirely in
              patented antibacterial Silverstone™.
            </p>
          </div>

          <nav aria-label="Explore" className="flex flex-[1_1_140px] flex-col gap-2.5 text-[13px] sm:flex-[0_1_200px] sm:text-[15px] sm:gap-3.5">
            <ColumnTitle>Explore</ColumnTitle>
            {explore.map(([label, href]) => (
              <a key={href} href={href} className={linkCls}>
                {label}
              </a>
            ))}
          </nav>

          <nav aria-label="Social media" className="flex flex-[1_1_100px] flex-col gap-2.5 text-[13px] sm:flex-[0_1_160px] sm:text-[15px] sm:gap-3.5">
            <ColumnTitle>Follow</ColumnTitle>
            {social.map(([label, href]) => (
              <a key={href} href={href} className={linkCls} target="_blank" rel="noopener">
                {label}
              </a>
            ))}
          </nav>

          <div className="flex flex-[1_1_100%] flex-col gap-2.5 text-[13px] leading-relaxed sm:text-[15px] sm:flex-[0_1_240px] sm:gap-3.5">
            <ColumnTitle>Headquarters</ColumnTitle>
            <p className="m-0 text-cream/85">
              Magppie Silverstone Pvt. Ltd.
              <br />
              352, Sultanpur, MG Road
              <br />
              New Delhi 110030
            </p>
            <p className="m-0 text-cream/70">Mon–Sat · 10:00–19:00 IST</p>
          </div>
        </div>

        <div className="mt-8 flex flex-wrap justify-between gap-x-8 gap-y-3 border-t border-cream/20 pt-5 text-[11px] sm:mt-24 sm:gap-y-4 sm:pt-7 sm:text-[13px] text-cream/65">
          <span>© {new Date().getFullYear()} Magppie Silverstone Pvt. Ltd. All rights reserved.</span>
          <div className="flex gap-7">
            <a href="https://magppie.com/legal" className={linkCls}>Legal</a>
            <a href="https://magppie.com/privacy" className={linkCls}>Privacy</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
