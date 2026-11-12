import { useState, useEffect, useRef } from 'react'
import {
  Sparkles,
  Phone,
  Star,
  CalendarCheck,
  ShieldCheck,
  Clock,
  CheckCircle2,
  ArrowRight,
  Menu,
  X,
  MapPin,
  Stethoscope,
  Smile,
  Layers,
  Scan,
  Zap,
  HeartPulse,
  Award,
  GraduationCap,
  Mail,
  User,
  Siren,
  BadgeCheck,
  ChevronDown,
} from 'lucide-react'

/* ----------------------------- MOCK DATA ----------------------------- */

const CLINIC = {
  name: 'Lumina Dental Studio',
  phone: '(555) 234-5678',
  phoneHref: 'tel:+15552345678',
  address: ['1280 Meridian Avenue, Suite 200', 'Riverside Heights, CA 92501'],
  hours: [
    { day: 'Monday – Friday', time: '8:00 AM – 6:00 PM' },
    { day: 'Saturday', time: '9:00 AM – 2:00 PM' },
    { day: 'Sunday', time: 'Emergency care only' },
  ],
}

// Your Formspree endpoint. A form-specific URL looks like https://formspree.io/f/xxxxxxxx
const FORMSPREE_ENDPOINT = 'https://formspree.io/f/mqpqkybg'

const NAV_LINKS = [
  { label: 'Treatments', href: '#treatments' },
  { label: 'Smile Gallery', href: '#gallery' },
  { label: 'Our Doctors', href: '#doctors' },
  { label: 'Patient Reviews', href: '#reviews' },
]

const TREATMENTS = [
  {
    id: 'general',
    tab: 'General & Preventive',
    icon: Stethoscope,
    title: 'General & Preventive Care',
    summary:
      'Gentle exams, digital X-rays and professional cleanings that catch small problems early, so you spend less time in the chair and less money over the years.',
    time: '45–60 minutes',
    benefits: [
      'Low-radiation 3D digital imaging',
      'Thorough cleaning with a personalised home-care plan',
      'Early detection of cavities, gum disease and oral cancer',
      'Fluoride and sealant options for children and adults',
    ],
  },
  {
    id: 'cosmetic',
    tab: 'Cosmetic Dentistry',
    icon: Sparkles,
    title: 'Cosmetic Dentistry',
    summary:
      'Porcelain veneers, bonding and professional whitening, designed on screen first so you can preview your new smile before we begin.',
    time: '1–3 visits',
    benefits: [
      'Digital smile preview before any treatment',
      'Custom-shaded porcelain that matches your natural teeth',
      'Minimal-prep techniques that protect healthy enamel',
      'Results designed to look natural, not overdone',
    ],
  },
  {
    id: 'implants',
    tab: 'Dental Implants',
    icon: Layers,
    title: 'Dental Implants',
    summary:
      'A permanent replacement for missing teeth that looks, feels and functions like your own. Planned with 3D scans for accurate, comfortable placement.',
    time: '2–4 visits over 3–6 months',
    benefits: [
      'Guided placement for precision and faster healing',
      'Preserves jawbone and prevents facial sagging',
      'Sedation options for a relaxed experience',
      'Long-lasting results with proper care',
    ],
  },
  {
    id: 'invisalign',
    tab: 'Invisalign®',
    icon: Smile,
    title: 'Invisalign® Clear Aligners',
    summary:
      'Straighten your teeth with nearly invisible, removable aligners. A 3D scan replaces messy impressions and shows your projected results.',
    time: '6–18 months, check-ins every 6–8 weeks',
    benefits: [
      'Digital scan with a preview of your final alignment',
      'Removable for eating, brushing and special occasions',
      'No metal brackets or wires',
      'Flexible payment plans available',
    ],
  },
]

const CASES = [
  {
    id: 1,
    treatment: 'Porcelain Veneers',
    duration: '3 weeks · 2 visits',
    patient: 'Patient A, early 30s',
    concern: 'Chipped, uneven front teeth and long-standing discolouration.',
    outcome:
      'Eight veneers restored a balanced, bright smile that still looks natural in close-up photos.',
    before: {
      label: 'Before',
      shade: 'from-amber-100 to-amber-200',
      note: 'Uneven edges, yellow tint',
    },
    after: {
      label: 'After',
      shade: 'from-white to-sky-50',
      note: 'Even contour, natural brightness',
    },
  },
  {
    id: 2,
    treatment: 'Invisalign®',
    duration: '11 months',
    patient: 'Patient B, late 20s',
    concern: 'Crowded lower teeth and a mild overbite.',
    outcome:
      'Teeth aligned with 22 clear aligners, no one at work noticed, and the bite now closes comfortably.',
    before: {
      label: 'Before',
      shade: 'from-stone-200 to-stone-300',
      note: 'Crowding, overlapping teeth',
    },
    after: {
      label: 'After',
      shade: 'from-white to-teal-50',
      note: 'Aligned arch, comfortable bite',
    },
  },
  {
    id: 3,
    treatment: 'Single-Tooth Implant',
    duration: '4 months',
    patient: 'Patient C, mid 50s',
    concern: 'Missing molar causing difficulty chewing on one side.',
    outcome:
      'A guided implant and porcelain crown restored full chewing function and blends with neighbouring teeth.',
    before: {
      label: 'Before',
      shade: 'from-slate-200 to-slate-300',
      note: 'Gap, shifting neighbours',
    },
    after: {
      label: 'After',
      shade: 'from-white to-slate-50',
      note: 'Restored tooth, stable bite',
    },
  },
]

