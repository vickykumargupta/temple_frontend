import { InfoCard } from '../../components/ui'
import ProgramRegistrationForm from '../../components/ProgramRegistrationForm'
import { registerIyf, getAuth } from '../../services/api'

export default function IyfSection() {
  const email = getAuth()?.email || ''
  return (
    <section id="iyf" className="scroll-mt-16 py-20" style={{ background: 'linear-gradient(to bottom, var(--theme-soft-to), var(--theme-soft-from), #ffffff)' }}>
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-14">
          <div className="inline-block text-white text-sm font-bold px-4 py-1 rounded-full mb-5" style={{ background: 'linear-gradient(90deg, var(--theme-cta-from), var(--theme-cta-to))' }}>
            ISKCON Youth Forum
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">IYF</h2>
          <p className="text-gray-500 text-lg max-w-2xl mx-auto">
            Empowering the youth with the timeless wisdom of the Bhagavad Gita and Krishna consciousness —
            building character, values and a life of purpose.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-14">
          <InfoCard
            icon="📖"
            title="Gita Classes"
            desc="Weekly classes and courses like Discover Your Self (DYS), helping students understand the science of the soul."
          />
          <InfoCard
            icon="🗣️"
            title="Personality Development"
            desc="Public speaking, leadership, debates and soft-skill training to build confidence and character."
          />
          <InfoCard
            icon="🎵"
            title="Kirtan & Culture"
            desc="Music, drama, mantra meditation and cultural programs that make spiritual life joyful."
          />
          <InfoCard
            icon="🧘"
            title="Retreats & Camps"
            desc="Yoga retreats, picnics and residential camps to rejuvenate the mind, body and soul."
          />
          <InfoCard
            icon="🏫"
            title="Campus Preaching"
            desc="Seminars and programs in colleges and companies spreading Vedic knowledge across campuses."
          />
          <InfoCard
            icon="🙏"
            title="Community Service"
            desc="Harinama sankirtana, book distribution and serving prasadam to the wider community."
          />
        </div>

        <div className="text-white rounded-3xl p-10 md:p-14 text-center" style={{ background: 'linear-gradient(90deg, var(--theme-cta-from), var(--theme-cta-to))' }}>
          <h3 className="text-2xl md:text-3xl font-bold mb-3">Be part of the Youth Forum</h3>
          <p className="mb-8 max-w-xl mx-auto" style={{ color: 'var(--theme-text-soft)' }}>
            Join a community of dynamic young devotees growing together in Krishna consciousness.
          </p>
          <a
            href="#register"
            className="bg-white font-bold text-lg px-10 py-4 rounded-full hover:bg-white/90 transition-all duration-300 hover:scale-105 shadow-xl inline-block"
            style={{ color: 'var(--theme-cta-from)' }}
          >
            Join IYF
          </a>
        </div>
      </div>

      <div id="register" className="bg-white py-16 scroll-mt-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            Join IYF
          </h2>
          <div className="w-20 h-1 mx-auto mb-8 rounded-full" style={{ background: 'linear-gradient(90deg, var(--theme-cta-from), var(--theme-cta-to))' }}></div>
          <p className="text-gray-600 mb-10">
            For college students — fill in your details below to join the ISKCON Youth Forum community
          </p>
          <ProgramRegistrationForm
            title="IYF Student Registration"
            program="IYF"
            registerFn={registerIyf}
            intro="IYF is open to college students"
            fields={[
              { name: 'fullName', label: 'Full Name', type: 'text', required: true, placeholder: 'Enter your full name' },
              { name: 'email', label: 'Email', type: 'email', required: true, placeholder: 'Enter your email', defaultValue: email },
              { name: 'phone', label: 'Phone', type: 'tel', required: true, placeholder: 'Enter your phone number' },
              { name: 'age', label: 'Age', type: 'number', placeholder: 'Enter your age' },
              { name: 'college', label: 'College Name', type: 'text', placeholder: 'Enter your college name' },
              { name: 'course', label: 'Course / Stream', type: 'text', placeholder: 'e.g. B.Tech, BBA, BSc' },
              { name: 'yearOfStudy', label: 'Year of Study', type: 'text', placeholder: 'e.g. 2nd Year' },
              { name: 'interests', label: 'Interests', type: 'textarea', fullWidth: true, placeholder: 'What areas interest you most? (kirtan, Gita classes, service, etc.)' },
            ]}
          />
        </div>
      </div>
    </section>
  )
}
