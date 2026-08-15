import { Link } from 'react-router-dom'
import { InfoCard } from '../../components/ui'

const IMG = {
  kirtan:
    'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8b/ISKCON_Tirupati_Pushpa_Abhisec2.JPG/960px-ISKCON_Tirupati_Pushpa_Abhisec2.JPG',
  kirtanChildren:
    'https://upload.wikimedia.org/wikipedia/commons/thumb/7/71/Kirtan_with_Children.jpg/960px-Kirtan_with_Children.jpg',
  kirtanMoody:
    'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e0/Aindra_Dasa_Kartik_2009.JPG/960px-Aindra_Dasa_Kartik_2009.JPG',
  harinam:
    'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6a/Russian_Hare_Krishna_devotees_on_Harinam.jpg/960px-Russian_Hare_Krishna_devotees_on_Harinam.jpg',
  kirtanSaptah:
    'https://upload.wikimedia.org/wikipedia/commons/thumb/9/93/Harinam_Saptah_Kirtan.jpg/960px-Harinam_Saptah_Kirtan.jpg',
}

export default function HouseProgramPage() {
  return (
    <section className="scroll-mt-16 py-12 md:py-20" style={{ background: 'linear-gradient(to bottom, #ffffff, var(--theme-soft-from))' }}>
      <div className="max-w-6xl mx-auto px-4">
        {/* ===================== HERO ===================== */}
        <div className="text-center mb-12">
          <div className="inline-block text-white text-sm font-bold px-4 py-1 rounded-full mb-5" style={{ background: 'linear-gradient(90deg, var(--theme-cta-from), var(--theme-cta-to))' }}>
            ISKCON BhaktiVriksha · House Program
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">House Programs</h1>
          <p className="text-gray-500 text-lg max-w-3xl mx-auto">
            Our devotees visit the homes of devotees to hold intimate gatherings of kirtan, katha and
            prasadam — bringing the warmth of the temple into the living room.
          </p>
        </div>

        <div className="rounded-3xl overflow-hidden shadow-xl mb-14">
          <img
            src={IMG.kirtan}
            alt="Devotees gathered before the deities at an ISKCON ceremony"
            className="w-full h-72 md:h-96 object-cover"
            loading="lazy"
            onError={(e) => {
              if (e.target.src !== IMG.kirtanSaptah) e.target.src = IMG.kirtanSaptah
            }}
          />
        </div>

        {/* ===================== THE THREE ESSENCES ===================== */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-14">
          <InfoCard
            icon="🪘"
            title="Kirtan"
            desc="The program opens with melodious chanting of the holy names — Hare Krishna — accompanied by mridanga, kartals and harmonium. Everyone joins in, filling the home with devotion."
          />
          <InfoCard
            icon="📖"
            title="Katha"
            desc="Scriptural wisdom from the Bhagavad-gita, Srimad Bhagavatam and the teachings of Srila Prabhupada, shared simply and practically in a close, home-like setting."
          />
          <InfoCard
            icon="🍛"
            title="Prasadam"
            desc="The program ends with a sumptuous vegetarian feast offered to Krishna and served as prasadam — a shared meal that deepens friendship and community."
          />
        </div>

        {/* ===================== WHAT TO EXPECT ===================== */}
        <div className="rounded-3xl p-8 md:p-12 mb-14 text-white" style={{ background: 'linear-gradient(135deg, var(--theme-cta-from), var(--theme-cta-to))' }}>
          <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center">What to expect at a house program</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              ['🏡', 'A warm welcome', 'Devotees gather at a devotee\u2019s home, hosted with love and hospitality.'],
              ['🪘', 'Kirtan', 'Chanting with mridanga, kartals and harmonium — everyone participates.'],
              ['📖', 'Katha', 'A short, spoken class on scripture that is easy to follow and apply.'],
              ['🍛', 'Prasadam', 'A delicious vegetarian feast offered to Krishna, shared together.'],
              ['💬', 'Discussion & q&a', 'Questions and conversation in a friendly, informal setting.'],
              ['🙏', 'Seva & service', 'A chance to serve — from cooking to hosting — and grow in devotion.'],
            ].map(([icon, title, desc]) => (
              <div key={title} className="flex items-start gap-4 bg-white/10 rounded-2xl p-5 backdrop-blur-sm">
                <span className="text-3xl">{icon}</span>
                <div>
                  <p className="font-bold mb-1">{title}</p>
                  <p className="text-sm" style={{ color: 'var(--theme-text-soft)' }}>{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ===================== GALLERY ===================== */}
        <div className="mb-14">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800 text-center mb-8">Kirtan & community, in pictures</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="rounded-2xl overflow-hidden shadow-lg">
              <img src={IMG.kirtanChildren} alt="Kirtan with children" className="w-full h-40 md:h-48 object-cover" loading="lazy" onError={(e) => { if (e.target.src !== IMG.kirtanSaptah) e.target.src = IMG.kirtanSaptah }} />
            </div>
            <div className="rounded-2xl overflow-hidden shadow-lg">
              <img src={IMG.kirtanMoody} alt="Evening kirtan by candlelight" className="w-full h-40 md:h-48 object-cover" loading="lazy" onError={(e) => { if (e.target.src !== IMG.kirtanSaptah) e.target.src = IMG.kirtanSaptah }} />
            </div>
            <div className="rounded-2xl overflow-hidden shadow-lg">
              <img src={IMG.harinam} alt="Harinam kirtan on the streets" className="w-full h-40 md:h-48 object-cover" loading="lazy" onError={(e) => { if (e.target.src !== IMG.kirtanSaptah) e.target.src = IMG.kirtanSaptah }} />
            </div>
            <div className="rounded-2xl overflow-hidden shadow-lg">
              <img src={IMG.kirtanSaptah} alt="Kirtan gathering" className="w-full h-40 md:h-48 object-cover" loading="lazy" onError={(e) => { if (e.target.src !== IMG.harinam) e.target.src = IMG.harinam }} />
            </div>
          </div>
        </div>

        {/* ===================== CTA ===================== */}
        <div className="text-center rounded-3xl p-10 md:p-14 bg-white shadow-xl border border-gray-100">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-3">Bring the program to your home</h2>
          <p className="text-gray-500 mb-8 max-w-xl mx-auto">
            Host a house program, or join one nearby — chant, hear and feast together in the company of devotees.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/bhakti-viksha"
              className="text-white font-bold px-8 py-3 rounded-full transition-all duration-300 hover:scale-105"
              style={{ background: 'linear-gradient(90deg, var(--theme-cta-from), var(--theme-cta-to))' }}
            >
              Back to BhaktiVriksha
            </Link>
            <Link
              to="/bhakti-viksha#register"
              className="font-semibold px-8 py-3 rounded-full border-2 transition-all duration-300 hover:scale-105"
              style={{ borderColor: 'var(--theme-cta-from)', color: 'var(--theme-cta-from)' }}
            >
              Join a House Program
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}