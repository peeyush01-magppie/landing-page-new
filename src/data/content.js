import awardKbis from '../assets/images/award-kbis.webp'
import awardRedDot from '../assets/images/award-reddot.webp'
import awardIdea from '../assets/images/award-idea.webp'
import awardIf from '../assets/images/award-if.webp'
import awardElle from '../assets/images/award-elle.webp'
import kitchen from '../assets/images/kitchen.webp'
import wardrobe from '../assets/images/wardrobe.webp'
import vanity from '../assets/images/vanity.webp'

export const heroStats = [
  { value: '25 yrs', label: 'Unconditional guarantee' },
  { value: 'Zero', label: 'Formaldehyde' },
  { value: '4.8 ★', label: '500+ Google reviews' },
]

export const awards = [
  { img: awardKbis, alt: 'NKBA KBIS 2026 winner', maxH: 'max-h-[88px]', title: 'KBIS 2026', meta: 'Most Unexpected Innovation · Orlando' },
  { img: awardRedDot, alt: 'Red Dot Design Award', maxH: 'max-h-16', title: 'Red Dot Design Award', meta: 'Germany · 2026, Best of the Best 2010' },
  { img: awardIdea, alt: 'Idea Award USA', maxH: 'max-h-14', title: 'Idea Award', meta: 'USA · 2026' },
  { img: awardIf, alt: 'iF Design Award', maxH: 'max-h-16', title: 'iF Design Award', meta: 'International Forum · 2010' },
  { img: awardElle, alt: 'Elle Decor design award', maxH: 'max-h-[72px]', title: 'Elle Deco Design Award', meta: 'International award' },
]

export const clients = [
  { name: 'Mukesh Ambani', role: 'Reliance' },
  { name: 'Anant Ambani', role: 'Reliance' },
  { name: 'M S Dhoni', role: 'Cricket legend' },
  { name: 'Shilpa Shetty', role: 'Actor' },
  { name: 'Nitin Gadkari', role: 'Union Minister' },
  { name: 'Kamal Nath', role: 'Statesman' },
  { name: 'Akhil Akkineni', role: 'Actor' },
  { name: 'Peyush Bansal', role: 'Lenskart' },
  { name: 'Rizwan Sajan', role: 'Danube Group' },
  { name: 'Ritesh Malik', role: 'Innov8' },
  { name: 'Rushi Ajmera', role: 'Ajmera Realty' },
]

const mapUrl = (address) =>
  'https://www.google.com/maps/search/?api=1&query=' + encodeURIComponent('Magppie ' + address)

/**
 * Experience centres. `map` overrides the generated Google Maps search link
 * with an exact pin where one has been supplied.
 */
export const stores = [
  { city: 'New Delhi', area: 'Sultanpur', address: 'Plot 352, Sultanpur, Mehrauli-Gurgaon Road, New Delhi 110030' },
  { city: 'New Delhi', area: 'Kirti Nagar', address: '12/1, WHS, Block A, Kirti Nagar Industrial Area, New Delhi 110015' },
  { city: 'Mumbai', area: 'Lower Parel', address: 'One Lodha Place, 1615B, Senapati Bapat Marg, Mumbai, Maharashtra 400013' },
  {
    city: 'Bengaluru',
    area: 'Indiranagar',
    address: '1154, 12th A Main Rd, HAL 2nd Stage, Indiranagar, Bengaluru, Karnataka 560038',
    map: 'https://maps.app.goo.gl/cVNzeP2gqPXBiL2L9',
  },
  { city: 'Hyderabad', area: 'Jubilee Hills', address: '1057-O, Golden Square, 118-2-293/82/A, Road No. 45, Jubilee Hills, Hyderabad, Telangana 500033' },
  { city: 'Mohali', area: 'Sector 82, JLPL', address: 'SCO No. 66, Airport Road, Sector 82 JLPL, Mohali, Punjab 140308' },
  {
    city: 'Surat',
    area: 'Vesu',
    address: 'Solaris Cube, Vesu, Maharana Pratap Road, Surat, Gujarat 395007',
    map: 'https://maps.app.goo.gl/TAEHxxyvWKYrpm8EA',
  },
].map((s) => ({ ...s, map: s.map ?? mapUrl(s.address) }))

/**
 * One map pin per city. `city` must match the `city` field in `stores`.
 * `lon`/`lat` are real coordinates; `side` is where the city label sits.
 */
export const mapPins = [
  { city: 'Mohali', area: 'Sector 82, JLPL', lon: 76.73, lat: 30.66, side: 'left' },
  { city: 'New Delhi', area: 'Sultanpur & Kirti Nagar', lon: 77.15, lat: 28.58, side: 'right' },
  { city: 'Surat', area: 'Vesu', lon: 72.77, lat: 21.14, side: 'left' },
  { city: 'Mumbai', area: 'Lower Parel', lon: 72.83, lat: 19.0, side: 'left' },
  { city: 'Hyderabad', area: 'Jubilee Hills', lon: 78.41, lat: 17.43, side: 'right' },
  { city: 'Bengaluru', area: 'Indiranagar', lon: 77.64, lat: 12.98, side: 'right' },
]

