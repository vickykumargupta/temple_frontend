import { InfoCard } from '../../components/ui'
import ProgramRegistrationForm from '../../components/ProgramRegistrationForm'
import { registerImyf, getAuth } from '../../services/api'

export default function ImyfSection() {
  const email = getAuth()?.email || ''
  return (
    <section id="imyf" className="scroll-mt-16 py-20" style={{ background: 'linear-gradient(to bottom, #ffffff, var(--theme-soft-from))' }}>
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-14">
          <div className="inline-block text-white text-sm font-bold px-4 py-1 rounded-full mb-5" style={{ background: 'linear-gradient(90deg, var(--theme-cta-from), var(--theme-cta-to))' }}>
            ISKCON Men & Youth Forum
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">IMYF</h2>
          <p className="text-gray-500 text-lg max-w-2xl mx-auto">
            Dedicated to the spiritual and personal growth of young men — discipline, responsibility,
            and devotion through the teachings of Srila Prabhupada.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-14">
          <InfoCard
            icon="🛡️"
            title="Character Building"
            desc="Training in discipline, responsibility and integrity to become strong leaders of society."
          />
          <InfoCard
            icon="📿"
            title="Devotional Practice"
            desc="Structured programs in japa, sadhana and scriptural study for a strong spiritual foundation."
          />
          <InfoCard
            icon="👨‍🏫"
            title="Mentorship"
            desc="Guidance from senior devotees and teachers on life, career and spiritual progress."
          />
          <InfoCard
            icon="💪"
            title="Health & Fitness"
            desc="Programs for physical health, energy and a balanced lifestyle — a healthy body for a healthy mind."
          />
          <InfoCard
            icon="🎤"
            title="Public Speaking"
            desc="Developing the skills to present Krishna consciousness with logic, conviction and clarity."
          />
          <InfoCard
            icon="🤝"
            title="Brotherhood"
            desc="A supportive community of young men walking the path of bhakti together."
          />
        </div>

        <div className="text-white rounded-3xl p-10 md:p-14 text-center" style={{ background: 'linear-gradient(90deg, var(--theme-cta-from), var(--theme-cta-to))' }}>
          <h3 className="text-2xl md:text-3xl font-bold mb-3">Grow in Brotherhood & Devotion</h3>
          <p className="mb-8 max-w-xl mx-auto" style={{ color: 'var(--theme-text-soft)' }}>
            Join young men who are serious about living a life of values, culture and Krishna consciousness.
          </p>
          <a
            href="#register"
            className="bg-white font-bold text-lg px-10 py-4 rounded-full hover:bg-white/90 transition-all duration-300 hover:scale-105 shadow-xl inline-block"
            style={{ color: 'var(--theme-cta-from)' }}
          >
            Join IMYF
          </a>
        </div>
      </div>

      <div id="register" className="bg-white py-16 scroll-mt-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            Join IMYF
          </h2>
          <div className="w-20 h-1 mx-auto mb-8 rounded-full" style={{ background: 'linear-gradient(90deg, var(--theme-cta-from), var(--theme-cta-to))' }}></div>
          <p className="text-gray-600 mb-10">
            For corporate employees — fill in your details below to join the ISKCON Men & Youth Forum community
          </p>
          <ProgramRegistrationForm
            title="IMYF Professional Registration"
            program="IMYF"
            registerFn={registerImyf}
            intro="IMYF is open to corporate employees"
            fields={[
              { name: 'fullName', label: 'Full Name', type: 'text', required: true, placeholder: 'Enter your full name' },
              { name: 'email', label: 'Email', type: 'email', required: true, placeholder: 'Enter your email', defaultValue: email },
              { name: 'phone', label: 'Phone', type: 'tel', required: true, placeholder: 'Enter your phone number' },
              { name: 'age', label: 'Age', type: 'number', placeholder: 'Enter your age' },
              { name: 'company', label: 'Company', type: 'text', placeholder: 'Enter your company name' },
              { name: 'designation', label: 'Designation / Role', type: 'text', placeholder: 'e.g. Software Engineer, Manager' },
              { name: 'industry', label: 'Industry', type: 'text', placeholder: 'e.g. IT, Finance, Healthcare' },
              { name: 'interests', label: 'Interests', type: 'textarea', fullWidth: true, placeholder: 'What areas interest you most? (kirtan, Gita classes, service, etc.)' },
            ]}
          />
        </div>
      </div>
    </section>
  )
}