const TECH = [
  {
    icon: Scan,
    title: '3D Digital Scanners',
    text: 'Detailed scans in minutes with no gooey impressions, and a preview of your results.',
  },
  {
    icon: Zap,
    title: 'Laser Dentistry',
    text: 'Gentler gum treatments and cavity care with less drilling, less bleeding and faster healing.',
  },
  {
    icon: HeartPulse,
    title: 'Pain-Free Sedation',
    text: 'Nitrous oxide and oral sedation options for patients who feel anxious about dental visits.',
  },
]

const REVIEWS = [
  {
    name: 'Maria T.',
    text: 'I used to dread the dentist. The team explained every step, and I honestly felt nothing.',
    tag: 'Implant patient',
  },
  {
    name: 'Daniel R.',
    text: 'Booked on Monday, seen on Tuesday for a cracked tooth. Calm, quick and fairly priced.',
    tag: 'Emergency visit',
  },
  {
    name: 'Priya S.',
    text: 'The 3D preview of my Invisalign results sold me. Eleven months later it matches almost exactly.',
    tag: 'Invisalign patient',
  },
]

const INSURANCE = [
  'Delta Dental',
  'Cigna',
  'Aetna',
  'MetLife',
  'Guardian',
  'Blue Cross',
]

const SERVICE_OPTIONS = [
  'General Check-up & Cleaning',
  'Cosmetic Dentistry',
  'Dental Implants',
  'Invisalign® Consultation',
  'Emergency Dental Care',
]

const SERVICE_BY_TAB = {
  general: SERVICE_OPTIONS[0],
  cosmetic: SERVICE_OPTIONS[1],
  implants: SERVICE_OPTIONS[2],
  invisalign: SERVICE_OPTIONS[3],
}

/* ----------------------------- SHARED UI ----------------------------- */

const focusRing =
  'focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-600 focus-visible:ring-offset-2'

function CtaButton({ children, onClick, className = '', icon = true }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`group inline-flex items-center justify-center gap-2 rounded-2xl bg-amber-500 px-6 py-3.5 text-base font-semibold text-slate-900 shadow-lg shadow-amber-500/25 transition duration-200 hover:-translate-y-0.5 hover:bg-amber-400 hover:shadow-xl active:translate-y-0 ${focusRing} ${className}`}
    >
      {children}
      {icon && (
        <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
      )}
    </button>
  )
}

function Stars({ count = 5 }) {
  return (
    <div className="flex gap-0.5" aria-label={`${count} out of 5 stars`}>
      {Array.from({ length: count }).map((_, i) => (
        <Star key={i} className="h-4 w-4 fill-amber-400 text-amber-400" />
      ))}
    </div>
  )
}

/* ----------------------------- NAVBAR ----------------------------- */

function Navbar({ onBook }) {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={`sticky top-0 z-40 border-b backdrop-blur-xl transition-all duration-300 ${
        scrolled
          ? 'border-slate-200/80 bg-white/80 shadow-sm'
          : 'border-transparent bg-white/60'
      }`}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <a
          href="#top"
          className={`flex items-center gap-2.5 rounded-xl ${focusRing}`}
        >
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-teal-600 text-white shadow-md shadow-teal-600/30">
            <Sparkles className="h-5 w-5" />
          </span>
          <span className="font-serif text-lg font-semibold tracking-tight text-slate-900">
            Lumina{' '}
            <span className="hidden text-slate-500 sm:inline">
              Dental Studio
            </span>
          </span>
        </a>

        <nav className="hidden items-center gap-1 lg:flex" aria-label="Primary">
          {NAV_LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className={`rounded-xl px-3.5 py-2 text-sm font-medium text-slate-600 transition-colors duration-200 hover:bg-slate-100 hover:text-slate-900 ${focusRing}`}
            >
              {l.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2 sm:gap-3">
          <a
            href={CLINIC.phoneHref}
            className={`hidden items-center gap-2 rounded-full border border-teal-200 bg-teal-50 px-4 py-2 text-sm font-semibold text-teal-800 transition-colors duration-200 hover:bg-teal-100 md:inline-flex ${focusRing}`}
          >
            <Phone className="h-4 w-4" />
            {CLINIC.phone}
          </a>
          <CtaButton
            onClick={() => onBook()}
            icon={false}
            className="!px-4 !py-2.5 text-sm"
          >
            <span className="hidden sm:inline">Book Appointment</span>
            <span className="sm:hidden">Book</span>
          </CtaButton>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-label="Toggle menu"
            className={`rounded-xl p-2 text-slate-700 transition-colors hover:bg-slate-100 lg:hidden ${focusRing}`}
          >
            {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      <div
        className={`grid overflow-hidden transition-all duration-300 lg:hidden ${
          open
            ? 'grid-rows-[1fr] border-t border-slate-200 bg-white/95'
            : 'grid-rows-[0fr]'
        }`}
      >
        <div className="min-h-0">
          <nav className="flex flex-col gap-1 px-4 py-3" aria-label="Mobile">
            {NAV_LINKS.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="rounded-xl px-3 py-3 text-base font-medium text-slate-700 hover:bg-slate-100"
              >
                {l.label}
              </a>
            ))}
            <a
              href={CLINIC.phoneHref}
              className="mt-1 flex items-center gap-2 rounded-xl bg-teal-50 px-3 py-3 font-semibold text-teal-800"
            >
              <Phone className="h-4 w-4" /> {CLINIC.phone}
            </a>
          </nav>
        </div>
      </div>
    </header>
  )
}

