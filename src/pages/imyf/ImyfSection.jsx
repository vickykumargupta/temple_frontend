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
            ISKCON BhaktiVriksha
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">BhaktiVriksha</h2>
          <p className="text-gray-500 text-lg max-w-2xl mx-auto">
            A family-centric spiritual community for married couples, senior devotees and families —
            growing together in devotion, service and mutual care.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-14">
          <InfoCard
            icon="👨‍👩‍👧‍👦"
            title="Family Friendly"
            desc="Programs designed for couples, parents and children to practice Krishna consciousness together."
          />
          <InfoCard
            icon="🏡"
            title="House Program"
            desc="Small gatherings in devotee homes — chant, discuss scripture and share prasadam in a warm setting."
            to="/imyf/house-program"
          />
          <InfoCard
            icon="📿"
            title="Sadhana & Japa"
            desc="Guided chanting and devotional routines that fit gracefully into family and senior life."
          />
          <InfoCard
            icon="🧠"
            title="Wisdom Sharing"
            desc="Learnings from the Bhagavad-gita and Srila Prabhupada, shared in an accessible, relatable way."
            to="/imyf/wisdom-sharing"
          />
          <InfoCard
            icon="💞"
            title="Mutual Care"
            desc="A support network where families and senior devotees look after one another through life's journey."
          />
          <InfoCard
            icon="🙏"
            title="Service Opportunities"
            desc="Engage in meaningful temple and community service suited to your time and stage of life."
          />
        </div>

        <div className="text-white rounded-3xl p-10 md:p-14 text-center" style={{ background: 'linear-gradient(90deg, var(--theme-cta-from), var(--theme-cta-to))' }}>
          <h3 className="text-2xl md:text-3xl font-bold mb-3">Grow Together in Bhakti</h3>
          <p className="mb-8 max-w-xl mx-auto" style={{ color: 'var(--theme-text-soft)' }}>
            Join a community of families and devotees practising Krishna consciousness at every stage of life.
          </p>
          <a
            href="#register"
            className="bg-white font-bold text-lg px-10 py-4 rounded-full hover:bg-white/90 transition-all duration-300 hover:scale-105 shadow-xl inline-block"
            style={{ color: 'var(--theme-cta-from)' }}
          >
            Join BhaktiVriksha
          </a>
        </div>
      </div>

      <div id="register" className="bg-white py-16 scroll-mt-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            Join BhaktiVriksha
          </h2>
          <div className="w-20 h-1 mx-auto mb-8 rounded-full" style={{ background: 'linear-gradient(90deg, var(--theme-cta-from), var(--theme-cta-to))' }}></div>
          <p className="text-gray-600 mb-10">
            For married couples, senior devotees and families — fill in your details below to join the BhaktiVriksha community
          </p>
          <ProgramRegistrationForm
            title="BhaktiVriksha Registration"
            program="BhaktiVriksha"
            registerFn={registerImyf}
            intro="BhaktiVriksha is open to married & senior devotees and families"
            fields={[
              { name: 'gender', label: 'Gender', type: 'select', required: true, options: ['Male', 'Female'], placeholder: 'Select gender' },
              { name: 'fullName', label: 'Full Name', type: 'text', required: true, placeholder: 'Enter your full name' },
              { name: 'email', label: 'Email', type: 'email', required: true, placeholder: 'Enter your email', defaultValue: email },
              { name: 'phone', label: 'Phone', type: 'tel', required: true, placeholder: 'Enter your phone number' },
              { name: 'age', label: 'Age', type: 'number', placeholder: 'Enter your age' },
              { name: 'spouseName', label: 'Spouse Name (if applicable)', type: 'text', placeholder: 'Enter spouse name' },
              { name: 'familyMembers', label: 'Number of Family Members', type: 'number', placeholder: 'Enter number of family members' },
              { name: 'occupation', label: 'Occupation', type: 'text', placeholder: 'e.g. Homemaker, Teacher, Business' },
              { name: 'interests', label: 'Interests', type: 'textarea', fullWidth: true, placeholder: 'What areas interest you most? (home programs, Gita classes, seva, etc.)' },
            ]}
          />
        </div>
      </div>
    </section>
  )
}
