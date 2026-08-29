import { Link } from 'react-router-dom'

export default function PersonalityDevelopmentPage() {
  return (
    <div className="min-h-[calc(100vh-8rem)] bg-white py-12 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto">
        {/* Breadcrumbs */}
        <div className="text-sm text-gray-500 mb-6 flex items-center gap-2">
          <Link to="/" className="hover:text-[var(--theme-cta-from)] transition-colors">Home</Link>
          <span>›</span>
          <Link to="/iyf" className="hover:text-[var(--theme-cta-from)] transition-colors">IYF</Link>
          <span>›</span>
          <span className="font-medium text-gray-800">Personality Development</span>
        </div>

        {/* Header */}
        <div className="flex items-center gap-4 mb-4">
          <div className="w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0 bg-white border border-gray-100 shadow-sm p-2">
            <img src="/images/iyf_personality_dev.png" alt="Personality Development Icon" className="w-full h-full object-contain" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900">Personality Development</h1>
        </div>
        
        <p className="text-gray-600 text-lg max-w-2xl mb-10 leading-relaxed">
          Public speaking, leadership, debates and soft-skill training to build confidence and character.
        </p>

        {/* Feature Display */}
        <div className="bg-gradient-to-br from-indigo-50/50 to-white border border-gray-100 rounded-3xl p-6 md:p-8 mb-12 shadow-sm flex flex-col items-center text-center">
          <img src="/images/iyf_personality_dev.png" alt="Personality Development" className="w-full max-w-md h-auto object-contain rounded-2xl shadow-xl mb-6 hover:scale-105 transition-transform duration-500" />
          <p className="text-gray-600 max-w-xl text-base leading-relaxed">
            Build essential life skills, character, and spiritual confidence through interactive workshops, public speaking forums, and leadership seminars tailored for today's youth.
          </p>
        </div>

        <div className="rounded-3xl p-10 text-center text-white" style={{ background: 'linear-gradient(135deg, var(--theme-cta-from), var(--theme-cta-to))' }}>
          <h2 className="text-2xl font-bold mb-6">Build your skills</h2>
          <Link to="/iyf#register" className="inline-block bg-white text-gray-900 font-bold px-8 py-3 rounded-full hover:bg-gray-50 hover:scale-105 transition-all duration-300 shadow-md">
            Join the forum
          </Link>
        </div>
      </div>
    </div>
  )
}
