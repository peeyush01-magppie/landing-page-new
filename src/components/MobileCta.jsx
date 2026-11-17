import { useEffect, useState } from 'react'
import { ArrowUpRight } from './ui'

/**
 * Phone-only booking bar pinned to the bottom of the screen.
 * Appears once the visitor scrolls past the enquiry form, and hides again
 * whenever the form is back in view.
 */
export default function MobileCta() {
  const [show, setShow] = useState(false)

  useEffect(() => {
    const form = document.getElementById('enquire')
    if (!form) return
    let frame = 0
    const update = () => {
      frame = 0
      const r = form.getBoundingClientRect()
      setShow(r.bottom < 0)
    }
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update)
    }
    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      cancelAnimationFrame(frame)
    }
  }, [])

  return (
    <div
      aria-hidden={!show}
      className={`fixed inset-x-0 bottom-0 z-50 border-t border-cream/15 bg-ink/95 px-4 pt-3 pb-[max(12px,env(safe-area-inset-bottom))] backdrop-blur transition-transform duration-300 md:hidden ${
        show ? 'translate-y-0' : 'translate-y-full'
      }`}
    >
      <a
        href="#enquire"
        tabIndex={show ? 0 : -1}
        className="flex min-h-12 items-center justify-between bg-cream px-5 text-[15px] font-medium text-ink no-underline"
      >
        Book a consultation
        <ArrowUpRight size={16} />
      </a>
    </div>
  )
}
