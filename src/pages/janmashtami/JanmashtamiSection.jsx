import { useRef, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import RegistrationForm from '../../components/RegistrationForm'
import VolunteerForm from '../volunteer/VolunteerForm'
import { ImageCard } from '../../components/ui'

export default function JanmashtamiSection() {
  const navigate = useNavigate()
  const heroRef = useRef(null)
  const [showEventDetails, setShowEventDetails] = useState(false)
  const [showDonation, setShowDonation] = useState(false)
  const [showVolunteer, setShowVolunteer] = useState(false)
  const [cardVisible, setCardVisible] = useState(false)
  const [showMobileVolunteer, setShowMobileVolunteer] = useState(false)


  // Scroll observer to trigger card entrance animation on scroll
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setCardVisible(true)
      }
    }
    window.addEventListener('scroll', handleScroll)
    // Run once on mount to set initial visibility state
    handleScroll()

    // Also support IntersectionObserver for clean viewport detection
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && window.scrollY > 30) {
          setCardVisible(true)
        }
      },
      { threshold: 0.2 }
    )
    if (heroRef.current) observer.observe(heroRef.current)

    return () => {
      window.removeEventListener('scroll', handleScroll)
      if (heroRef.current) observer.unobserve(heroRef.current)
    }
  }, [])

  // QR image is served from backend — UPI ID never appears in frontend code
  const [qrSrc] = useState('/api/donations/qr?amount=0&note=Donation+for+Janmashtami')

  return (
    <section id="janmashtami" className="scroll-mt-16">
      {/* HERO SECTION WITH UNIFIED BACKGROUND & TRANSPARENT SCROLL-ANIMATED CARD */}
      <div 
        ref={heroRef}
        className="relative overflow-hidden text-white min-h-[600px] md:min-h-[872px] flex items-end justify-end bg-cover bg-center janmashtami-hero-bg"
      >
        {/* Subtle vignette overlays */}
        <div className="absolute inset-0 bg-slate-950/10 pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-slate-950/80 to-transparent pointer-events-none"></div>

        {/* Desktop-only: Top-center title overlay on hero image */}
        <div className="hidden md:block absolute left-0 right-0 z-20 text-center pointer-events-none" style={{ top: '15px' }}>
          <h1 className="text-5xl lg:text-6xl font-extrabold leading-tight tracking-tight text-white drop-shadow-[0_3px_8px_rgba(0,0,0,0.85)]">
            Janmashtami
          </h1>
          <span className="block text-2xl lg:text-3xl font-bold text-amber-300 drop-shadow-[0_2px_6px_rgba(0,0,0,0.85)] mt-1">
            Celebration 2026
          </span>
        </div>

        {/* Desktop-only Volunteer Ribbon */}
        <button
          onClick={() => setShowVolunteer(true)}
          className="hidden md:flex fixed top-24 right-0 z-40 group flex items-center justify-center pl-7 pr-6 py-3.5 rounded-l-full border border-white/20 bg-slate-900/50 backdrop-blur-md shadow-lg ring-1 ring-white/10 cursor-pointer transition-all duration-300 hover:scale-105 hover:bg-slate-900/60"
        >
          <span className="text-white font-extrabold text-lg tracking-wide leading-tight drop-shadow">
            One-Day Volunteer
            <span className="block text-xs font-semibold text-amber-200 mt-0.5">Offer your seva this Janmashtami</span>
          </span>
        </button>

        {/* RIGHT-POSITIONED TRANSPARENT CARD (DIAGONAL SLIDE FROM NANDA'S HEART TO BOTTOM 10PX EDGE) */}
        <div className="hidden md:flex relative max-w-7xl mx-auto px-2 sm:px-4 md:px-6 pb-2.5 pt-12 w-full z-10 flex justify-end">
          <div 
            className={`w-full max-w-[414px] max-h-[420px] md:max-h-[322px] bg-slate-950/85 backdrop-blur-none md:bg-black/10 md:backdrop-blur-xs border-amber-300/25 md:border-amber-300/40 p-5 md:p-6 rounded-3xl shadow-2xl text-center relative overflow-hidden transition-all duration-1000 ease-out transform ${
              cardVisible 
                ? 'opacity-100 translate-x-0 translate-y-0 scale-100 shadow-[0_0_35px_rgba(251,191,36,0.3)]' 
                : 'opacity-0 translate-x-28 -translate-y-64 scale-75 pointer-events-none'
            }`}
          >
            {/* Glowing golden accent line */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-400 via-yellow-200 to-amber-500"></div>

            <div className="inline-block bg-amber-500/10 border border-amber-400/20 px-4 py-1 rounded-full mb-2 shadow-sm">
              <p className="font-bold tracking-widest uppercase text-xs text-amber-300 drop-shadow-[0_1px_2px_rgba(0,0,0,0.9)]">
                Hare Krishna Hare Krishna
              </p>
            </div>


            <p className="text-xs sm:text-sm text-amber-100 mb-1 font-bold drop-shadow-[0_1px_3px_rgba(0,0,0,0.9)]">
              ISKCON KR Puram, Bangalore
            </p>

            <p className="text-sm sm:text-base text-white mb-5 leading-snug font-semibold drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)]">
              Join us for a blissful festival with <strong>kirtan, mahabhishekam & feast</strong>!
            </p>

            {/* BUTTONS IN A SINGLE LINE WITH CUSTOM TYPOGRAPHY */}
            <div className="flex flex-row gap-2.5 justify-center items-center">
              <a
                href="#register"
                className="font-bold px-5 py-2.5 rounded-full shadow-xl transition-all duration-300 hover:scale-105 text-center text-slate-950 flex items-center justify-center gap-1"
                style={{ background: 'linear-gradient(90deg, #fbbf24, #f59e0b)' }}
              >
                <span className="text-xs sm:text-sm font-medium">Register</span>
                <span className="text-sm sm:text-base font-extrabold">Now</span>
              </a>
              <a
                href="#event-schedule"
                className="bg-black/30 hover:bg-black/50 font-bold px-5 py-2.5 rounded-full border border-white/40 backdrop-blur-sm transition-all duration-300 hover:scale-105 cursor-pointer shadow-md text-center flex items-center justify-center gap-1"
              >
                <span className="text-[18px] sm:text-[20px] font-extrabold text-amber-300 tracking-wider">Event</span>
                <span className="text-xs sm:text-sm font-normal text-amber-100">Schedule</span>
              </a>
            </div>
          </div>
        </div>
        {/* Mobile-only Volunteer Ribbon (fixed top-right below navbar) */}
        <div className="md:hidden fixed top-[64px] right-0 z-40">
          <button
            onClick={() => setShowVolunteer(true)}
            className="group flex items-center justify-center pl-4 pr-3 py-2 rounded-bl-2xl border border-white/20 bg-slate-900/60 backdrop-blur-md shadow-lg ring-1 ring-white/10 cursor-pointer transition-all duration-300 active:scale-95"
          >
            <span className="text-white font-extrabold text-xs tracking-wide leading-tight drop-shadow">
              🙏 One-Day Volunteer
              <span className="block text-[10px] font-semibold text-amber-300 mt-0.5">Offer your seva this Janmashtami</span>
            </span>
          </button>
        </div>

        {/* Mobile-only CTA strip (absolutely positioned 10px above the bottom of the hero container, transparent background) */}
        <div className="md:hidden absolute bottom-[10px] left-0 right-0 z-30 px-3 py-1.5 flex gap-2.5 justify-center">
          <div className="flex gap-2.5">
            <a
              href="#register"
              className="font-bold px-5 py-2 rounded-full shadow-xl transition-all duration-300 hover:scale-105 text-center text-slate-950 text-xs sm:text-sm flex items-center justify-center"
              style={{ background: 'linear-gradient(90deg, #fbbf24, #f59e0b)' }}
            >
              <span className="text-sm font-extrabold">Register Now</span>
            </a>
            <a
              href="#event-schedule"
              className="bg-black/40 font-bold px-5 py-2 rounded-full border border-white/40 transition-all duration-300 hover:scale-105 cursor-pointer shadow-md text-center flex items-center justify-center text-xs sm:text-sm text-white"
            >
              <span className="text-base font-extrabold text-amber-300 tracking-wider">Event Schedule</span>
            </a>
          </div>
        </div>
      </div>

      <div className="max-w-[1400px] mx-auto px-2 sm:px-4">
        <div className="overflow-x-hidden w-full py-2 bg-red-50 text-red-600 rounded-lg text-sm font-semibold my-6 select-none flex">
          <div className="animate-marquee-scroll">
            🎉 Janmashtami Mahotsav - 4th September 2026 | Sri Krishna Janmotsav | ISKCON KR Puram, Bangalore 🎉
          </div>
        </div>
      </div>

      {/* INNOVATIVE EVENT SCHEDULE & FULL DAY SEVAS SECTION */}
      <div id="event-schedule" className="bg-slate-900 py-12 text-white relative overflow-hidden scroll-mt-16">
        <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-orange-600/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="max-w-[1400px] mx-auto px-2 sm:px-4 relative z-10">
          <div className="text-center mb-10">
            <span className="text-xs uppercase tracking-widest text-amber-400 font-bold px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-400/20 inline-block mb-3">
              Program Timings & Seva Schedule
            </span>
            <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-3">
              Event Schedule
            </h2>
            <p className="text-slate-300 max-w-xl mx-auto text-sm md:text-base">
              Immerse yourself in divine festivities throughout the day at ISKCON KR Puram
            </p>
          </div>

          {/* TIME-BASED MILESTONES GRID WITH REDUCED GAP (gap-3.5 md:gap-4) & INCREASED CARD WIDTH/HEIGHT */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3.5 md:gap-4 mb-12">
            {/* 04:30 AM: Mangala Arathi (Features 4 Male Vaishnavas with Kartals & Mridanga + Radha Krishna) */}
            <div className="bg-slate-800/80 border border-slate-700/80 rounded-2xl overflow-hidden shadow-xl hover:border-amber-400/50 transition-all duration-300 hover:-translate-y-1 group">
              <div className="h-60 md:h-64 overflow-hidden relative">
                <img
                  src="/images/janmashtami_mangala_arathi_vaishnavas.jpg"
                  alt="Mangala Arathi with 4 Male Vaishnavas playing Kartals & Mridanga"
                  className="w-full h-full object-cover object-[center_15%] group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-4 sm:p-5">
                <div className="flex justify-between items-center mb-2 gap-2">
                  <h3 className="text-base sm:text-lg font-bold text-white">Mangala Arathi</h3>
                  <span className="bg-amber-500 text-slate-950 text-xs font-extrabold px-2.5 py-1 rounded-full shadow-md shrink-0">
                    04:30 AM
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">Auspicious morning ceremony with 4 male Vaishnavas playing Kartals & Mridanga in kirtan before Radha Krishna.</p>
              </div>
            </div>

            {/* 06:30 PM: Cultural Activities */}
            <div className="bg-slate-800/80 border border-slate-700/80 rounded-2xl overflow-hidden shadow-xl hover:border-amber-400/50 transition-all duration-300 hover:-translate-y-1 group">
              <div className="h-60 md:h-64 overflow-hidden relative">
                <img
                  src="/images/janmashtami_cultural_gopis.jpg"
                  alt="Cultural Activities with Vaishnava Kids & Gopis"
                  className="w-full h-full object-cover object-[center_20%] group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-4 sm:p-5">
                <div className="flex justify-between items-center mb-2 gap-2">
                  <h3 className="text-base sm:text-lg font-bold text-white">Cultural Activities</h3>
                  <span className="bg-amber-500 text-slate-950 text-xs font-extrabold px-2.5 py-1 rounded-full shadow-md shrink-0">
                    06:30 PM
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">Devotional music, harmonium, mridanga & classical drama by Vaishnava children and Gopis in festive attire.</p>
              </div>
            </div>

            {/* 09:00 PM: Maha Abhishekam (Young Dynamic Vaishnavas, Vaishnavis & Senior Devotees) */}
            <div className="bg-slate-800/80 border border-slate-700/80 rounded-2xl overflow-hidden shadow-xl hover:border-amber-400/50 transition-all duration-300 hover:-translate-y-1 group">
              <div className="h-64 md:h-70 overflow-hidden relative">
                <img
                  src="/images/janmashtami_abhishekam_vaishnava.jpg"
                  alt="Maha Abhishekam with Young Dynamic Vaishnavas & Senior Devotees"
                  className="w-full h-full object-cover object-[center_15%] group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-4 sm:p-5">
                <div className="flex justify-between items-center mb-2 gap-2">
                  <h3 className="text-base sm:text-lg font-bold text-white">Maha Abhishekam</h3>
                  <span className="bg-amber-500 text-slate-950 text-xs font-extrabold px-2.5 py-1 rounded-full shadow-md shrink-0">
                    09:00 PM
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">Sacred bathing ceremony of Sri Sri Radha Krishna with Panchamrita by young dynamic Vaishnavas, Vaishnavis & senior devotees.</p>
              </div>
            </div>

            {/* 12:00 AM: Maha Mangala Arathi (Saffron Swami Discourse & Vaishnava Devotees) */}
            <div className="bg-slate-800/80 border border-slate-700/80 rounded-2xl overflow-hidden shadow-xl hover:border-amber-400/50 transition-all duration-300 hover:-translate-y-1 group">
              <div className="h-64 md:h-70 overflow-hidden relative">
                <img
                  src="/images/janmashtami_maha_mangala_arathi_real.jpg"
                  alt="Maha Mangala Arathi - Saffron Swami Discourse & Vaishnava Devotees"
                  className="w-full h-full object-cover object-[15%_25%] group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-4 sm:p-5">
                <div className="flex justify-between items-center mb-2 gap-2">
                  <h3 className="text-base sm:text-lg font-bold text-white">Maha Mangala Arathi</h3>
                  <span className="bg-amber-400 text-slate-950 text-xs font-extrabold px-3 py-1 rounded-full shadow-md shrink-0">
                    12:00 AM
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">Midnight Janmotsav discourse by saffron swami, kirtan & Vaishnava devotees paying obeisances before Sri Sri Radha Krishna.</p>
              </div>
            </div>
          </div>

          {/* FULL DAY CONTINUOUS SEVAS & EXPO SHOWCASE */}
          <div className="bg-gradient-to-r from-amber-500/10 via-slate-800 to-amber-500/10 border border-amber-400/30 rounded-3xl p-6 md:p-10 shadow-2xl">
            <div className="flex flex-col lg:flex-row gap-8 items-center">
              {/* Featured 5-Year-Old Krishna Jhulan Seva Card (+50px height, extra text removed) */}
              <div className="w-full lg:w-1/2 flex-shrink-0">
                <div className="relative rounded-2xl overflow-hidden border-2 border-amber-400/40 shadow-2xl group">
                  <img
                    src="/images/janmashtami_jhulan_gopis.jpg"
                    alt="Jhulan Seva (Swing Festival)"
                    className="w-full h-[330px] md:h-[370px] object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent"></div>
                  <div className="absolute bottom-5 left-5 right-5">
                    <h3 className="text-2xl font-extrabold text-white drop-shadow-md">
                      Jhulan Seva (Swing Festival)
                    </h3>
                  </div>
                </div>
              </div>

              {/* Full Day Seva Cards Grid */}
              <div className="w-full lg:w-1/2">
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-2xl">✨</span>
                  <h3 className="text-2xl font-bold text-amber-300">
                    Full Day Continuous Events & Sevas
                  </h3>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  {[
                    { title: 'Paduka Seva', desc: 'Divine blessings of the Lord’s sacred footprints' },
                    { title: 'Akhanda Sankirtan', desc: 'Non-stop chanting of the Hare Krishna Maha Mantra' },
                    { title: 'Mantra Meditation', desc: 'Guided japa sessions for inner peace' },
                    { title: 'Divya Darshan', desc: 'All-day grand deity darshan & flower decoration' },
                    { title: 'Gita Expo', desc: 'Vedic wisdom exhibition & book distribution' },
                    { title: 'Free Maha Prasadam', desc: 'Delicious prasadam served to all visitors all day' },
                  ].map((item, idx) => (
                    <div key={idx} className="bg-slate-900/80 border border-slate-700/70 p-4 rounded-xl hover:border-amber-400/50 transition-all">
                      <h4 className="font-bold text-sm text-white flex items-center gap-1.5">
                        <span className="text-amber-400">✦</span> {item.title}
                      </h4>
                      <p className="text-xs text-slate-400 mt-0.5">{item.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>


      <div className="bg-white py-16">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
            About the Celebration
          </h2>
          <div className="w-20 h-1 mx-auto mb-8 rounded-full" style={{ background: 'linear-gradient(90deg, var(--theme-cta-from), var(--theme-cta-to))' }}></div>
          <p className="text-gray-600 text-lg leading-relaxed max-w-3xl mx-auto">
            Janmashtami marks the divine appearance of Lord Sri Krishna, the Supreme Personality of Godhead.
            ISKCON KR Puram, Bangalore, invites you and your family to join us for a grand celebration
            featuring <strong>bhajans, kirtan, temple decoration, midnight aarti, prasadam distribution,</strong> and much more.
            Come immerse yourself in the spiritual atmosphere and celebrate this auspicious day with us.
          </p>
        </div>
      </div>

      <div className="py-16" style={{ background: 'linear-gradient(to bottom, var(--theme-soft-from), var(--theme-soft-to))' }}>
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-4">
            The Legacy
          </h2>
          <div className="w-20 h-1 mx-auto mb-4 rounded-full" style={{ background: 'linear-gradient(90deg, var(--theme-cta-from), var(--theme-cta-to))' }}></div>
          <p className="text-gray-500 text-center max-w-xl mx-auto mb-12">
            Honoring the divine personalities and holy places of the Gaudiya Vaishnava tradition
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <ImageCard
              src="https://upload.wikimedia.org/wikipedia/commons/8/8f/Swami_Prabhupada.jpg"
              fallbackSrc="https://placehold.co/400x500/1a1a2e/e94560?text=Srila+Prabhupada"
              title="Srila Prabhupada"
              subtitle="Founder-Acharya, ISKCON"
            />
            <ImageCard
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/bd/Iskcon_Temple_Delhi_01.jpg/500px-Iskcon_Temple_Delhi_01.jpg?20200929072725"
              fallbackSrc="https://placehold.co/400x500/16213e/0f3460?text=ISKCON+Temple"
              title="ISKCON Temple"
              subtitle="Sri Sri Radha Krishna Mandir"
            />
            <ImageCard
              src="https://upload.wikimedia.org/wikipedia/commons/5/51/Sri_Krishna_Balaram_Mandir_Vrindavan_11.jpg"
              fallbackSrc="https://placehold.co/400x500/0f3460/533483?text=Vrindavan+Temple"
              title="Vrindavan"
              subtitle="Sri Krishna Balaram Mandir"
            />
            <ImageCard
              src="https://upload.wikimedia.org/wikipedia/commons/7/76/Krishna_ISKCON_Mayapur_2008.jpg"
              fallbackSrc="https://placehold.co/400x500/533483/e94560?text=Mayapur+ISKCON"
              title="Mayapur"
              subtitle="Temple of the Vedic Planetarium"
            />
          </div>
        </div>
      </div>

      <div id="register" className="bg-white py-16 scroll-mt-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            Register for Janmashtami
          </h2>
          <div className="w-20 h-1 mx-auto mb-8 rounded-full" style={{ background: 'linear-gradient(90deg, var(--theme-cta-from), var(--theme-cta-to))' }}></div>
          <p className="text-gray-600 mb-10">
            Fill in your details below to reserve your place for the celebration
          </p>
          <RegistrationForm />
          <div className="mt-12">
            <button
              onClick={() => navigate('/donate')}
              className="bg-green-600 hover:bg-green-700 text-white font-bold text-lg px-10 py-4 rounded-full transition-all duration-300 hover:scale-105 shadow-xl cursor-pointer"
            >
              Donate Now
            </button>
          </div>
        </div>
      </div>

      <div id="volunteer" className="py-16 scroll-mt-16" style={{ background: 'linear-gradient(to bottom, var(--theme-soft-from), var(--theme-soft-to))' }}>
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            Become a One-Day Volunteer
          </h2>
          <div className="w-20 h-1 mx-auto mb-8 rounded-full" style={{ background: 'linear-gradient(90deg, var(--theme-cta-from), var(--theme-cta-to))' }}></div>
          <p className="text-gray-600 mb-10 max-w-2xl mx-auto">
            Janmashtami needs many helping hands — darshan assistance, prasadam distribution, decoration,
            crowd management and more. Offer your seva for a day and be part of the celebration 🙏
          </p>
          <VolunteerForm />
        </div>
      </div>

      {showEventDetails && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm animate-fade-in" onClick={() => setShowEventDetails(false)}>
          <div className="bg-white rounded-2xl shadow-2xl p-8 md:p-12 max-w-4xl mx-4 w-full min-h-[60vh] relative overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <button
              onClick={() => setShowEventDetails(false)}
              className="absolute top-3 right-3 w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 text-gray-500 transition cursor-pointer"
            >
              ✕
            </button>
            <h2 className="text-2xl font-bold text-gray-800 text-center mb-6">Event Schedule</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { time: '5:00 PM', icon: '🕐', name: 'Mangal Aarti & Abhishek' },
                { time: '6:00 PM', icon: '🎤', name: 'Bhajan & Kirtan' },
                { time: '7:30 PM', icon: '📖', name: 'Srimad Bhagavatam Discourse' },
                { time: '9:00 PM', icon: '🍛', name: 'Maha Prasadam' },
              ].map((item) => (
                <div key={item.time} className="text-center p-5 rounded-xl" style={{ background: 'var(--theme-soft-from)' }}>
                  <p className="text-3xl mb-2">{item.icon}</p>
                  <p className="text-base font-bold text-gray-700">{item.time}</p>
                  <p className="text-sm text-gray-500">{item.name}</p>
                </div>
              ))}
            </div>
            <div className="mt-6 p-5 rounded-xl text-center" style={{ background: 'linear-gradient(90deg, var(--theme-soft-from), var(--theme-soft-to))' }}>
              <p className="text-lg font-bold text-gray-800">🎉 Janmashtami Mahotsav 2026</p>
              <p className="text-sm text-gray-600 mt-1">4th September | ISKCON KR Puram, Bangalore</p>
              <p className="text-sm text-gray-500 mt-1">Everyone is welcome. Please register to help us plan better.</p>
            </div>
          </div>
        </div>
      )}

      {showDonation && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm animate-fade-in" onClick={() => setShowDonation(false)}>
          <div className="bg-white rounded-3xl shadow-2xl p-6 md:p-8 max-w-sm mx-4 w-full relative" onClick={(e) => e.stopPropagation()}>
            <button
              onClick={() => setShowDonation(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 bg-gray-100 hover:bg-gray-200 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition cursor-pointer"
            >
              ✕
            </button>
            <h2 className="text-2xl font-bold text-gray-800 text-center mb-1">Donation</h2>
            <p className="text-xs text-gray-500 text-center mb-5">Support the Janmashtami celebrations at ISKCON KR Puram, Bangalore.</p>
            
            <div className="flex flex-col items-center justify-center bg-slate-50 border border-slate-100 rounded-2xl p-5 text-center">
              <span className="text-[10px] uppercase tracking-wider text-green-700 bg-green-100 font-extrabold px-3 py-1 rounded-full mb-3 shadow-sm">
                🛡️ Secure UPI Payment
              </span>
              <div className="bg-white p-3 rounded-xl shadow-md border border-slate-200/50">
                {/* QR image served from backend — UPI ID never exposed in frontend code */}
                <img
                  src={qrSrc}
                  alt="UPI Donation QR Code"
                  width={220}
                  height={220}
                  className="rounded-lg"
                />
              </div>
              <p className="text-xs text-slate-600 mt-3 font-semibold">Scan to send donation</p>
              <p className="text-[10px] text-slate-400">Receive a personal thank-you message 🙏</p>

              {/* Mobile intent payment link — UPI ID resolved server-side */}
              <div className="w-full mt-4 block md:hidden">
                <a
                  href="/api/donations/upi-intent?amount=0&note=Donation+for+Janmashtami"
                  className="w-full bg-slate-900 hover:bg-black text-white font-bold py-2 px-3 rounded-xl flex items-center justify-center gap-1.5 shadow-md transition text-[11px]"
                >
                  🚀 Pay via UPI App
                </a>
              </div>
            </div>
          </div>
        </div>
      )}

      {showVolunteer && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 animate-fade-in" onClick={() => setShowVolunteer(false)}>
          <div className="bg-white rounded-3xl shadow-2xl max-w-3xl w-full relative max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <button
              onClick={() => setShowVolunteer(false)}
              className="sticky top-3 float-right mr-3 w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 text-gray-500 transition cursor-pointer"
            >
              ✕
            </button>
            <div className="p-6 md:p-10 text-center">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">Become a One-Day Volunteer</h2>
              <div className="w-16 h-1 mx-auto mb-4 rounded-full" style={{ background: 'linear-gradient(90deg, var(--theme-cta-from), var(--theme-cta-to))' }}></div>
              <p className="text-gray-600 text-sm mb-6 max-w-xl mx-auto">
                Offer your seva for Janmashtami — darshan assistance, prasadam distribution, decoration,
                crowd management and more. Hare Krishna 🙏
              </p>
              <VolunteerForm />
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
