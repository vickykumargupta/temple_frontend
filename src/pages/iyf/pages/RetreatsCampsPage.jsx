import { useState, useRef } from 'react'
import { Link } from 'react-router-dom'
import { registerIyf, getAuth } from '../../../services/api'
import { sanitizeAndAutofillEmail } from '../../../utils/emailSanitizer'

const PROGRAMS = [
  {
    id: 'youth-fest',
    name: 'Youth Fest',
    icon: '🎪',
    tagline: 'Mega Youth Festival & Cultural Gathering',
    description: 'Dynamic cultural events, spiritual competitions, thought-provoking keynote sessions, drama, and ecstatic kirtan.',
    badge: 'Annual Fest',
    badgeColor: 'bg-blue-100 text-blue-900 border-blue-300',
  },
  {
    id: 'yatra-retreat',
    name: 'Yatra Retreat',
    icon: '🚩',
    tagline: 'Pilgrimage, Camps & Holy Dham Parikrama',
    description: 'Rejuvenating journeys to holy dhams, outdoor meditation camps, hill treks, and guided sacred parikramas.',
    badge: 'Spiritual Tour',
    badgeColor: 'bg-indigo-100 text-indigo-900 border-indigo-300',
  },
  {
    id: 'krishna-home',
    name: "Krishna's Home",
    icon: '🏡',
    tagline: 'Ashram Living & Youth Residential Stay',
    description: 'Experience authentic temple lifestyle, peaceful morning sadhana, sattvic prasadam, and deep philosophical study.',
    badge: 'Weekend / Monthly',
    badgeColor: 'bg-sky-100 text-sky-900 border-sky-300',
  },
]

