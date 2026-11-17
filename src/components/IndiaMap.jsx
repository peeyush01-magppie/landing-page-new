import { useId } from 'react'
import { DOTS, DOT_SPACING, MAP_HEIGHT, MAP_WIDTH, project } from '../data/indiaMap'

const pct = (v, total) => `${(v / total) * 100}%`

function Pin({ pin, x, y, active, onActivate }) {
  const labelSide = pin.side === 'left' ? 'right-full mr-1.5 items-end text-right sm:mr-2.5' : 'left-full ml-1.5 items-start sm:ml-2.5'

  return (
    <button
      type="button"
      aria-label={`Magppie studio, ${pin.area}, ${pin.city}`}
      aria-pressed={active}
      onMouseEnter={() => onActivate(pin.city)}
      onFocus={() => onActivate(pin.city)}
      onClick={() => onActivate(pin.city)}
      className={`group absolute -mt-3 -ml-3 size-6 cursor-pointer rounded-full border-0 bg-transparent p-0 focus-visible:outline-cream ${
        active ? 'z-20' : 'z-10'
      }`}
      style={{ left: pct(x, MAP_WIDTH), top: pct(y, MAP_HEIGHT) }}
    >
      {/* pulse ring */}
      <span aria-hidden="true" className="absolute inset-1 animate-pulse-ring rounded-full bg-gold/45" />
      {/* dot */}
      <span
        aria-hidden="true"
        className={`absolute rounded-full bg-gold shadow-[0_0_12px_rgba(217,165,91,0.85)] transition-all duration-300 ${
          active ? 'inset-[5px] ring-2 ring-cream/80' : 'inset-[7px]'
        }`}
      />
      {/* label */}
      <span
        aria-hidden="true"
        className={`pointer-events-none absolute top-1/2 flex -translate-y-1/2 flex-col whitespace-nowrap transition-all duration-300 ${labelSide} ${
          active ? 'bg-cream px-2 py-1.5 text-ink shadow-lg sm:px-3 sm:py-2' : 'bg-ink/85 px-1 py-0.5 text-cream/85 sm:px-1.5'
        }`}
      >
        <span
          className={`font-medium uppercase transition-all ${
            active ? 'text-[8px] tracking-[0.18em] text-stone sm:text-[10px] sm:tracking-[0.2em]' : 'text-[8.5px] tracking-[0.12em] sm:text-[11px] sm:tracking-[0.16em]'
          }`}
        >
          {pin.city}
        </span>
        {active && <span className="mt-0.5 font-serif text-[13px] leading-tight sm:text-lg">{pin.area}</span>}
      </span>
    </button>
  )
}

/**
 * Dotted map of India with interactive studio pins.
 * `activeCity` / `onActivate` let the parent sync the map with a store list.
 */
export default function IndiaMap({ pins, activeCity, onActivate }) {
  const gid = useId().replace(/:/g, '')
  const projected = pins.map((p) => ({ pin: p, xy: project(p.lon, p.lat) }))
  const active = projected.find((p) => p.pin.city === activeCity)
  const r = DOT_SPACING * 0.28

  return (
    <div className="relative mx-auto w-full max-w-[560px]" style={{ aspectRatio: `${MAP_WIDTH} / ${MAP_HEIGHT}` }}>
      <svg
        viewBox={`0 0 ${MAP_WIDTH} ${MAP_HEIGHT}`}
        className="absolute inset-0 size-full overflow-visible"
        role="img"
        aria-label="Map of India showing Magppie experience centres"
      >
        <defs>
          <radialGradient id={`${gid}-ambient`} cx="50%" cy="50%" r="50%">
            <stop offset="0" stopColor="#F4F1EA" stopOpacity="0.06" />
            <stop offset="1" stopColor="#F4F1EA" stopOpacity="0" />
          </radialGradient>
          <radialGradient id={`${gid}-glow`}>
            <stop offset="0" stopColor="#D9A55B" stopOpacity="0.35" />
            <stop offset="1" stopColor="#D9A55B" stopOpacity="0" />
          </radialGradient>
        </defs>

        <rect width={MAP_WIDTH} height={MAP_HEIGHT} fill={`url(#${gid}-ambient)`} />

        {active && (
          <circle
            cx={active.xy[0]}
            cy={active.xy[1]}
            r={DOT_SPACING * 6}
            fill={`url(#${gid}-glow)`}
            className="transition-all duration-500"
          />
        )}

        <g fill="#F4F1EA" fillOpacity="0.3">
          {DOTS.map(([x, y], i) => (
            <circle key={i} cx={x} cy={y} r={r} />
          ))}
        </g>
      </svg>

      <div role="group" aria-label="Magppie studios on the map" className="absolute inset-0">
        {projected.map(({ pin, xy: [x, y] }) => (
          <Pin key={pin.city} pin={pin} x={x} y={y} active={pin.city === activeCity} onActivate={onActivate} />
        ))}
      </div>
    </div>
  )
}
