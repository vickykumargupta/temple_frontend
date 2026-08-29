import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

const CLASSES_DATA = [
  {
    id: 0,
    time: 'Every Sunday, 6pm',
    title: 'Discover Your Self (DYS)',
    shortDesc: 'An 8-week course on identity, purpose and the soul, built for college-age youth.',
    content: (
      <>
        <h4 className="text-lg font-bold text-gray-800 mb-2">About the Course</h4>
        <p className="text-gray-600 mb-4 text-sm leading-relaxed">
          The "Discover Your Self" (DYS) course is a foundational 8-week program designed specifically for youths and college students. It systematically explains the science of the soul, the existence of God, and the practical application of the Bhagavad Gita in modern life.
        </p>
        <h4 className="text-md font-bold text-gray-800 mb-2">Key Topics</h4>
        <ul className="list-disc pl-5 text-gray-600 mb-4 text-sm space-y-1">
          <li>Can scientists create life?</li>
          <li>Who am I? The science of the soul.</li>
          <li>The peace formula for the modern age.</li>
          <li>Why do bad things happen to good people?</li>
        </ul>
        <p className="text-gray-600 text-sm italic">Prasadam (dinner) is served after every session.</p>
      </>
    )
  },
  {
    id: 1,
    time: 'Tue and Thu, 7pm',
    title: 'Bhagavad-gita study circle',
    shortDesc: 'Verse-by-verse reading and discussion, open to all levels.',
    content: (
      <>
        <h4 className="text-lg font-bold text-gray-800 mb-2">Deep Dive into the Gita</h4>
        <p className="text-gray-600 mb-4 text-sm leading-relaxed">
          Join our intimate study circle as we read through the "Bhagavad Gita As It Is" verse by verse. This interactive session allows you to ask questions, share realizations, and understand the deep philosophical purports given by Srila Prabhupada.
        </p>
        <h4 className="text-md font-bold text-gray-800 mb-2">Format</h4>
        <ul className="list-disc pl-5 text-gray-600 mb-4 text-sm space-y-1">
          <li>Sanskrit recitation practice.</li>
          <li>Reading of translation and purport.</li>
          <li>Group discussion and Q&A.</li>
        </ul>
        <p className="text-gray-600 text-sm">Open to beginners and advanced practitioners alike.</p>
      </>
    )
  },
  {
    id: 2,
    time: 'Monthly, Saturday',
    title: 'Weekend nectar class',
    shortDesc: 'A relaxed evening class pairing kirtan with a short Gita talk.',
    content: (
      <>
        <h4 className="text-lg font-bold text-gray-800 mb-2">Weekend Rejuvenation</h4>
        <p className="text-gray-600 mb-4 text-sm leading-relaxed">
          Step away from the stress of the workweek and immerse yourself in the nectar of the holy names. This monthly program features extended ecstatic Kirtan followed by an engaging, practical talk on a specific theme from the Bhagavad Gita.
        </p>
        <h4 className="text-md font-bold text-gray-800 mb-2">Highlights</h4>
        <ul className="list-disc pl-5 text-gray-600 mb-4 text-sm space-y-1">
          <li>1 Hour of soul-stirring Kirtan.</li>
          <li>Interactive, relatable Krishna conscious lecture.</li>
          <li>Networking and association with like-minded youth.</li>
          <li>Special Saturday Feast Prasadam.</li>
        </ul>
      </>
    )
  },
  {
    id: 3,
    time: 'Seasonal',
    title: 'Gita Jayanti intensive',
    shortDesc: 'A focused week-long deep dive around the festival of Gita Jayanti.',
    content: (
      <>
        <h4 className="text-lg font-bold text-gray-800 mb-2">Celebrate the Advent of the Gita</h4>
        <p className="text-gray-600 mb-4 text-sm leading-relaxed">
          Gita Jayanti marks the day Lord Krishna spoke the Bhagavad Gita to Arjuna on the battlefield of Kurukshetra. During this sacred time, we host an intensive 7-day retreat focused entirely on mastering the key concepts of the Gita.
        </p>
        <h4 className="text-md font-bold text-gray-800 mb-2">What to Expect</h4>
        <ul className="list-disc pl-5 text-gray-600 mb-4 text-sm space-y-1">
          <li>Daily seminars by senior devotees.</li>
          <li>Complete recitation of all 700 verses of the Gita.</li>
          <li>Maha-Yajna (fire sacrifice) for world peace.</li>
          <li>Book distribution drives in the local community.</li>
        </ul>
      </>
    )
  }
]

