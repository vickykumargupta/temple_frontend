import { InfoCard } from '../../components/ui'

export default function DesignSystemSection() {
  return (
    <div>
      {/* ===================== HERO ===================== */}
      <section
        className="relative overflow-hidden text-white"
        style={{ background: 'linear-gradient(135deg, var(--theme-from), var(--theme-via), var(--theme-to))' }}
      >
        <div className="relative w-full h-28 md:h-40">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/7f/Iskon_temple.JPG/960px-Iskon_temple.JPG"
            alt="ISKCON Bangalore Temple at night"
            className="w-full h-full object-cover"
            loading="eager"
          />
        </div>

        <div className="relative max-w-6xl mx-auto px-6 md:px-12 py-10 md:py-14 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-8 leading-tight">
            ISKCON KR Puram
          </h1>
          <a
            href="/janmashtami"
            className="inline-block font-bold text-lg px-10 py-4 rounded-full shadow-2xl transition-all duration-300 hover:scale-105"
            style={{ background: 'linear-gradient(90deg, var(--theme-accent), var(--theme-accent-hover))', color: 'var(--theme-accent-text)' }}
          >
            Janmashtami 2026
          </a>
        </div>
      </section>

      {/* ===================== ABOUT ===================== */}
      <section id="about" className="bg-white py-20">
        <div className="max-w-5xl mx-auto px-4 text-center">
          <div
            className="inline-block text-white text-sm font-bold px-4 py-1 rounded-full mb-5"
            style={{ background: 'linear-gradient(90deg, var(--theme-cta-from), var(--theme-cta-to))' }}
          >
            About Us
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            Welcome to ISKCON KR Puram
          </h2>
          <div
            className="w-20 h-1 mx-auto mb-8 rounded-full"
            style={{ background: 'linear-gradient(90deg, var(--theme-cta-from), var(--theme-cta-to))' }}
          ></div>
          <p className="text-gray-600 text-lg leading-relaxed max-w-3xl mx-auto">
            The International Society for Krishna Consciousness (ISKCON), founded by
            Srila Prabhupada in 1966, shares the timeless Vedic wisdom of the Bhagavad-gita.
            Our KR Puram temple in Bangalore is a place of worship, community and service,
            open to people of all backgrounds.
          </p>
        </div>
      </section>

      {/* ===================== DARSHAN / TIMINGS ===================== */}
      <section
        id="timings"
        className="py-20"
        style={{ background: 'linear-gradient(to bottom, var(--theme-soft-from), var(--theme-soft-to))' }}
      >
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <div
              className="inline-block text-white text-sm font-bold px-4 py-1 rounded-full mb-5"
              style={{ background: 'linear-gradient(90deg, var(--theme-cta-from), var(--theme-cta-to))' }}
            >
              Darshan & Timings
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">
              Temple Schedule
            </h2>
            <div
              className="w-20 h-1 mx-auto mb-4 rounded-full"
              style={{ background: 'linear-gradient(90deg, var(--theme-cta-from), var(--theme-cta-to))' }}
            ></div>
            <p className="text-gray-500 max-w-xl mx-auto">
              Daily darshan and aarti timings at the temple
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <TimingCard time="4:30 AM" title="Mangala Aarti" desc="Wake up the Lord with melodious aarti and kirtan." />
            <TimingCard time="7:15 AM" title="Darshan Aarti" desc="Morning darshan of Sri Sri Radha Krishna." />
            <TimingCard time="12:00 PM" title="Raj Bhoga Aarti" desc="Midday offering of a grand feast to the Deities." />
            <TimingCard time="4:30 PM" title="Dhupa Aarti" desc="Afternoon aarti and darshan." />
            <TimingCard time="6:45 PM" title="Sandhya Aarti" desc="Evening aarti as the day winds down." />
            <TimingCard time="8:30 PM" title="Shayana Aarti" desc="Putting the Deities to rest for the night." />
          </div>
        </div>
      </section>

      {/* ===================== PROGRAMS & EVENTS ===================== */}
      <section id="programs" className="bg-white py-20">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <div
              className="inline-block text-white text-sm font-bold px-4 py-1 rounded-full mb-5"
              style={{ background: 'linear-gradient(90deg, var(--theme-cta-from), var(--theme-cta-to))' }}
            >
              Programs & Events
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">
              Weekly & Special Programs
            </h2>
            <div
              className="w-20 h-1 mx-auto mb-4 rounded-full"
              style={{ background: 'linear-gradient(90deg, var(--theme-cta-from), var(--theme-cta-to))' }}
            ></div>
            <p className="text-gray-500 max-w-xl mx-auto">
              Spiritual programs for everyone — every week, all year round
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <InfoCard icon="📖" title="Bhagavad-gita Class" desc="Sunday feast and Gita discussion from 6:30 PM, followed by prasadam." />
            <InfoCard icon="🕉️" title="Kirtan Mela" desc="Every Saturday evening, a festival of chanting with kirtan and dance." />
            <InfoCard icon="🧘" title="Meditation & Japa" desc="Guided mantra meditation and japa sessions for inner peace." />
            <InfoCard icon="🍛" title="Prasadam Distribution" desc="Free prasadam served daily — food offered to the Lord, for all." />
          </div>
          <div className="mt-12 text-center">
            <a
              href="/janmashtami"
              className="inline-block text-white font-bold text-lg px-10 py-4 rounded-full transition-all duration-300 hover:scale-105 shadow-xl hover:opacity-90"
              style={{ background: 'linear-gradient(90deg, var(--theme-cta-from), var(--theme-cta-to))' }}
            >
              Celebrate Janmashtami 2026
            </a>
          </div>
        </div>
      </section>

      {/* ===================== IYF / IMYF HIGHLIGHTS ===================== */}
      <section
        className="py-20"
        style={{ background: 'linear-gradient(to bottom, var(--theme-soft-to), var(--theme-soft-from), #ffffff)' }}
      >
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <div
              className="inline-block text-white text-sm font-bold px-4 py-1 rounded-full mb-5"
              style={{ background: 'linear-gradient(90deg, var(--theme-cta-from), var(--theme-cta-to))' }}
            >
              Youth Programs
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">
              IYF & IMYF
            </h2>
            <div
              className="w-20 h-1 mx-auto mb-4 rounded-full"
              style={{ background: 'linear-gradient(90deg, var(--theme-cta-from), var(--theme-cta-to))' }}
            ></div>
            <p className="text-gray-500 max-w-xl mx-auto">
              Forums for spiritual and personal growth of the younger generation
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div
              className="text-white rounded-3xl p-10 text-center"
              style={{ background: 'linear-gradient(135deg, var(--theme-cta-from), var(--theme-cta-to))' }}
            >
              <h3 className="text-3xl font-bold mb-3">IYF</h3>
              <p className="text-sm font-semibold text-yellow-100 mb-4">ISKCON Youth Forum</p>
              <p className="mb-8" style={{ color: 'var(--theme-text-soft)' }}>
                Empowering the youth with the wisdom of the Bhagavad-gita — character, values and a life of purpose.
              </p>
              <a
                href="/iyf"
                className="inline-block bg-white font-bold px-8 py-3 rounded-full hover:bg-white/90 transition-all duration-300 hover:scale-105"
                style={{ color: 'var(--theme-cta-from)' }}
              >
                Explore IYF
              </a>
            </div>
            <div
              className="text-white rounded-3xl p-10 text-center"
              style={{ background: 'linear-gradient(135deg, var(--theme-via), var(--theme-to))' }}
            >
              <h3 className="text-3xl font-bold mb-3">IMYF</h3>
              <p className="text-sm font-semibold text-yellow-100 mb-4">ISKCON Men & Youth Forum</p>
              <p className="mb-8" style={{ color: 'var(--theme-text-soft)' }}>
                Spiritual and personal growth of young men — discipline, responsibility and devotion.
              </p>
              <a
                href="/imyf"
                className="inline-block bg-white font-bold px-8 py-3 rounded-full hover:bg-white/90 transition-all duration-300 hover:scale-105"
                style={{ color: 'var(--theme-cta-from)' }}
              >
                Explore IMYF
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ===================== CONTACT / LOCATION ===================== */}
      <section id="contact" className="bg-white py-20">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <div
              className="inline-block text-white text-sm font-bold px-4 py-1 rounded-full mb-5"
              style={{ background: 'linear-gradient(90deg, var(--theme-cta-from), var(--theme-cta-to))' }}
            >
              Visit Us
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">
              Contact & Location
            </h2>
            <div
              className="w-20 h-1 mx-auto mb-4 rounded-full"
              style={{ background: 'linear-gradient(90deg, var(--theme-cta-from), var(--theme-cta-to))' }}
            ></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="rounded-2xl p-8" style={{ background: 'var(--theme-card-bg)' }}>
              <h3 className="text-xl font-bold text-gray-800 mb-4">📍 Address</h3>
              <p className="text-gray-600">
                ISKCON Sri Sri Radha Krishna Mandir,
                KR Puram, Bangalore,
                Karnataka, India
              </p>
            </div>
            <div className="rounded-2xl p-8 space-y-4" style={{ background: 'var(--theme-card-bg)' }}>
              <h3 className="text-xl font-bold text-gray-800">📞 Contact</h3>
              <p className="text-gray-600">
                <span className="font-semibold">Phone:</span> +91 80000 00000
              </p>
              <p className="text-gray-600">
                <span className="font-semibold">Email:</span> info@iskconkrpuram.org
              </p>
              <p className="text-gray-600">
                <span className="font-semibold">Office Hours:</span> 9:00 AM – 1:00 PM, 4:00 PM – 8:00 PM
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

function TimingCard({ time, title, desc }) {
  return (
    <div className="bg-white rounded-2xl shadow-md p-7 text-center border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
      <p className="text-lg font-bold mb-2" style={{ color: 'var(--theme-cta-from)' }}>{time}</p>
      <p className="text-base font-bold text-gray-800 mb-1">{title}</p>
      <p className="text-sm text-gray-500">{desc}</p>
    </div>
  )
}