/* ----------------------------- HERO ----------------------------- */

function Hero({ onBook }) {
  const slots = ['Tomorrow, 9:30 AM', 'Tomorrow, 2:00 PM', 'Friday, 11:15 AM']
  const [slot, setSlot] = useState(0)

  return (
    <section id="top" className="relative overflow-hidden bg-[#F8FAFC]">
      <div className="pointer-events-none absolute -right-32 -top-32 h-[28rem] w-[28rem] rounded-full bg-teal-200/40 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-40 -left-24 h-[24rem] w-[24rem] rounded-full bg-sky-200/40 blur-3xl" />

      <div className="relative mx-auto grid max-w-7xl items-center gap-14 px-4 py-16 sm:px-6 sm:py-20 lg:grid-cols-2 lg:gap-12 lg:px-8 lg:py-28">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 shadow-sm">
            <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
            4.9/5 Rating from 450+ Local Patients
          </div>

          <h1 className="mt-6 font-serif text-4xl font-semibold leading-[1.1] tracking-tight text-slate-900 sm:text-5xl lg:text-[3.5rem]">
            Modern Dentistry Designed Around Your Comfort and Confidence.
          </h1>

          <p className="mt-6 max-w-xl text-lg leading-relaxed text-slate-600">
            Experience pain-free, precision dental care using the latest 3D
            digital technology—from routine cleanings to complete smile
            makeovers.
          </p>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <CtaButton onClick={() => onBook()}>Schedule Your Visit</CtaButton>
            <a
              href="#treatments"
              className={`inline-flex items-center justify-center rounded-2xl border border-slate-300 bg-white px-6 py-3.5 text-base font-semibold text-slate-800 transition duration-200 hover:-translate-y-0.5 hover:border-teal-600 hover:text-teal-700 hover:shadow-md ${focusRing}`}
            >
              Explore Treatments
            </a>
          </div>

          <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-sm text-slate-600">
            {[
              'No-obligation first consultation',
              'Transparent pricing',
              'Evening slots available',
            ].map((t) => (
              <li key={t} className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-teal-600" /> {t}
              </li>
            ))}
          </ul>
        </div>

        {/* Floating appointment card */}
        <div className="relative mx-auto w-full max-w-md lg:max-w-none lg:pl-8">
          <div className="absolute -left-2 top-10 z-10 hidden items-center gap-3 rounded-2xl border border-slate-100 bg-white p-3 pr-5 shadow-xl sm:flex">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-rose-50 text-rose-500">
              <Siren className="h-5 w-5" />
            </span>
            <div>
              <p className="text-sm font-semibold text-slate-900">
                Same-Day Emergency Care
              </p>
              <p className="text-xs text-slate-500">Call before 3 PM</p>
            </div>
          </div>

          <div className="rounded-3xl border border-slate-100 bg-white p-6 shadow-2xl shadow-slate-900/10 sm:ml-10 sm:p-8">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-teal-600 text-white">
                  <CalendarCheck className="h-6 w-6" />
                </span>
                <div>
                  <p className="font-semibold text-slate-900">
                    Free Smile Assessment
                  </p>
                  <p className="text-sm text-slate-500">
                    30 min · 3D scan included
                  </p>
                </div>
              </div>
              <span className="rounded-full bg-teal-50 px-3 py-1 text-xs font-semibold text-teal-700">
                Open
              </span>
            </div>

            <p className="mt-6 text-sm font-medium text-slate-700">
              Next available times
            </p>
            <div className="mt-3 grid gap-2">
              {slots.map((s, i) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => setSlot(i)}
                  aria-pressed={slot === i}
                  className={`flex items-center justify-between rounded-2xl border px-4 py-3 text-left text-sm font-medium transition duration-200 ${focusRing} ${
                    slot === i
                      ? 'border-teal-600 bg-teal-50 text-teal-900'
                      : 'border-slate-200 text-slate-700 hover:border-slate-300 hover:bg-slate-50'
                  }`}
                >
                  <span className="flex items-center gap-2">
                    <Clock className="h-4 w-4" /> {s}
                  </span>
                  <span
                    className={`h-4 w-4 rounded-full border-2 transition ${
                      slot === i
                        ? 'border-teal-600 bg-teal-600 ring-2 ring-inset ring-white'
                        : 'border-slate-300'
                    }`}
                  />
                </button>
              ))}
            </div>

            <CtaButton
              onClick={() => onBook(SERVICE_OPTIONS[0])}
              className="mt-6 w-full"
            >
              Reserve This Time
            </CtaButton>

            <div className="mt-6 grid grid-cols-2 gap-3 border-t border-slate-100 pt-5">
              <div className="flex items-center gap-2 text-sm text-slate-700">
                <ShieldCheck className="h-5 w-5 text-teal-600" /> Insurance
                Accepted
              </div>
              <div className="flex items-center gap-2 text-sm text-slate-700">
                <BadgeCheck className="h-5 w-5 text-teal-600" /> Licensed &
                Insured
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ----------------------------- TREATMENTS ----------------------------- */

