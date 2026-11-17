import Hero from './components/Hero'
import Awards from './components/Awards'
import Clients from './components/Clients'
import Stores from './components/Stores'
import Collections from './components/Collections'
import Faq from './components/Faq'
import Footer from './components/Footer'
import MobileCta from './components/MobileCta'

/**
 * Called with the validated enquiry form data.
 * Replace with a real API / CRM call (e.g. fetch('/api/enquiry', { method: 'POST', body: JSON.stringify(data) })).
 */
async function handleEnquiry(data) {
  console.info('Enquiry submitted', data)
}

export default function App() {
  return (
    <div className="w-full overflow-x-hidden bg-cream text-ink">
      <Hero onEnquiry={handleEnquiry} />
      <main>
        <Awards />
        <Clients />
        <Stores />
        <Collections />
        <Faq />
      </main>
      <Footer />
      <MobileCta />
    </div>
  )
}