export default function RetreatsCampsPage() {
  const auth = getAuth()
  const userEmail = auth?.role === 'admin' ? '' : (auth?.email || '')

  // Multi-select programs state (can select 1, 2, or all 3)
  const [selectedPrograms, setSelectedPrograms] = useState(['youth-fest'])

  // Form State
  const [formData, setFormData] = useState({
    fullName: '',
    email: userEmail,
    phone: '',
    gender: 'Male',
    age: '',
    occupationType: 'college', // 'college' | 'workplace'
    college: '',
    company: '',
    customInterest: '',
  })

  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')

  // Field Refs for smooth Enter key navigation and error focusing
  const fullNameRef = useRef(null)
  const phoneRef = useRef(null)
  const emailRef = useRef(null)
  const genderRef = useRef(null)
  const ageRef = useRef(null)
  const collegeRef = useRef(null)
  const companyRef = useRef(null)
  const customInterestRef = useRef(null)

  // Handle program selection toggling
  const toggleProgram = (id) => {
    setSelectedPrograms((prev) => {
      if (prev.includes(id)) {
        if (prev.length === 1) return prev // Keep at least one selected
        return prev.filter((p) => p !== id)
      } else {
        return [...prev, id]
      }
    })
  }

  // Dynamic label and placeholder based on selected programs
  const getDynamicInterestField = () => {
    const hasKrishnaHome = selectedPrograms.includes('krishna-home')
    const hasYatra = selectedPrograms.includes('yatra-retreat')
    const hasYouthFest = selectedPrograms.includes('youth-fest')

    if (hasKrishnaHome && !hasYatra && !hasYouthFest) {
      return {
        label: 'Your Expectations',
        placeholder: 'Share your expectations from living the ashram / spiritual home experience...',
        help: "Tell us what you hope to experience at Krishna's Home stay",
      }
    }

    if (hasYatra && !hasKrishnaHome && !hasYouthFest) {
      return {
        label: 'Which Devotional Place You Choose',
        placeholder: 'e.g. Vrindavan, Mayapur, Tirupati, Udupi, or nearby holy dhams...',
        help: 'Mention your preferred pilgrimage destination or tour dates',
      }
    }

    if (hasYouthFest && !hasKrishnaHome && !hasYatra) {
      return {
        label: 'Your Interests',
        placeholder: 'e.g. Kirtan, drama, volunteering, debates, public speaking, music...',
        help: 'Tell us which events or activities interest you most in Youth Fest',
      }
    }

    if (hasKrishnaHome && hasYatra && !hasYouthFest) {
      return {
        label: 'Your Expectations & Preferred Holy Places',
        placeholder: 'Share your expectations and places you would love to visit with devotees...',
        help: 'Tell us about your ashram stay goals and favorite holy dhams',
      }
    }

    return {
      label: 'Your Interests & Expectations',
      placeholder: 'Share your expectations, preferred holy places, or specific event interests...',
      help: 'Feel free to share any specific preferences for your selected programs',
    }
  }

  const dynamicField = getDynamicInterestField()

  const validateForm = () => {
    if (!formData.fullName.trim()) {
      return { msg: 'Please enter your full name.', ref: fullNameRef }
    }
    if (formData.fullName.trim().length > 35) {
      return { msg: 'Full Name must be 35 characters or less.', ref: fullNameRef }
    }
    if (!formData.phone.trim()) {
      return { msg: 'Phone number is required.', ref: phoneRef }
    }
    if (formData.phone.length !== 10) {
      return { msg: 'Phone number must be exactly 10 digits.', ref: phoneRef }
    }
    if (!/^[6-9]/.test(formData.phone)) {
      return { msg: 'Phone number must start with 6, 7, 8, or 9.', ref: phoneRef }
    }
    if (!formData.email.trim()) {
      return { msg: 'Email address is required.', ref: emailRef }
    }
    const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRe.test(formData.email.trim())) {
      return { msg: 'Please enter a valid email address.', ref: emailRef }
    }
    if (formData.email.trim().length > 30) {
      return { msg: 'Email Address must be 30 characters or less.', ref: emailRef }
    }
    if (formData.occupationType === 'college') {
      if (!formData.college.trim()) {
        return { msg: 'College Name is mandatory for college students.', ref: collegeRef }
      }
      if (/^[0-9]/.test(formData.college.trim())) {
        return { msg: 'College Name cannot start with a number.', ref: collegeRef }
      }
    }
    if (formData.occupationType === 'workplace' && formData.company.trim()) {
      if (/^[0-9]/.test(formData.company.trim())) {
        return { msg: 'Company Name cannot start with a number.', ref: companyRef }
      }
    }
    return null
  }

  const handleSubmit = async (e) => {
    if (e) e.preventDefault()
    setError('')

    const valErr = validateForm()
    if (valErr) {
      setError(valErr.msg)
      valErr.ref?.current?.focus()
      return
    }

    const readablePrograms = selectedPrograms
      .map((p) => PROGRAMS.find((item) => item.id === p)?.name)
      .filter(Boolean)
      .join(', ')

    setLoading(true)
    try {
      await registerIyf({
        fullName: formData.fullName.trim(),
        email: formData.email.trim(),
        phone: formData.phone.trim(),
        gender: formData.gender,
        age: formData.age ? parseInt(formData.age, 10) : undefined,
        occupationType: formData.occupationType,
        college: formData.occupationType === 'college' ? formData.college.trim() : undefined,
        company: formData.occupationType === 'workplace' ? formData.company.trim() : undefined,
        selectedPrograms: readablePrograms,
        interests: formData.customInterest.trim() || undefined,
      })

      setSuccess(true)
      setFormData({
        fullName: '',
        email: userEmail,
        phone: '',
        gender: 'Male',
        age: '',
        occupationType: 'college',
        college: '',
        company: '',
        customInterest: '',
      })
    } catch (err) {
      setError(err.message || 'Failed to submit registration. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div
      className="min-h-[calc(100vh-8rem)] py-12 px-4 sm:px-6"
      style={{ background: 'linear-gradient(to bottom, var(--theme-soft-to, #eff6ff), var(--theme-soft-from, #dbeafe), #ffffff)' }}
    >
      <div className="max-w-5xl mx-auto">
        {/* Breadcrumbs */}
        <div className="text-sm text-gray-500 mb-6 flex items-center gap-2">
          <Link to="/" className="hover:text-blue-600 transition-colors">Home</Link>
          <span>›</span>
          <Link to="/iyf" className="hover:text-blue-600 transition-colors">IYF</Link>
          <span>›</span>
          <span className="font-semibold text-gray-800">Retreats & Camps</span>
        </div>

        {/* Header */}
        <div className="text-center mb-10">
          <div
            className="inline-flex items-center gap-1.5 text-white text-xs font-black uppercase tracking-wider px-4 py-1.5 rounded-full mb-3 shadow-sm"
            style={{ background: 'linear-gradient(90deg, var(--theme-cta-from, #2563eb), var(--theme-cta-to, #7c3aed))' }}
          >
            ✨ Youth Special Programs
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-gray-900 tracking-tight mb-4">
            Retreats, Yatras & Youth Camps
          </h1>
          <p className="text-gray-600 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            Choose your preferred spiritual adventure — attend high-energy youth fests, travel on sacred pilgrimages, or experience peaceful ashram residential living.
          </p>
        </div>

        {/* Step 1: Interactive Program Selection Cards */}
        <div className="mb-14">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-lg sm:text-xl font-extrabold text-gray-900 flex items-center gap-2">
              <span className="flex items-center justify-center w-7 h-7 rounded-full bg-blue-600 text-white text-xs font-black">1</span>
              Select Programs of Interest:
            </h2>
            <span className="text-xs font-bold text-blue-800 bg-blue-100 px-3.5 py-1 rounded-full border border-blue-200">
              {selectedPrograms.length} Selected (Multi-select enabled)
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {PROGRAMS.map((prog) => {
              const isSelected = selectedPrograms.includes(prog.id)
              return (
                <div
                  key={prog.id}
                  onClick={() => toggleProgram(prog.id)}
                  className={`cursor-pointer rounded-2xl p-6 transition-all duration-300 border-2 relative flex flex-col justify-between select-none ${
                    isSelected
                      ? 'bg-gradient-to-b from-blue-50/80 via-white to-white border-blue-500 shadow-xl ring-4 ring-blue-500/20 -translate-y-1'
                      : 'bg-white border-gray-200 hover:border-blue-300 hover:shadow-md'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-3xl">{prog.icon}</span>
                      <div className="flex items-center gap-2">
                        {/* Increased badge text size by 1.5px (text-[11.5px]) */}
                        <span className={`text-[11.5px] font-extrabold px-3 py-1 rounded-full border tracking-wide ${prog.badgeColor}`}>
                          {prog.badge}
                        </span>
                        <div className={`w-6 h-6 rounded-full flex items-center justify-center border-2 transition-colors ${
                          isSelected ? 'bg-blue-600 border-blue-600 text-white' : 'border-gray-300 bg-white'
                        }`}>
                          {isSelected && <span className="text-xs font-black">✓</span>}
                        </div>
                      </div>
                    </div>

                    <h3 className="text-[19.5px] md:text-lg font-extrabold text-gray-900 mb-1">{prog.name}</h3>
                    <p className="text-xs font-bold text-blue-600 mb-2">{prog.tagline}</p>
                    <p className="text-xs text-gray-500 leading-relaxed">{prog.description}</p>
                  </div>

                  <div className="mt-5 pt-3 border-t border-gray-100 flex items-center justify-between text-xs font-bold">
                    <span className={isSelected ? 'text-blue-700' : 'text-gray-400'}>
                      {isSelected ? '● Included in form' : '○ Tap to select'}
                    </span>
                    <span className={isSelected ? 'text-blue-600 font-extrabold' : 'text-gray-400'}>
                      {isSelected ? 'Active' : 'Add +'}
                    </span>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Step 2: Dynamic Smart Registration Form */}
        <div id="register-form" className="bg-white rounded-3xl shadow-xl border border-gray-200/80 overflow-hidden mb-12">
          <div
            className="text-white p-6 sm:p-8 text-center relative overflow-hidden"
            style={{ background: 'linear-gradient(90deg, var(--theme-cta-from, #2563eb), var(--theme-cta-to, #7c3aed))' }}
          >
            <h2 className="text-xl sm:text-2xl font-black tracking-wide">
              Youth Program Registration
            </h2>
            <p className="text-[13px] sm:text-[15px] text-blue-100 mt-2 font-medium">
              Registering for:{' '}
              <span className="font-extrabold text-white underline decoration-blue-200 decoration-2 tracking-wide">
                {selectedPrograms.map((p) => PROGRAMS.find((item) => item.id === p)?.name).join(' & ')}
              </span>
            </p>
          </div>

          <div className="p-6 sm:p-10">
            {success ? (
              <div className="text-center py-10">
                <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4 text-3xl shadow-inner">
                  🎉
                </div>
                <h3 className="text-2xl font-black text-gray-900 mb-2">Hare Krishna! Registration Received</h3>
                <p className="text-gray-600 max-w-md mx-auto mb-6 text-sm">
                  Thank you for registering for{' '}
                  <strong className="text-blue-700 font-extrabold">
                    {selectedPrograms.map((p) => PROGRAMS.find((item) => item.id === p)?.name).join(' & ')}
                  </strong>
                  . Our IYF coordinators will contact you soon with schedule & event details.
                </p>
                <button
                  type="button"
                  onClick={() => setSuccess(false)}
                  className="bg-blue-600 hover:bg-blue-700 text-white font-extrabold px-8 py-3.5 rounded-full shadow-lg transition-all active:scale-95 text-[15.5px] cursor-pointer"
                >
                  Register Another Devotee
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                {error && (
                  <div className="bg-rose-50 border border-rose-200 text-rose-700 text-xs font-bold rounded-xl p-3.5">
                    ⚠️ {error}
                  </div>
                )}

                {/* Name & Phone */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-bold uppercase text-gray-700 mb-1.5">
                      Full Name <span className="text-rose-500">*</span>
                    </label>
                    <input
                      ref={fullNameRef}
                      type="text"
                      required
                      maxLength={35}
                      placeholder="Enter your full name"
                      value={formData.fullName}
                      onChange={(e) => {
                        // Strictly reject numeric digits and limit to 35 chars
                        const val = e.target.value.replace(/[0-9]/g, '').slice(0, 35)
                        setFormData({ ...formData, fullName: val })
                      }}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          e.preventDefault()
                          phoneRef.current?.focus()
                        }
                      }}
                      className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm font-semibold text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase text-gray-700 mb-1.5">
                      Mobile Number <span className="text-gray-400 text-[11px] lowercase font-normal">(10 digits)</span> <span className="text-rose-500">*</span>
                    </label>
                    <input
                      ref={phoneRef}
                      type="tel"
                      required
                      placeholder="e.g. 9876543210"
                      value={formData.phone}
                      onChange={(e) => {
                        const val = e.target.value.replace(/\D/g, '')
                        if (val.length <= 10) setFormData({ ...formData, phone: val })
                      }}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          e.preventDefault()
                          emailRef.current?.focus()
                        }
                      }}
                      className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm font-semibold text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition"
                    />
                  </div>
                </div>

                {/* Email, Gender, Age */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                  <div>
                    <label className="block text-xs font-bold uppercase text-gray-700 mb-1.5">
                      Email Address <span className="text-rose-500">*</span>
                    </label>
                    <input
                      ref={emailRef}
                      type="email"
                      required
                      maxLength={30}
                      placeholder="you@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value.slice(0, 30) })}
                      onBlur={(e) => {
                        const nextEmail = sanitizeAndAutofillEmail(e.target.value).slice(0, 30)
                        setFormData((prev) => ({ ...prev, email: nextEmail }))
                      }}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          e.preventDefault()
                          const nextEmail = sanitizeAndAutofillEmail(e.target.value).slice(0, 30)
                          setFormData((prev) => ({ ...prev, email: nextEmail }))
                          genderRef.current?.focus()
                        }
                      }}
                      className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm font-semibold text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition"
                    />
                  </div>

                  {/* Gender Selector with custom arrow and generous right padding */}
                  <div>
                    <label className="block text-xs font-bold uppercase text-gray-700 mb-1.5">Gender</label>
                    <div className="relative">
                      <select
                        ref={genderRef}
                        value={formData.gender}
                        onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') {
                            e.preventDefault()
                            ageRef.current?.focus()
                          }
                        }}
                        className="w-full pl-4 pr-10 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-[14.5px] font-semibold text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition cursor-pointer appearance-none"
                      >
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                      </select>
                      <div className="absolute inset-y-0 right-0 flex items-center pr-3.5 pointer-events-none text-gray-500 text-xs">
                        ▼
                      </div>
                    </div>
                  </div>

                  {/* Age Field: Max up to 108 */}
                  <div>
                    <label className="block text-xs font-bold uppercase text-gray-700 mb-1.5">Age</label>
                    <input
                      ref={ageRef}
                      type="number"
                      min="1"
                      max="108"
                      placeholder="e.g. 21"
                      value={formData.age}
                      onChange={(e) => {
                        const val = e.target.value
                        if (val === '') {
                          setFormData({ ...formData, age: '' })
                        } else {
                          const num = parseInt(val, 10)
                          if (!isNaN(num)) {
                            if (num > 108) {
                              setFormData({ ...formData, age: '108' })
                            } else if (num >= 0) {
                              setFormData({ ...formData, age: val })
                            }
                          }
                        }
                      }}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          e.preventDefault()
                          if (formData.occupationType === 'college') {
                            collegeRef.current?.focus()
                          } else {
                            companyRef.current?.focus()
                          }
                        }
                      }}
                      className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm font-semibold text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition"
                    />
                  </div>
                </div>

                {/* College / Workplace Segmented Toggle Button */}
                <div>
                  <label className="block text-xs font-bold uppercase text-gray-700 mb-2">
                    Current Occupation / Status <span className="text-rose-500">*</span>
                  </label>
                  <div className="grid grid-cols-2 gap-3 max-w-md">
                    <button
                      type="button"
                      onClick={() => setFormData({ ...formData, occupationType: 'college' })}
                      className={`py-2.5 px-4 rounded-xl font-extrabold text-[13px] sm:text-[15px] flex items-center justify-center gap-2 border-2 transition-all cursor-pointer ${
                        formData.occupationType === 'college'
                          ? 'bg-blue-600 border-blue-600 text-white shadow-md shadow-blue-500/20'
                          : 'bg-gray-50 border-gray-200 text-gray-600 hover:bg-gray-100'
                      }`}
                    >
                      {/* Emoji size increased by 2px (text-lg) */}
                      <span className="text-lg leading-none">🎓</span> College Student
                    </button>

                    <button
                      type="button"
                      onClick={() => setFormData({ ...formData, occupationType: 'workplace' })}
                      className={`py-2.5 px-4 rounded-xl font-extrabold text-[13px] sm:text-[15px] flex items-center justify-center gap-2 border-2 transition-all cursor-pointer ${
                        formData.occupationType === 'workplace'
                          ? 'bg-blue-600 border-blue-600 text-white shadow-md shadow-blue-500/20'
                          : 'bg-gray-50 border-gray-200 text-gray-600 hover:bg-gray-100'
                      }`}
                    >
                      {/* Emoji size increased by 2px (text-lg) */}
                      <span className="text-lg leading-none">💼</span> Working Professional
                    </button>
                  </div>
                </div>

                {/* Conditional Field based on occupation */}
                {formData.occupationType === 'college' ? (
                  <div>
                    <label className="block text-xs font-bold uppercase text-gray-700 mb-1.5">
                      College Name <span className="text-rose-500 text-[11px] lowercase font-semibold">* (mandatory for students)</span>
                    </label>
                    <input
                      ref={collegeRef}
                      type="text"
                      required
                      maxLength={50}
                      placeholder="e.g. BMS College, RVCE, PES University, Bangalore"
                      value={formData.college}
                      onChange={(e) => {
                        // Cannot start with numbers
                        let val = e.target.value.replace(/^[0-9]+/, '').slice(0, 50)
                        setFormData({ ...formData, college: val })
                      }}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          e.preventDefault()
                          customInterestRef.current?.focus()
                        }
                      }}
                      className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm font-semibold text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition"
                    />
                  </div>
                ) : (
                  <div>
                    <label className="block text-xs font-bold uppercase text-gray-700 mb-1.5">
                      Company / Organization Name <span className="text-gray-400 text-[11px] lowercase font-normal">(optional)</span>
                    </label>
                    <input
                      ref={companyRef}
                      type="text"
                      maxLength={50}
                      placeholder="e.g. Infosys, TCS, Startup, Self-Employed"
                      value={formData.company}
                      onChange={(e) => {
                        // Cannot start with numbers
                        let val = e.target.value.replace(/^[0-9]+/, '').slice(0, 50)
                        setFormData({ ...formData, company: val })
                      }}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          e.preventDefault()
                          customInterestRef.current?.focus()
                        }
                      }}
                      className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm font-semibold text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition"
                    />
                  </div>
                )}

                {/* Dynamic Context-Aware Field (Expectations / Devotional Place / Interests) */}
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="block text-xs font-bold uppercase text-gray-700">
                      {dynamicField.label}
                    </label>
                    {/* Increased helper text size by 1px (text-xs) */}
                    <span className="text-xs text-blue-800 font-bold bg-blue-50 px-3 py-1 rounded-md border border-blue-100">
                      {dynamicField.help}
                    </span>
                  </div>
                  <textarea
                    ref={customInterestRef}
                    rows={3}
                    placeholder={dynamicField.placeholder}
                    value={formData.customInterest}
                    onChange={(e) => setFormData({ ...formData, customInterest: e.target.value })}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' && !e.shiftKey) {
                        e.preventDefault()
                        handleSubmit(e)
                      }
                    }}
                    className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm font-medium text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition"
                  ></textarea>
                </div>

                {/* Submit Button with increased text size (text-[15px] sm:text-[17px]) */}
                <button
                  type="submit"
                  disabled={loading || selectedPrograms.length === 0}
                  className="w-full text-white font-black py-4 px-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 active:scale-98 text-[15px] sm:text-[17px] cursor-pointer disabled:opacity-50"
                  style={{ background: 'linear-gradient(90deg, var(--theme-cta-from, #2563eb), var(--theme-cta-to, #7c3aed))' }}
                >
                  {loading ? 'Submitting Registration...' : `Confirm & Register for ${selectedPrograms.length} Selected Program(s)`}
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Back Link */}
        <div className="text-center">
          <Link
            to="/iyf"
            className="inline-flex items-center gap-2 text-sm font-bold text-gray-600 hover:text-blue-600 transition-colors"
          >
            ← Back to All IYF Programs
          </Link>
        </div>
      </div>
    </div>
  )
}

