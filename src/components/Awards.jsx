import { awards } from '../data/content'
import { SectionIntro } from './ui'

export default function Awards() {
  return (
    <section aria-labelledby="awards-title" className="mx-auto max-w-[1320px] px-5 py-16 sm:px-10 sm:pt-32 sm:pb-30">
      <SectionIntro
        id="awards-title"
        eyebrow="Global recognition"
        title="Recognised by the world’s most prestigious design bodies."
        copy="From Red Dot in 2007 to the Most Unexpected Innovation award at KBIS 2026 in Orlando, judged alongside Caesarstone and LG."
      />

      {/* Swipeable row on phones, bordered grid from sm */}
      <div className="-mx-5 mt-8 flex snap-x snap-mandatory scroll-px-5 gap-3 overflow-x-auto px-5 [scrollbar-width:none] sm:mx-0 sm:mt-[72px] sm:grid sm:grid-cols-[repeat(auto-fit,minmax(200px,1fr))] sm:gap-0 sm:overflow-visible sm:border-t sm:border-l sm:border-ink/15 sm:px-0 [&::-webkit-scrollbar]:hidden">
        {awards.map((a) => (
          <div
            key={a.title}
            className="flex w-[156px] flex-none snap-start flex-col justify-between gap-5 border border-ink/15 p-4 transition-colors duration-200 hover:bg-sand-hover sm:w-auto sm:min-h-60 sm:gap-7 sm:border-0 sm:border-r sm:border-b sm:px-7 sm:pt-10 sm:pb-8"
          >
            <div className="flex h-11 items-center sm:h-[88px]">
              <img src={a.img} alt={a.alt} className={`${a.maxH} max-w-full object-contain max-sm:max-h-10`} loading="lazy" />
            </div>
            <div>
              <p className="m-0 font-serif text-[15px] leading-tight sm:text-[22px]">{a.title}</p>
              <p className="mt-1.5 text-xs leading-snug text-stone sm:mt-1.5 sm:text-[13px]">{a.meta}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
