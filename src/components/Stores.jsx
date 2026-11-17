import { useRef, useState } from 'react'
import { mapPins, stores } from '../data/content'
import IndiaMap from './IndiaMap'
import { CapsButton } from './ui'

const isPhone = () => window.matchMedia('(max-width: 767px)').matches

function StoreCard({ store, active, onSelect, cardRef }) {
  return (
    <div
      ref={cardRef}
      onMouseEnter={() => onSelect(store.city, { fromHover: true })}
      className={`flex w-[230px] flex-none snap-start flex-col gap-1.5 border p-3.5 transition-colors duration-300 md:w-auto md:gap-2.5 md:border-0 md:border-t md:p-0 md:pt-[18px] ${
        active ? 'border-gold bg-cream/[0.04] md:bg-transparent' : 'border-cream/15'
      }`}
    >
      {/* Tapping the name/address shows the studio on the map */}
      <button
        type="button"
        onClick={() => onSelect(store.city)}
        aria-pressed={active}
        className="flex cursor-pointer flex-col gap-1.5 border-0 bg-transparent p-0 text-left text-cream md:gap-2.5"
      >
        <span className="text-[11px] font-medium tracking-[0.14em] uppercase md:text-[13px] md:tracking-[0.16em]">
          {store.city} <span className="text-cream/55">· {store.area}</span>
        </span>
        <span className="text-[13px] leading-[1.5] text-cream/60 md:text-sm md:leading-[1.55]">{store.address}</span>
      </button>
      <a
        href={store.map}
        target="_blank"
        rel="noopener"
        className="mt-auto inline-flex min-h-9 items-center self-start text-[11px] tracking-[0.06em] text-gold no-underline transition-colors hover:text-cream md:min-h-0 md:text-xs md:text-cream/70"
      >
        Get directions ↗
      </a>
    </div>
  )
}

export default function Stores() {
  const [activeCity, setActiveCity] = useState('New Delhi')
  const mapRef = useRef(null)
  const rowRef = useRef(null)
  const cardRefs = useRef({})

  /** Card tapped: highlight the pin and (on phones) bring the map into view. */
  const selectFromCard = (city, { fromHover } = {}) => {
    setActiveCity(city)
    if (!fromHover && isPhone()) mapRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' })
  }

  /** Pin tapped: highlight it and slide the matching card into view in the row. */
  const selectFromMap = (city) => {
    setActiveCity(city)
    const card = cardRefs.current[city]
    const row = rowRef.current
    if (card && row && row.scrollWidth > row.clientWidth) {
      row.scrollTo({ left: card.offsetLeft - row.offsetLeft - 16, behavior: 'smooth' })
    }
  }

  return (
    <section
      id="stores"
      aria-labelledby="stores-title"
      className="overflow-hidden bg-ink text-cream"
    >
      {/* Hairline divider: Clients and Stores share one continuous dark band */}
      <div aria-hidden="true" className="mx-auto max-w-[1320px] px-4 sm:px-10">
        <div className="border-t border-cream/15" />
      </div>
      <div className="mx-auto flex max-w-[1320px] flex-wrap items-center gap-x-20 gap-y-5 px-4 py-12 sm:gap-y-16 sm:px-10 sm:py-28">
        <div className="flex w-full flex-col gap-2 md:hidden">
          <p className="m-0 text-[10px] font-medium tracking-[0.2em] text-cream/70 uppercase">Experience centres</p>
          <p className="m-0 font-serif text-[26px] leading-[1.1] font-light">Eight studios. Seven cities.</p>
          <p className="m-0 text-[13px] text-cream/65">Mon–Sat, 10 am – 7 pm, by appointment. Tap a studio to find it.</p>
        </div>

        <div ref={mapRef} className="mx-auto w-full max-w-[290px] min-w-0 scroll-mt-4 px-4 md:max-w-none md:flex-[1_1_440px] md:px-6">
          <IndiaMap pins={mapPins} activeCity={activeCity} onActivate={selectFromMap} />
        </div>

        <div className="flex w-full min-w-0 flex-col gap-4 md:w-auto md:flex-[1_1_480px] md:gap-10">
          <div className="hidden flex-col gap-3.5 md:flex">
            <p className="m-0 text-xs font-medium tracking-label text-cream/70 uppercase">Experience centres</p>
            <h2 id="stores-title" className="m-0 font-serif text-4xl leading-[1.1] font-light">
              Eight studios. Seven cities.
            </h2>
            <p className="m-0 text-[15px] text-cream/65">Monday to Saturday, 10 am – 7 pm, by appointment.</p>
          </div>

          {/* Swipeable row on phones, two-column grid on desktop */}
          <div
            ref={rowRef}
            className="relative -mx-4 flex snap-x snap-mandatory scroll-px-4 gap-2.5 overflow-x-auto px-4 [scrollbar-width:none] sm:-mx-10 sm:scroll-px-10 sm:px-10 md:mx-0 md:grid md:grid-cols-[repeat(auto-fill,minmax(220px,1fr))] md:gap-x-12 md:gap-y-9 md:overflow-visible md:px-0 [&::-webkit-scrollbar]:hidden"
          >
            {stores.map((s) => (
              <StoreCard
                key={s.address}
                store={s}
                active={s.city === activeCity}
                onSelect={selectFromCard}
                cardRef={(el) => {
                  if (el && !cardRefs.current[s.city]) cardRefs.current[s.city] = el
                }}
              />
            ))}
          </div>

          <CapsButton className="self-stretch justify-between sm:self-end sm:justify-start">
            Book a studio visit <span aria-hidden="true">↗</span>
          </CapsButton>
        </div>
      </div>
    </section>
  )
}
