import { Link } from 'react-router-dom'
import { InfoCard } from '../../components/ui'
import ProgramRegistrationForm from '../../components/ProgramRegistrationForm'
import { registerIyf, getAuth } from '../../services/api'

export default function IyfSection() {
  const auth = getAuth()
  const email = auth?.role === 'admin' ? '' : (auth?.email || '')
  return (
    <section id="iyf" className="scroll-mt-16 py-20" style={{ background: 'linear-gradient(to bottom, var(--theme-soft-to), var(--theme-soft-from), #ffffff)' }}>
      <div className="max-w-7xl mx-auto px-4">
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
          <div className="relative group">
            <Link
              to="/iyf/retreats-camps"
              className="block bg-gradient-to-b from-amber-50/40 via-white to-white rounded-2xl shadow-md p-7 hover:shadow-2xl hover:-translate-y-1.5 transition-all duration-300 border-2 border-amber-400/60 ring-4 ring-amber-400/10 h-full relative overflow-hidden"
            >
              <div className="absolute top-3 right-3 bg-gradient-to-r from-amber-500 to-orange-500 text-white text-[11px] font-black uppercase tracking-widest px-3 py-1 rounded-full shadow-md animate-pulse">
                🌟 Spotlight
              </div>
              <div className="w-16 h-16 mb-4 flex items-center justify-center overflow-hidden rounded-2xl bg-white border border-gray-100 shadow-sm p-1">
                <img src="/images/iyf_retreats_camps.png" alt="Retreats & Camps" className="w-full h-full object-cover animate-breathe-zoom" />
              </div>
              <h3 className="text-xl font-extrabold text-gray-900 mb-1 flex items-center gap-1.5">
                Retreats & Camps
              </h3>
              <p className="text-[13px] md:text-xs text-amber-700 font-bold mb-3 tracking-wide">
                Special Youth Outings & Immersive Programs
              </p>
              <p className="text-sm text-gray-500 leading-relaxed mb-4">
                Yoga retreats, holy yatras, festive camps & spiritual residential home stays to rejuvenate the mind and soul.
              </p>

              {/* Three Interactive Program Badges */}
              <div className="flex flex-wrap gap-1.5 mb-4">
                <span className="inline-flex items-center gap-1 bg-amber-100/80 text-amber-900 text-[14px] md:text-[11px] font-extrabold px-3 py-1 rounded-lg border border-amber-200 shadow-xs">
                  🎪 Youth Fest
                </span>
                <span className="inline-flex items-center gap-1 bg-orange-100/80 text-orange-900 text-[14px] md:text-[11px] font-extrabold px-3 py-1 rounded-lg border border-orange-200 shadow-xs">
                  🚩 Yatra Retreat
                </span>
                <span className="inline-flex items-center gap-1 bg-emerald-100/80 text-emerald-900 text-[14px] md:text-[11px] font-extrabold px-3 py-1 rounded-lg border border-emerald-200 shadow-xs">
                  🏡 Krishna&apos;s Home
                </span>
              </div>

              <span className="inline-flex items-center text-sm font-extrabold text-amber-600 group-hover:text-amber-700">
                Choose Program & Register →
              </span>
            </Link>
          </div>

          <InfoCard
            image="/images/iyf_gita_classes.png"
            title="Gita Classes"
            desc="Weekly classes and courses like Discover Your Self (DYS), helping students understand the science of the soul."
            to="/iyf/gita-classes"
          />
          <InfoCard
            image="/images/iyf_personality_dev.png"
            title="Personality Development"
            desc="Public speaking, leadership, debates and soft-skill training to build confidence and character."
            to="/iyf/personality-development"
          />
          <InfoCard
            image="/images/iyf_kirtan_culture.png"
            title="Kirtan & Culture"
            desc="Music, drama, mantra meditation and cultural programs that make spiritual life joyful."
            to="/iyf/kirtan-culture"
          />
          <InfoCard
            icon="🏫"
            title="Campus Preaching"
            desc="Seminars and programs in colleges and companies spreading Vedic knowledge across campuses."
            to="/iyf/campus-preaching"
          />
          <InfoCard
            image="/images/iyf_community_service.png"
            title="Community Service"
            desc="Harinama sankirtana, book distribution and serving prasadam to the wider community."
            to="/iyf/community-service"
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
        <div className="max-w-7xl mx-auto px-4 text-center">
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
              { name: 'gender', label: 'Gender', type: 'select', required: true, options: ['Male', 'Female'], placeholder: 'Select gender' },
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
