import { Link } from 'react-router-dom'
import { InfoCard } from '../../components/ui'

const IMG = {
  gita: 'https://upload.wikimedia.org/wikipedia/en/9/91/BGita_As_It_Is.jpg',
  kirtan:
    'https://upload.wikimedia.org/wikipedia/commons/thumb/8/84/Radha_Kalachandji_-_ISKCON_Dallas_Bhakti_Circle_Meditation_Group_2023_May_14_%2844%29_05.jpg/960px-Radha_Kalachandji_-_ISKCON_Dallas_Bhakti_Circle_Meditation_Group_2023_May_14_%2844%29_05.jpg',
  harinam:
    'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6a/Russian_Hare_Krishna_devotees_on_Harinam.jpg/960px-Russian_Hare_Krishna_devotees_on_Harinam.jpg',
  kirtanSaptah:
    'https://upload.wikimedia.org/wikipedia/commons/thumb/9/93/Harinam_Saptah_Kirtan.jpg/960px-Harinam_Saptah_Kirtan.jpg',
}

export default function WisdomSharingPage() {
  return (
    <section className="scroll-mt-16 py-12 md:py-20" style={{ background: 'linear-gradient(to bottom, #ffffff, var(--theme-soft-from))' }}>
      <div className="max-w-6xl mx-auto px-4">
        {/* ===================== HERO ===================== */}
        <div className="text-center mb-12">
          <div className="inline-block text-white text-sm font-bold px-4 py-1 rounded-full mb-5" style={{ background: 'linear-gradient(90deg, var(--theme-cta-from), var(--theme-cta-to))' }}>
            ISKCON BhaktiVriksha · Wisdom Sharing
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">Wisdom Sharing</h1>
          <p className="text-gray-500 text-lg max-w-3xl mx-auto">
            Deepen your understanding of the Bhagavad-gita and the teachings of Srila Prabhupada —
            through book reading and lecture hearing, online or offline, at your own pace.
          </p>
        </div>

        <div className="rounded-3xl overflow-hidden shadow-xl mb-14">
          <img
            src={IMG.kirtan}
            alt="A group of devotees sitting together in meditation"
            className="w-full h-72 md:h-96 object-cover"
            loading="lazy"
            onError={(e) => {
              if (e.target.src !== IMG.kirtanSaptah) e.target.src = IMG.kirtanSaptah
            }}
          />
        </div>

        {/* ===================== BOOK READING ===================== */}
        <div className="rounded-3xl p-8 md:p-12 mb-10 bg-white shadow-xl border border-gray-100">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="md:w-1/3 shrink-0">
              <img
                src={IMG.gita}
                alt="Bhagavad-gita As It Is by Srila Prabhupada"
                className="w-full max-w-xs mx-auto rounded-2xl shadow-2xl"
                loading="lazy"
                onError={(e) => {
                  if (e.target.src !== IMG.harinam) e.target.src = IMG.harinam
                }}
              />
            </div>
            <div className="md:w-2/3">
              <div className="text-2xl mb-2">📚</div>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">Book Reading</h2>
              <p className="text-gray-500 mb-6">
                Systematically study Srila Prabhupada&apos;s books — the Bhagavad-gita As It Is, Srimad
                Bhagavatam, Sri Caitanya-caritamrta and many more. Read alone or with a group, in print or on screen.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <InfoCard
                  icon="📖"
                  title="Offline Reading"
                  desc="Hold the book in your hands. Read at your own pace, mark your favourite verses and reflect — the classic way of study."
                />
                <InfoCard
                  icon="💻"
                  title="Online Reading"
                  desc="Read digitised editions and listen to audiobooks on vedabase.io and similar resources, anywhere and anytime."
                />
              </div>
            </div>
          </div>
        </div>

        {/* ===================== LECTURE HEARING ===================== */}
        <div className="rounded-3xl p-8 md:p-12 mb-14 bg-white shadow-xl border border-gray-100">
          <div className="text-center mb-8">
            <div className="text-2xl mb-2">🎧</div>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">Lecture Hearing</h2>
            <p className="text-gray-500 max-w-2xl mx-auto">
              Hear realised devotees explain scripture with devotion and insight — in the temple, at a home
              program, or through recorded and live classes online.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <InfoCard
              icon="🏛️"
              title="Offline Lectures"
              desc="Attend Sunday Feast classes, Bhagavad-gita classes and festivals at the temple — or join a class at a nearby house program."
            />
            <InfoCard
              icon="📺"
              title="Online Lectures"
              desc="Watch and listen to live-streamed and recorded lectures from ISKCON temples worldwide, with classes for every level."
            />
          </div>
        </div>

        {/* ===================== GALLERY ===================== */}
        <div className="mb-14">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800 text-center mb-8">Hearing & chanting, together</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="rounded-2xl overflow-hidden shadow-lg">
              <img src={IMG.kirtanSaptah} alt="A class and kirtan gathering" className="w-full h-44 md:h-56 object-cover" loading="lazy" onError={(e) => { if (e.target.src !== IMG.harinam) e.target.src = IMG.harinam }} />
            </div>
            <div className="rounded-2xl overflow-hidden shadow-lg">
              <img src={IMG.harinam} alt="Devotees chanting the holy names" className="w-full h-44 md:h-56 object-cover" loading="lazy" onError={(e) => { if (e.target.src !== IMG.kirtanSaptah) e.target.src = IMG.kirtanSaptah }} />
            </div>
            <div className="rounded-2xl overflow-hidden shadow-lg">
              <img src={IMG.gita} alt="Bhagavad-gita As It Is" className="w-full h-44 md:h-56 object-cover" loading="lazy" onError={(e) => { if (e.target.src !== IMG.kirtanSaptah) e.target.src = IMG.kirtanSaptah }} />
            </div>
          </div>
        </div>

        {/* ===================== CTA ===================== */}
        <div className="text-center rounded-3xl p-10 md:p-14 text-white" style={{ background: 'linear-gradient(90deg, var(--theme-cta-from), var(--theme-cta-to))' }}>
          <h2 className="text-2xl md:text-3xl font-bold mb-3">Grow in wisdom together</h2>
          <p className="mb-8 max-w-xl mx-auto" style={{ color: 'var(--theme-text-soft)' }}>
            Join our reading circles and lecture groups — whether at the temple, at home, or online.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/imyf"
              className="bg-white font-bold px-8 py-3 rounded-full hover:bg-white/90 transition-all duration-300 hover:scale-105"
              style={{ color: 'var(--theme-cta-from)' }}
            >
              Back to BhaktiVriksha
            </Link>
            <Link
              to="/imyf#register"
              className="bg-white/10 hover:bg-white/20 text-white font-semibold px-8 py-3 rounded-full border border-white/30 backdrop-blur-sm transition-all duration-300 hover:scale-105"
            >
              Join the Reading Circle
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
