import { clients } from '../data/content'
import { SectionIntro } from './ui'

/**
 * Client photos are picked up automatically from src/assets/clients/.
 * Name each file after the client, e.g. "M S Dhoni" -> ms-dhoni.webp
 * (jpg, jpeg, png, webp and avif all work). Missing photos fall back to a placeholder.
 */
const photoFiles = import.meta.glob('../assets/clients/*.{jpg,jpeg,png,webp,avif}', {
  eager: true,
  import: 'default',
})
const photos = Object.fromEntries(
  Object.entries(photoFiles).map(([path, url]) => [path.split('/').pop().replace(/\.\w+$/, '').toLowerCase(), url]),
)
const slugify = (name) =>
  name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
const photoFor = (name) => photos[slugify(name)] ?? photos[slugify(name).replace(/-/g, '')]

function Placeholder({ name }) {
  return (
    <div className="flex size-full flex-col items-center justify-center gap-3 text-cream/55">
      <svg aria-hidden="true" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
        <rect x="3" y="5" width="18" height="14" rx="1" />
        <circle cx="9" cy="10" r="1.6" />
        <path d="M3 17l5-5 4 4 3-3 6 6" />
      </svg>
      <span className="text-[11px] tracking-button uppercase">Photo · {name}</span>
    </div>
  )
}

function ClientCard({ name, role, hidden }) {
  const photo = photoFor(name)
  return (
    <figure aria-hidden={hidden || undefined} className="m-0 mr-3 flex w-[128px] flex-none flex-col gap-3 sm:mr-6 sm:w-[280px] sm:gap-[18px]">
      <div className="h-[166px] w-[128px] overflow-hidden sm:h-[360px] sm:w-[280px] border border-cream/12 bg-charcoal">
        {photo ? (
          <img
            src={photo}
            alt={hidden ? '' : name}
            loading="lazy"
            className="size-full object-cover object-[50%_15%] grayscale-[30%] transition duration-500 hover:scale-[1.03] hover:grayscale-0"
          />
        ) : (
          <Placeholder name={name} />
        )}
      </div>
      <figcaption className="flex flex-col gap-1 sm:gap-1.5">
        <span className="font-serif text-[15px] leading-[1.15] sm:text-[26px] font-light">{name}</span>
        <span className="text-[10px] font-medium tracking-[0.16em] text-cream/65 uppercase sm:text-[11px] sm:tracking-[0.2em]">{role}</span>
      </figcaption>
    </figure>
  )
}

export default function Clients() {
  return (
    <section aria-labelledby="clients-title" className="bg-ink text-cream">
      <div className="mx-auto max-w-[1320px] px-5 pt-16 pb-8 sm:px-10 sm:py-32">
        <SectionIntro
          light
          id="clients-title"
          eyebrow="In the finest homes"
          title="Trusted by those who inspire."
          copyWidth="basis-[400px]"
          copy="From Mumbai towers to Delhi farmhouses, Magppie is the quiet signature in the homes of people who build the culture we live in."
        />
      </div>

      <div
        role="region"
        aria-label="Magppie clients, scrolling"
        className="group overflow-hidden pb-16 sm:pb-28 motion-reduce:overflow-x-auto"
      >
        {/* Two copies of the list so the -50% translate loops seamlessly */}
        <div className="flex w-max animate-marquee group-hover:[animation-play-state:paused]">
          {clients.map((c) => (
            <ClientCard key={c.name} {...c} />
          ))}
          {clients.map((c) => (
            <ClientCard key={`dup-${c.name}`} {...c} hidden />
          ))}
        </div>
        <p className="mx-auto mt-8 max-w-[1320px] px-5 text-[11px] tracking-[0.2em] sm:mt-14 sm:text-[13px] text-cream/65 uppercase sm:px-10">
          &amp; many more families across India and the world
        </p>
      </div>
    </section>
  )
}