function Treatments({ onBook }) {
  const [active, setActive] = useState(TREATMENTS[0].id)
  const t = TREATMENTS.find((x) => x.id === active)
  const Icon = t.icon

  return (
    <section id="treatments" className="scroll-mt-16 bg-white py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <h2 className="font-serif text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
            Treatments for every stage of your smile
          </h2>
          <p className="mt-4 text-lg text-slate-600">
            Choose a treatment to see what is involved, how long it takes, and
            what you can expect.
          </p>
        </div>

        <div
          role="tablist"
          aria-label="Treatments"
          className="mt-10 flex gap-2 overflow-x-auto rounded-2xl bg-[#F8FAFC] p-1.5 [scrollbar-width:none] sm:inline-flex"
        >
          {TREATMENTS.map((x) => {
            const selected = x.id === active
            return (
              <button
                key={x.id}
                role="tab"
                id={`tab-${x.id}`}
                aria-selected={selected}
                aria-controls={`panel-${x.id}`}
                onClick={() => setActive(x.id)}
                className={`whitespace-nowrap rounded-xl px-4 py-2.5 text-sm font-semibold transition-all duration-200 ${focusRing} ${
                  selected
                    ? 'bg-white text-teal-700 shadow-md'
                    : 'text-slate-600 hover:bg-white/60 hover:text-slate-900'
                }`}
              >
                {x.tab}
              </button>
            )
          })}
        </div>

        {/* key forces remount so the entrance transition replays on every tab change */}
        <div
          key={t.id}
          role="tabpanel"
          id={`panel-${t.id}`}
          aria-labelledby={`tab-${t.id}`}
          className="mt-8 grid animate-[fadeIn_0.35s_ease-out] gap-8 rounded-3xl border border-slate-100 bg-[#F8FAFC] p-6 sm:p-10 lg:grid-cols-5"
        >
          <div className="lg:col-span-3">
            <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-teal-600 text-white shadow-md shadow-teal-600/25">
              <Icon className="h-6 w-6" />
            </span>
            <h3 className="mt-5 font-serif text-2xl font-semibold text-slate-900 sm:text-3xl">
              {t.title}
            </h3>
            <p className="mt-3 max-w-xl leading-relaxed text-slate-600">
              {t.summary}
            </p>

            <div className="mt-6 inline-flex items-center gap-3 rounded-2xl bg-white px-5 py-3 shadow-sm">
              <Clock className="h-5 w-5 text-teal-600" />
              <div>
                <p className="text-xs text-slate-500">
                  Estimated procedure time
                </p>
                <p className="text-sm font-semibold text-slate-900">{t.time}</p>
              </div>
            </div>

            <div className="mt-8">
              <CtaButton onClick={() => onBook(SERVICE_BY_TAB[t.id])}>
                Book Consultation for This Service
              </CtaButton>
            </div>
          </div>

          <div className="rounded-2xl bg-white p-6 shadow-sm lg:col-span-2">
            <p className="font-semibold text-slate-900">Key benefits</p>
            <ul className="mt-4 space-y-3">
              {t.benefits.map((b) => (
                <li key={b} className="flex gap-3 text-slate-700">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-teal-600" />
                  <span>{b}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      <style>{`@keyframes fadeIn{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:none}}
@media (prefers-reduced-motion: reduce){*{animation:none!important;transition:none!important}}`}</style>
    </section>
  )
}

/* ----------------------------- GALLERY ----------------------------- */

function CaseCard({ c, onBook }) {
  const [view, setView] = useState('after')
  const s = view === 'before' ? c.before : c.after

  return (
    <article className="flex flex-col overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl">
      <div
        className={`relative h-44 bg-gradient-to-br ${s.shade} transition-all duration-500`}
      >
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="flex gap-1.5" aria-hidden="true">
            {Array.from({ length: 6 }).map((_, i) => (
              <span
                key={i}
                className={`block h-14 w-7 rounded-b-xl rounded-t-md border border-black/5 shadow-sm transition-all duration-500 ${
                  view === 'before'
                    ? i % 2
                      ? 'translate-y-1 -rotate-3 bg-amber-50'
                      : '-translate-y-0.5 rotate-2 bg-yellow-100'
                    : 'bg-white'
                }`}
              />
            ))}
          </div>
        </div>
        <span className="absolute left-3 top-3 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-slate-700 shadow-sm">
          Sample case · illustrative
        </span>
        <span className="absolute bottom-3 left-3 rounded-full bg-slate-900/80 px-3 py-1 text-xs font-medium text-white">
          {s.note}
        </span>
      </div>

      <div className="flex flex-1 flex-col p-6">
        <div className="flex items-start justify-between gap-3">
          <h3 className="font-serif text-xl font-semibold text-slate-900">
            {c.treatment}
          </h3>
          <span className="shrink-0 rounded-full bg-teal-50 px-3 py-1 text-xs font-semibold text-teal-700">
            {c.duration}
          </span>
        </div>
        <p className="mt-1 text-sm text-slate-500">{c.patient}</p>
        <p className="mt-4 text-sm text-slate-700">
          <span className="font-semibold text-slate-900">Concern: </span>
          {c.concern}
        </p>
        <p className="mt-2 flex-1 text-sm text-slate-700">
          <span className="font-semibold text-slate-900">Outcome: </span>
          {c.outcome}
        </p>

        <div
          className="mt-5 grid grid-cols-2 gap-1 rounded-xl bg-slate-100 p-1"
          role="group"
          aria-label="Compare before and after"
        >
          {['before', 'after'].map((v) => (
            <button
              key={v}
              type="button"
              aria-pressed={view === v}
              onClick={() => setView(v)}
              className={`rounded-lg py-2 text-sm font-semibold capitalize transition-all duration-200 ${focusRing} ${
                view === v
                  ? 'bg-white text-teal-700 shadow'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {v}
            </button>
          ))}
        </div>

        <button
          type="button"
          onClick={() =>
            onBook(
              c.treatment.includes('Invisalign')
                ? SERVICE_OPTIONS[3]
                : c.treatment.includes('Implant')
                  ? SERVICE_OPTIONS[2]
                  : SERVICE_OPTIONS[1],
            )
          }
          className={`mt-4 inline-flex items-center gap-1.5 self-start rounded-lg text-sm font-semibold text-teal-700 transition-colors hover:text-teal-900 ${focusRing}`}
        >
          Ask about this treatment <ArrowRight className="h-4 w-4" />
        </button>
      </div>
    </article>
  )
}

function Gallery({ onBook }) {
  return (
    <section id="gallery" className="scroll-mt-16 bg-[#F8FAFC] py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <h2 className="font-serif text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
            Smile transformations
          </h2>
          <p className="mt-4 text-lg text-slate-600">
            Three examples of the results we plan for. Toggle between before and
            after on each card.
          </p>
          <p className="mt-3 inline-block rounded-xl bg-white px-4 py-2 text-sm text-slate-500 shadow-sm">
            Portfolio sample content: fictional patients and illustrative
            visuals. Real results vary.
          </p>
        </div>
        <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {CASES.map((c) => (
            <CaseCard key={c.id} c={c} onBook={onBook} />
          ))}
        </div>
      </div>
    </section>
  )
}

/* ----------------------------- DOCTOR & TECH ----------------------------- */

function Doctors() {
  return (
    <section id="doctors" className="scroll-mt-16 bg-white py-20 sm:py-24">
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:gap-16 lg:px-8">
        <div className="relative">
          <div className="aspect-[4/5] max-h-[30rem] w-full overflow-hidden rounded-3xl bg-gradient-to-br from-teal-600 via-teal-700 to-slate-900 shadow-2xl shadow-teal-900/20 sm:aspect-[5/4] lg:aspect-[4/5]">
            <div className="flex h-full flex-col items-center justify-center text-white">
              <span className="flex h-28 w-28 items-center justify-center rounded-full bg-white/15 ring-8 ring-white/10">
                <User className="h-14 w-14" />
              </span>
              <p className="mt-6 font-serif text-2xl font-semibold">
                Dr. Sarah Jenkins, DDS
              </p>
              <p className="mt-1 text-teal-100">Lead Dentist & Founder</p>
            </div>
          </div>
          <div className="absolute -bottom-5 right-4 rounded-2xl border border-slate-100 bg-white px-5 py-4 shadow-xl sm:-right-4">
            <p className="font-serif text-3xl font-semibold text-teal-700">
              15+
            </p>
            <p className="text-sm text-slate-600">
              years of clinical experience
            </p>
          </div>
        </div>

        <div>
          <h2 className="font-serif text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
            Meet your lead dentist
          </h2>
          <p className="mt-5 leading-relaxed text-slate-600">
            Dr. Sarah Jenkins founded Lumina to make dental care feel calm,
            clear and unhurried. She explains every option in plain language and
            never starts treatment until you are comfortable with the plan.
          </p>

          <ul className="mt-6 space-y-3 text-slate-700">
            <li className="flex gap-3">
              <GraduationCap className="mt-0.5 h-5 w-5 shrink-0 text-teal-600" />{' '}
              Doctor of Dental Surgery, University of California, San Francisco
            </li>
            <li className="flex gap-3">
              <Award className="mt-0.5 h-5 w-5 shrink-0 text-teal-600" />{' '}
              Advanced training in implantology and clear-aligner therapy
            </li>
            <li className="flex gap-3">
              <BadgeCheck className="mt-0.5 h-5 w-5 shrink-0 text-teal-600" />{' '}
              Member, American Dental Association and Academy of General
              Dentistry
            </li>
          </ul>

          <div className="mt-8 grid gap-4">
            {TECH.map(({ icon: I, title, text }) => (
              <div
                key={title}
                className="flex gap-4 rounded-2xl border border-slate-100 bg-[#F8FAFC] p-4 transition duration-200 hover:border-teal-200 hover:bg-white hover:shadow-md"
              >
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-teal-100 text-teal-700">
                  <I className="h-5 w-5" />
                </span>
                <div>
                  <p className="font-semibold text-slate-900">{title}</p>
                  <p className="mt-0.5 text-sm text-slate-600">{text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

/* ----------------------------- REVIEWS ----------------------------- */

function Reviews() {
  return (
    <section id="reviews" className="scroll-mt-16 bg-[#F8FAFC] py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="font-serif text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
          What patients say
        </h2>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {REVIEWS.map((r) => (
            <figure
              key={r.name}
              className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm"
            >
              <Stars />
              <blockquote className="mt-4 leading-relaxed text-slate-700">
                “{r.text}”
              </blockquote>
              <figcaption className="mt-5 text-sm">
                <span className="font-semibold text-slate-900">{r.name}</span>
                <span className="text-slate-500"> · {r.tag}</span>
              </figcaption>
            </figure>
          ))}
        </div>
        <p className="mt-6 text-sm text-slate-500">
          Sample testimonials shown for portfolio demonstration.
        </p>
      </div>
    </section>
  )
}

/* ----------------------------- BOOKING FORM ----------------------------- */

function Field({ label, id, error, children }) {
  return (
    <div>
      <label
        htmlFor={id}
        className="mb-1.5 block text-sm font-medium text-slate-800"
      >
        {label}
      </label>
      {children}
      {error && (
        <p className="mt-1.5 text-sm text-rose-600" role="alert">
          {error}
        </p>
      )}
    </div>
  )
}

const inputCls = (err) =>
  `w-full rounded-xl border bg-white px-4 py-3 text-slate-900 placeholder-slate-400 transition duration-200 focus:outline-none focus:ring-2 ${
    err
      ? 'border-rose-400 focus:ring-rose-300'
      : 'border-slate-300 focus:border-teal-600 focus:ring-teal-200'
  }`

function BookingForm({ idPrefix, defaultService, onDone }) {
  const [form, setForm] = useState({
    name: '',
    phone: '',
    email: '',
    service: defaultService || '',
    period: 'Morning',
  })
  const [errors, setErrors] = useState({})
  const [submitting, setSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState('')
  const [confirmation, setConfirmation] = useState(null)

  useEffect(() => {
    if (defaultService) setForm((f) => ({ ...f, service: defaultService }))
  }, [defaultService])

  const set = (k) => (e) => {
    setForm((f) => ({ ...f, [k]: e.target.value }))
    if (errors[k]) setErrors((x) => ({ ...x, [k]: undefined }))
  }

  const validate = () => {
    const e = {}
    if (form.name.trim().length < 2) e.name = 'Enter your full name.'
    if (form.phone.replace(/\D/g, '').length < 10)
      e.phone = 'Enter a 10-digit phone number.'
    if (!/^\S+@\S+\.\S+$/.test(form.email))
      e.email = 'Enter a valid email address.'
    if (!form.service) e.service = 'Choose a treatment type.'
    return e
  }

  const submit = async (ev) => {
    ev.preventDefault()
    if (submitting) return
    const e = validate()
    setErrors(e)
    setSubmitError('')
    if (Object.keys(e).length) return

    setSubmitting(true)
    try {
      const response = await fetch(FORMSPREE_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          name: form.name.trim(),
          phone: form.phone.trim(),
          email: form.email.trim(),
          service: form.service,
          preferredDay: form.period,
          _subject: `New appointment request: ${form.service}`,
        }),
      })

      if (response.ok) {
        setConfirmation(
          'LDS-' + Math.random().toString(36).slice(2, 8).toUpperCase(),
        )
      } else {
        let message =
          "We couldn't send your request. Please try again or call us."
        try {
          const data = await response.json()
          if (data?.errors?.length)
            message = data.errors.map((x) => x.message).join(' ')
        } catch {
          /* response had no JSON body; keep the default message */
        }
        setSubmitError(message)
      }
    } catch {
      setSubmitError(
        'Network error. Check your connection and try again, or call us at ' +
          CLINIC.phone +
          '.',
      )
    } finally {
      setSubmitting(false)
    }
  }

  if (confirmation) {
    return (
      <div
        className="animate-[fadeIn_0.35s_ease-out] text-center"
        role="status"
      >
        <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-teal-100 text-teal-700">
          <CheckCircle2 className="h-9 w-9" />
        </span>
        <h3 className="mt-5 font-serif text-2xl font-semibold text-slate-900">
          Request received
        </h3>
        <p className="mt-2 text-slate-600">
          Thank you, {form.name.trim().split(' ')[0]}. Our care team will call
          you within one business hour to confirm your time.
        </p>
        <dl className="mx-auto mt-6 max-w-sm space-y-2 rounded-2xl bg-[#F8FAFC] p-5 text-left text-sm">
          {[
            ['Reference', confirmation],
            ['Treatment', form.service],
            ['Preferred time', `${form.period} (we will confirm exact time)`],
            ['Phone', form.phone],
            ['Email', form.email],
          ].map(([k, v]) => (
            <div key={k} className="flex justify-between gap-4">
              <dt className="text-slate-500">{k}</dt>
              <dd className="break-words text-right font-medium text-slate-900">
                {v}
              </dd>
            </div>
          ))}
        </dl>
        <p className="mt-4 text-xs text-slate-500">
          Demo only: no data is sent anywhere.
        </p>
        <button
          type="button"
          onClick={onDone}
          className={`mt-6 rounded-2xl bg-slate-900 px-6 py-3 font-semibold text-white transition hover:bg-slate-700 ${focusRing}`}
        >
          Done
        </button>
      </div>
    )
  }

  return (
    <form onSubmit={submit} noValidate className="space-y-4">
      <Field label="Full name" id={`${idPrefix}-name`} error={errors.name}>
        <input
          id={`${idPrefix}-name`}
          name="name"
          value={form.name}
          onChange={set('name')}
          placeholder="Jane Doe"
          autoComplete="name"
          className={inputCls(errors.name)}
        />
      </Field>
      <div className="grid gap-4 sm:grid-cols-2">
        <Field
          label="Phone number"
          id={`${idPrefix}-phone`}
          error={errors.phone}
        >
          <input
            id={`${idPrefix}-phone`}
            name="phone"
            type="tel"
            value={form.phone}
            onChange={set('phone')}
            placeholder="(555) 000-0000"
            autoComplete="tel"
            className={inputCls(errors.phone)}
          />
        </Field>
        <Field label="Email" id={`${idPrefix}-email`} error={errors.email}>
          <input
            id={`${idPrefix}-email`}
            name="email"
            type="email"
            value={form.email}
            onChange={set('email')}
            placeholder="jane@email.com"
            autoComplete="email"
            className={inputCls(errors.email)}
          />
        </Field>
      </div>
      <Field
        label="Treatment type"
        id={`${idPrefix}-service`}
        error={errors.service}
      >
        <div className="relative">
          <select
            id={`${idPrefix}-service`}
            name="service"
            value={form.service}
            onChange={set('service')}
            className={`${inputCls(errors.service)} appearance-none pr-10`}
          >
            <option value="" disabled>
              Select a treatment
            </option>
            {SERVICE_OPTIONS.map((o) => (
              <option key={o}>{o}</option>
            ))}
          </select>
          <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
        </div>
      </Field>
      <fieldset>
        <legend className="mb-1.5 text-sm font-medium text-slate-800">
          Preferred day
        </legend>
        <div className="grid grid-cols-2 gap-3">
          {['Morning', 'Afternoon'].map((p) => (
            <label
              key={p}
              className={`cursor-pointer rounded-xl border px-4 py-3 text-center text-sm font-semibold transition duration-200 focus-within:ring-2 focus-within:ring-teal-600 ${
                form.period === p
                  ? 'border-teal-600 bg-teal-50 text-teal-800'
                  : 'border-slate-300 text-slate-700 hover:bg-slate-50'
              }`}
            >
              <input
                type="radio"
                name="preferredDay"
                value={p}
                checked={form.period === p}
                onChange={set('period')}
                className="sr-only"
              />
              {p}
            </label>
          ))}
        </div>
      </fieldset>
      {submitError && (
        <div
          role="alert"
          className="flex gap-3 rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-800"
        >
          <Siren className="mt-0.5 h-4 w-4 shrink-0" />
          <p>{submitError}</p>
        </div>
      )}
      <button
        type="submit"
        disabled={submitting}
        aria-busy={submitting}
        className={`flex w-full items-center justify-center gap-2 rounded-2xl bg-amber-500 px-6 py-4 text-base font-semibold text-slate-900 shadow-lg shadow-amber-500/25 transition duration-200 hover:bg-amber-400 disabled:cursor-wait disabled:opacity-70 ${focusRing}`}
      >
        {submitting ? (
          <>
            <span className="h-4 w-4 animate-spin rounded-full border-2 border-slate-900/30 border-t-slate-900" />
            Sending...
          </>
        ) : (
          'Request Appointment'
        )}
      </button>
      <p className="text-center text-xs text-slate-500">
        No payment needed. We will call to confirm your time.
      </p>
    </form>
  )
}

/* ----------------------------- MODAL ----------------------------- */

function BookingModal({ open, service, session, onClose }) {
  const [mounted, setMounted] = useState(false)
  const [shown, setShown] = useState(false)
  const panelRef = useRef(null)

  useEffect(() => {
    let t
    if (open) {
      setMounted(true)
      const r = requestAnimationFrame(() =>
        requestAnimationFrame(() => setShown(true)),
      )
      return () => cancelAnimationFrame(r)
    }
    setShown(false)
    t = setTimeout(() => setMounted(false), 250)
    return () => clearTimeout(t)
  }, [open])

  useEffect(() => {
    if (!open) return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const onKey = (e) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', onKey)
    panelRef.current?.focus()
    return () => {
      document.body.style.overflow = prev
      window.removeEventListener('keydown', onKey)
    }
  }, [open, onClose])

  if (!mounted) return null

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center p-0 sm:items-center sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div
        onClick={onClose}
        className={`absolute inset-0 bg-slate-900/50 backdrop-blur-sm transition-opacity duration-300 ${shown ? 'opacity-100' : 'opacity-0'}`}
      />
      <div
        ref={panelRef}
        tabIndex={-1}
        className={`relative max-h-[92vh] w-full max-w-lg overflow-y-auto rounded-t-3xl bg-white p-6 shadow-2xl transition-all duration-300 focus:outline-none sm:rounded-3xl sm:p-8 ${
          shown
            ? 'translate-y-0 scale-100 opacity-100'
            : 'translate-y-6 scale-95 opacity-0'
        }`}
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close booking form"
          className={`absolute right-4 top-4 rounded-xl p-2 text-slate-500 transition hover:bg-slate-100 hover:text-slate-900 ${focusRing}`}
        >
          <X className="h-5 w-5" />
        </button>
        <h2
          id="modal-title"
          className="pr-10 font-serif text-2xl font-semibold text-slate-900"
        >
          Book your appointment
        </h2>
        <p className="mb-6 mt-1 text-sm text-slate-600">
          Tell us a little about you and we will call to confirm.
        </p>
        <BookingForm
          key={session}
          idPrefix="modal"
          defaultService={service}
          onDone={onClose}
        />
      </div>
    </div>
  )
}

/* ----------------------------- INLINE BOOKING ----------------------------- */

function InlineBooking() {
  return (
    <section id="book" className="scroll-mt-16 bg-white py-20 sm:py-24">
      <div className="mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:gap-16 lg:px-8">
        <div className="self-center">
          <h2 className="font-serif text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
            Start with a free smile assessment
          </h2>
          <p className="mt-5 max-w-lg text-lg leading-relaxed text-slate-600">
            Share a few details and our care team will reach out within one
            business hour to find a time that suits you.
          </p>
          <ul className="mt-8 space-y-4">
            {[
              { i: Clock, t: 'Most new patients are seen within 48 hours' },
              {
                i: ShieldCheck,
                t: 'We verify your insurance before your visit',
              },
              { i: Siren, t: 'In pain? Call us for same-day emergency care' },
            ].map(({ i: I, t }) => (
              <li key={t} className="flex items-center gap-3 text-slate-700">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-teal-50 text-teal-700">
                  <I className="h-5 w-5" />
                </span>
                {t}
              </li>
            ))}
          </ul>
          <a
            href={CLINIC.phoneHref}
            className={`mt-8 inline-flex items-center gap-2 rounded-xl text-lg font-semibold text-teal-700 hover:text-teal-900 ${focusRing}`}
          >
            <Phone className="h-5 w-5" /> {CLINIC.phone}
          </a>
        </div>
        <div className="rounded-3xl border border-slate-100 bg-[#F8FAFC] p-6 shadow-xl shadow-slate-900/5 sm:p-8">
          <BookingForm idPrefix="inline" />
        </div>
      </div>
    </section>
  )
}

/* ----------------------------- FOOTER ----------------------------- */

function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-16 sm:grid-cols-2 sm:px-6 lg:grid-cols-4 lg:px-8">
        <div>
          <div className="flex items-center gap-2.5">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-teal-600 text-white">
              <Sparkles className="h-5 w-5" />
            </span>
            <span className="font-serif text-lg font-semibold text-white">
              {CLINIC.name}
            </span>
          </div>
          <p className="mt-4 text-sm leading-relaxed text-slate-400">
            Comfortable, precise and transparent dental care for the whole
            family.
          </p>
        </div>

        <div>
          <h3 className="font-semibold text-white">Visit us</h3>
          <address className="mt-4 space-y-3 text-sm not-italic">
            <p className="flex gap-2">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-teal-400" />
              <span>
                {CLINIC.address[0]}
                <br />
                {CLINIC.address[1]}
              </span>
            </p>
            <p>
              <a
                href={CLINIC.phoneHref}
                className="flex items-center gap-2 hover:text-white"
              >
                <Phone className="h-4 w-4 text-teal-400" /> {CLINIC.phone}
              </a>
            </p>
            <p>
              <a
                href="mailto:hello@luminadental.example"
                className="flex items-center gap-2 hover:text-white"
              >
                <Mail className="h-4 w-4 text-teal-400" />{' '}
                hello@luminadental.example
              </a>
            </p>
          </address>
        </div>

        <div>
          <h3 className="font-semibold text-white">Opening hours</h3>
          <ul className="mt-4 space-y-3 text-sm">
            {CLINIC.hours.map((h) => (
              <li key={h.day} className="flex justify-between gap-4">
                <span>{h.day}</span>
                <span className="text-right text-slate-400">{h.time}</span>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="font-semibold text-white">Quick links</h3>
          <ul className="mt-4 space-y-2 text-sm">
            {[...NAV_LINKS, { label: 'Book Appointment', href: '#book' }].map(
              (l) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    className="transition-colors hover:text-white"
                  >
                    {l.label}
                  </a>
                </li>
              ),
            )}
          </ul>
        </div>
      </div>

      <div className="border-t border-slate-800">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <p className="text-sm font-medium text-white">Insurance accepted</p>
          <div className="mt-3 flex flex-wrap gap-2">
            {INSURANCE.map((i) => (
              <span
                key={i}
                className="inline-flex items-center gap-1.5 rounded-full border border-slate-700 bg-slate-800 px-3 py-1.5 text-xs font-medium text-slate-200"
              >
                <ShieldCheck className="h-3.5 w-3.5 text-teal-400" /> {i}
              </span>
            ))}
          </div>
          <div className="mt-8 flex flex-col gap-2 border-t border-slate-800 pt-6 text-xs text-slate-500 sm:flex-row sm:justify-between">
            <p>© 2026 {CLINIC.name}. All rights reserved.</p>
            <p>
              Portfolio demo. Patients, reviews and results shown are fictional.
              Insurance names are illustrative.
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}

/* ----------------------------- APP ----------------------------- */

export default function App() {
  const [modal, setModal] = useState({ open: false, service: '', session: 0 })

  const openBooking = (service = '') =>
    setModal((m) => ({ open: true, service, session: m.session + 1 }))
  const closeBooking = () => setModal((m) => ({ ...m, open: false }))

  return (
    <div className="min-h-screen overflow-x-hidden bg-white font-sans text-slate-900 antialiased [scroll-behavior:smooth]">
      <Navbar onBook={openBooking} />
      <main>
        <Hero onBook={openBooking} />
        <Treatments onBook={openBooking} />
        <Gallery onBook={openBooking} />
        <Doctors />
        <Reviews />
        <InlineBooking />
      </main>
      <Footer />
      <BookingModal
        open={modal.open}
        service={modal.service}
        session={modal.session}
        onClose={closeBooking}
      />
    </div>
  )
}