export default function GitaClassesPage() {
  const [activeCard, setActiveCard] = useState(null)

  // Prevent background scrolling when mobile modal is open
  useEffect(() => {
    if (activeCard !== null && window.innerWidth < 768) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => { document.body.style.overflow = 'unset' }
  }, [activeCard])

  const handleCardClick = (id) => {
    if (activeCard === id) {
      setActiveCard(null)
    } else {
      setActiveCard(id)
    }
  }

  return (
    <div className="min-h-[calc(100vh-8rem)] bg-white py-12 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto">
        {/* Breadcrumbs */}
        <div className="text-sm text-gray-500 mb-6 flex items-center gap-2">
          <Link to="/" className="hover:text-[var(--theme-cta-from)] transition-colors">Home</Link>
          <span>›</span>
          <Link to="/iyf" className="hover:text-[var(--theme-cta-from)] transition-colors">IYF</Link>
          <span>›</span>
          <span className="font-medium text-gray-800">Gita Classes</span>
        </div>

        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 mb-10">
          <div className="flex-1">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0 bg-white border border-gray-100 shadow-sm p-2">
                <img src="/images/iyf_gita_classes.png" alt="Gita Classes Icon" className="w-full h-full object-contain" />
              </div>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900">Gita Classes</h1>
            </div>
            
            <p className="text-gray-600 text-lg max-w-xl leading-relaxed">
              Weekly classes and courses like Discover Your Self (DYS), helping students understand the science of the soul.
            </p>
          </div>
          

        </div>

        {/* Classes Grid with Popover Logic */}
        <div className="relative grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {CLASSES_DATA.map((card) => (
            <div 
              key={card.id}
              onClick={() => handleCardClick(card.id)}
              className={`bg-gray-50 border border-gray-200 rounded-2xl p-6 transition-all duration-300 cursor-pointer 
                ${activeCard === card.id ? 'ring-2 ring-[var(--theme-cta-from)] shadow-md bg-white' : 'hover:shadow-lg hover:-translate-y-1 hover:border-gray-300'}
                ${activeCard !== null && activeCard !== card.id ? 'opacity-40 pointer-events-none' : 'opacity-100'}`}
            >
              <span className="inline-block text-xs font-bold px-3 py-1 rounded-md mb-4" style={{ color: 'var(--theme-cta-from)', background: 'var(--theme-soft-from)' }}>
                {card.time}
              </span>
              <h3 className="text-xl font-bold text-gray-800 mb-2">{card.title}</h3>
              <p className="text-gray-500 mb-6 text-sm leading-relaxed">
                {card.shortDesc}
              </p>
              <button 
                className="inline-flex items-center text-sm font-bold transition-colors hover:opacity-80" 
                style={{ color: 'var(--theme-cta-from)' }}
                onClick={(e) => {
                  e.stopPropagation();
                  handleCardClick(card.id);
                }}
              >
                {activeCard === card.id ? 'Close Details' : 'Know more'} <span className="ml-1">{activeCard === card.id ? '✕' : '→'}</span>
              </button>
            </div>
          ))}

          {/* Desktop Popover Overlay */}
          {activeCard !== null && (
            <div 
              className={`hidden md:flex absolute top-0 bottom-0 z-10 transition-all duration-500
                ${activeCard % 2 === 0 ? 'left-1/2 right-0 ml-3' : 'right-1/2 left-0 mr-3'}
              `}
            >
              <div className="bg-white rounded-2xl shadow-2xl border border-gray-100 p-6 flex flex-col w-full h-full animate-fade-in relative overflow-y-auto">
                <button 
                  onClick={() => setActiveCard(null)}
                  className="absolute top-4 right-4 text-gray-400 hover:text-gray-800 transition-colors w-8 h-8 flex items-center justify-center rounded-full bg-gray-50 hover:bg-gray-200"
                >
                  ✕
                </button>
                <div className="mb-4 pr-8">
                  <h3 className="text-2xl font-bold text-gray-900" style={{ color: 'var(--theme-cta-from)' }}>{CLASSES_DATA[activeCard].title}</h3>
                </div>
                <div className="flex-1">
                  {CLASSES_DATA[activeCard].content}
                </div>
                <div className="mt-6 pt-4 border-t border-gray-100">
                  <Link 
                    to="/iyf#register" 
                    className="block w-full text-center text-white font-bold py-3 px-6 rounded-xl transition hover:opacity-90 shadow-md"
                    style={{ background: 'linear-gradient(90deg, var(--theme-cta-from), var(--theme-cta-to))' }}
                  >
                    Register Now
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Mobile Modal Fallback */}
        {activeCard !== null && (
          <div className="md:hidden fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setActiveCard(null)}></div>
            <div className="bg-white rounded-2xl shadow-2xl w-full max-h-[85vh] flex flex-col relative z-10 animate-fade-in">
              <div className="p-5 border-b border-gray-100 flex justify-between items-center shrink-0">
                <h3 className="text-xl font-bold text-gray-900" style={{ color: 'var(--theme-cta-from)' }}>
                  {CLASSES_DATA[activeCard].title}
                </h3>
                <button 
                  onClick={() => setActiveCard(null)}
                  className="text-gray-400 hover:text-gray-800 transition-colors w-8 h-8 flex items-center justify-center rounded-full bg-gray-50 hover:bg-gray-200"
                >
                  ✕
                </button>
              </div>
              <div className="p-6 overflow-y-auto">
                {CLASSES_DATA[activeCard].content}
              </div>
              <div className="p-5 border-t border-gray-100 shrink-0">
                <Link 
                  to="/iyf#register" 
                  className="block w-full text-center text-white font-bold py-3 px-6 rounded-xl transition hover:opacity-90 shadow-md"
                  style={{ background: 'linear-gradient(90deg, var(--theme-cta-from), var(--theme-cta-to))' }}
                >
                  Register Now
                </Link>
              </div>
            </div>
          </div>
        )}

        {/* Call to Action */}
        <div className="rounded-3xl p-10 text-center text-white" style={{ background: 'linear-gradient(135deg, var(--theme-cta-from), var(--theme-cta-to))' }}>
          <h2 className="text-2xl font-bold mb-6">Begin your Gita journey</h2>
          <Link to="/iyf#register" className="inline-block bg-white text-gray-900 font-bold px-8 py-3 rounded-full hover:bg-gray-50 hover:scale-105 transition-all duration-300 shadow-md">
            Join a class
          </Link>
        </div>
      </div>
    </div>
  )
}
