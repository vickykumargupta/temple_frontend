import { useRef, useState, useEffect } from 'react'
import QRCode from 'qrcode'
import RegistrationForm from '../../components/RegistrationForm'
import { ImageCard } from '../../components/ui'

export default function JanmashtamiSection() {
  const marqueeRef = useRef(null)
  const [marqueeStopped, setMarqueeStopped] = useState(false)
  const [showEventDetails, setShowEventDetails] = useState(false)
  const [showDonation, setShowDonation] = useState(false)
  const canvasRef = useRef(null)
  const qrUrl = useRef('')

  useEffect(() => {
    const host = window.location.hostname
    qrUrl.current = `http://${host}:3000/donation/thank-you`
  }, [])

  useEffect(() => {
    if (showDonation && canvasRef.current) {
      QRCode.toCanvas(canvasRef.current, qrUrl.current, {
        width: 220,
        margin: 2,
        color: { dark: '#15803d', light: '#ffffff' },
      })
    }
  }, [showDonation])

  function handleMarqueeEnter() {
    marqueeRef.current?.stop()
    setMarqueeStopped(true)
  }

  function handleMarqueeLeave() {
    marqueeRef.current?.start()
    setMarqueeStopped(false)
  }

  return (
    <section id="janmashtami" className="scroll-mt-16">
      <div className="relative overflow-hidden text-white" style={{ background: 'linear-gradient(135deg, var(--theme-from), var(--theme-via), var(--theme-to))' }}>
        <div className="absolute inset-0 opacity-15">
          <div className="absolute top-5 left-10 w-72 h-72 rounded-full blur-3xl" style={{ background: 'var(--theme-accent)' }}></div>
          <div className="absolute bottom-10 right-10 w-96 h-96 rounded-full blur-3xl" style={{ background: 'var(--theme-cta-to)' }}></div>
          <div className="absolute top-40 right-1/4 w-48 h-48 rounded-full blur-3xl" style={{ background: 'var(--theme-cta-from)' }}></div>
        </div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.1)_0%,transparent_60%)]"></div>

        <div className="relative max-w-7xl mx-auto px-6 md:px-12 py-24 md:py-32">
          <div className="flex items-center justify-center gap-4 md:gap-8">
            <div className="hidden md:block w-36 lg:w-48 flex-shrink-0 self-center">
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/8/8a/Krishna,_The_Beautiful_Blue_God_-_Navarathri_Golu_Dolls_(15278867139).jpg"
                alt="Lord Krishna"
                className="w-full h-auto rounded-lg shadow-lg"
                loading="lazy"
              />
            </div>
            <div className="text-center flex-1 max-w-3xl">
              <div className="inline-block bg-white/10 backdrop-blur-sm px-6 py-2 rounded-full mb-6">
                <p className="font-semibold tracking-widest uppercase text-sm" style={{ color: 'var(--theme-accent)' }}>
                  Hare Krishna Hare Krishna
                </p>
              </div>
              <h1 className="text-5xl md:text-7xl font-bold mb-4 leading-tight">
                Janmashtami
                <span className="block text-3xl md:text-4xl mt-3" style={{ color: 'var(--theme-accent)' }}>
                  Celebration 2026
                </span>
              </h1>
              <p className="text-base md:text-lg mb-3" style={{ color: 'var(--theme-text-soft)' }}>
                ISKCON KR Puram, Bangalore
              </p>
              <p className="text-lg md:text-xl mb-10" style={{ color: 'var(--theme-text-soft)' }}>
                Join us in celebrating the appearance day of Lord Sri Krishna
                with devotion, kirtan, feast, and spiritual bliss.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="#register"
                  className="font-bold text-lg px-10 py-4 rounded-full shadow-2xl transition-all duration-300 hover:scale-105 text-center"
                  style={{ background: 'linear-gradient(90deg, var(--theme-accent), var(--theme-accent-hover))', color: 'var(--theme-accent-text)' }}
                >
                  Register Now
                </a>
                <button
                  onClick={() => setShowEventDetails(true)}
                  className="bg-white/10 hover:bg-white/20 text-white font-semibold text-lg px-10 py-4 rounded-full border border-white/30 backdrop-blur-sm transition-all duration-300 hover:scale-105 cursor-pointer"
                >
                  Event Schedule
                </button>
              </div>
            </div>
            <div className="hidden md:block w-32 lg:w-40 flex-shrink-0 self-center">
              <img
                src="https://images.pexels.com/photos/37616375/pexels-photo-37616375.jpeg?auto=compress&cs=tinysrgb&w=400"
                alt="Baby Krishna"
                className="w-full h-auto rounded-lg shadow-lg"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4">
        <marquee
          ref={marqueeRef}
          onMouseEnter={handleMarqueeEnter}
          onMouseLeave={handleMarqueeLeave}
          className={`text-sm font-semibold my-6 py-2 rounded-lg transition ${
            marqueeStopped ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-600'
          }`}
        >
          🎉 Janmashtami Mahotsav - 4th September 2026 | Sri Krishna Janmotsav | ISKCON KR Puram, Bangalore 🎉
        </marquee>
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
              onClick={() => setShowDonation(true)}
              className="bg-green-600 hover:bg-green-700 text-white font-bold text-lg px-10 py-4 rounded-full transition-all duration-300 hover:scale-105 shadow-xl cursor-pointer"
            >
              Donate Now
            </button>
          </div>
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
          <div className="bg-white rounded-2xl shadow-2xl p-8 md:p-10 max-w-4xl mx-4 w-full relative" onClick={(e) => e.stopPropagation()}>
            <button
              onClick={() => setShowDonation(false)}
              className="absolute top-3 right-3 w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 text-gray-500 transition cursor-pointer"
            >
              ✕
            </button>
            <h2 className="text-2xl font-bold text-gray-800 text-center mb-6">Donation</h2>
            <p className="text-gray-600 text-center mb-6">Support the Janmashtami celebrations at ISKCON KR Puram, Bangalore. Your contribution helps us serve prasadam and organize the festival.</p>
            <div className="flex flex-col sm:flex-row gap-0 sm:gap-0">
              <div className="flex flex-col items-center justify-center p-6 sm:w-1/2 border-r border-gray-200">
                <div className="bg-green-50 rounded-2xl p-6">
                  <canvas ref={canvasRef} className="rounded-xl"></canvas>
                </div>
                <p className="text-sm text-gray-500 mt-3">Scan to send donation</p>
                <p className="text-xs text-gray-400">Receive a personal thank-you message 🙏</p>
              </div>
              <div className="flex flex-col items-center justify-center p-6 sm:w-1/2">
                <div className="text-center space-y-3">
                  <p className="text-xl font-bold text-gray-800">Bank Details</p>
                  <div className="text-sm text-gray-600 space-y-1.5">
                    <p><span className="font-semibold">Bank:</span> State Bank of India</p>
                    <p><span className="font-semibold">Account:</span> ISKCON KR Puram</p>
                    <p><span className="font-semibold">A/C No:</span> 1234567890123456</p>
                    <p><span className="font-semibold">IFSC:</span> SBIN0001234</p>
                    <p><span className="font-semibold">UPI:</span> iskconkrpuram@upi</p>
                  </div>
                  <p className="text-xs text-gray-400 pt-2">Hare Krishna. Thank you!</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