export const collections = [
  {
    img: kitchen,
    alt: 'Magppie Wellness Kitchen in Silverstone',
    eyebrow: '01 · Wellness Kitchens',
    title: 'A kitchen that cares for those who cook in it.',
    body: 'Fireproof, stain-proof, scratch-resistant stone, built for daily Indian open-flame cooking.',
    specs: [
      ['Up to 62% more storage', 'Deeper, taller cabinets'],
      ['80 kg per drawer', 'No sagging, ever'],
    ],
    cta: 'Plan my kitchen',
    interest: 'Kitchens',
  },
  {
    img: wardrobe,
    alt: 'Magppie Wellness Wardrobe',
    eyebrow: '02 · Wellness Wardrobes',
    title: 'Breathe easy where you dress.',
    body: 'Inert stone in place of engineered wood, so nothing off-gasses into the air you sleep in.',
    specs: [
      ['Zero formaldehyde', 'ASTM E-2180 certified'],
      ['Termite-proof', 'No cellulose to chew'],
    ],
    cta: 'Plan my wardrobe',
    interest: 'Wardrobes',
  },
  {
    img: vanity,
    alt: 'Magppie Wellness Vanity in onyx and gold',
    eyebrow: '03 · Wellness Vanities',
    title: 'Made for water. Unmoved by it.',
    body: 'Non-porous Silverstone™ that will not swell, warp or grow mould, however wet it gets.',
    specs: [
      ['Zero absorption', 'BS EN 12390 tested'],
      ['Mould-proof', 'Nothing to feed on'],
    ],
    cta: 'Plan my vanity',
    interest: 'Vanities',
  },
]

export const states = [
  'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh', 'Goa', 'Gujarat', 'Haryana',
  'Himachal Pradesh', 'Jharkhand', 'Karnataka', 'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Manipur',
  'Meghalaya', 'Mizoram', 'Nagaland', 'Odisha', 'Punjab', 'Rajasthan', 'Sikkim', 'Tamil Nadu', 'Telangana',
  'Tripura', 'Uttar Pradesh', 'Uttarakhand', 'West Bengal',
]

export const unionTerritories = [
  'Andaman and Nicobar Islands', 'Chandigarh', 'Dadra and Nagar Haveli and Daman and Diu', 'Delhi',
  'Jammu and Kashmir', 'Ladakh', 'Lakshadweep', 'Puducherry',
]

export const interests = ['Kitchens', 'Wardrobes', 'Vanities', 'The complete home']
export const budgets = ['₹11–15 lakh', '₹15–25 lakh', '₹25–30 lakh', 'Above ₹30 lakh']
export const timelines = ['Within a month', '1–3 months', '3–6 months', 'After 6 months']

/**
 * FAQs — selected from the approved Magppie FAQ list (answers use approved wording only;
 * do not add prices, timelines or guarantees that are not in that list).
 */
export const faqs = [
  {
    q: 'How much does a Magppie kitchen cost?',
    a: [
      'Our kitchens are priced per square foot of cabinet area, which brings greater clarity and fairness to the pricing.',
      'For a 100-square-foot kitchen, our Wellness First range starts from approximately ₹6 lakh, while our Wellness Pro range goes up to approximately ₹12 lakh. Here, 100 square feet means the sum of the width and height of all the kitchen cabinets, not the floor area of the kitchen.',
    ],
  },
  {
    q: 'What is included in the price?',
    a: [
      'The quoted price includes the Silverstone cabinets and doors, along with seven basic accessories: cutlery tray, dish rack, dustbin, detergent holder, corner unit, bottle pull-out and pantry unit.',
      'GST, transportation and handling, installation, countertop, wall cladding, sink, faucet and kitchen appliances are additional. If you prefer, Magppie can also provide the countertop and wall cladding as part of a complete kitchen solution.',
    ],
  },
  {
    q: 'What exactly is Silverstone™? Is it granite, marble or quartz?',
    a: [
      'None of these. Silverstone is our own patented material: a specially sanitised porcelain stone made from natural materials and fired with silver and copper nano-materials at around 1,260°C.',
      'The silver and copper are inside the material, not a coating on the surface, so they cannot wear off. It is scratch-resistant, stain-resistant and 100% food-grade. We do not use wood, laminate or fabric in our kitchens, and our hardware is made from industrial-grade steel.',
    ],
  },
  {
    q: 'What does the guarantee cover?',
    a: [
      'Our guarantee against manufacturing defects is 5 years for Wellness First and 25 years for Wellness Pro. Against termites, bacteria and fungus, every kitchen is guaranteed for 25 years.',
      'Wellness First includes one complimentary service and Wellness Pro includes five. After that, we continue to provide paid services.',
    ],
  },
  {
    q: 'How long does it take, from design to installation?',
    a: [
      'You can expect the first quotation and rough design within five days, and the design is generally finalised within 10 days. Manufacturing takes approximately 75 to 90 days (around 60 days can sometimes be possible for urgent requirements), and a typical installation takes about one week.',
    ],
  },
  {
    q: 'Can I see the kitchens before I decide?',
    a: [
      'Absolutely. You can see our display kitchens and samples at our experience centres in Delhi, Mumbai, Bangalore, Hyderabad, Surat and Mohali, and we encourage every client to personally examine and test the material before ordering.',
      'Wherever we have an executed project in your city, a site visit can also be arranged, subject to the homeowner’s permission.',
    ],
  },
]
