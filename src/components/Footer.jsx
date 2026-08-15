import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="bg-gray-800 text-gray-300 py-4">
      <div className="max-w-6xl mx-auto px-4 md:px-8">
        {/* Top Section */}
        <div className="flex flex-col md:flex-row items-center justify-between border-b border-gray-700 pb-2 mb-2 gap-2">
          {/* Logo / Brand Name */}
          <div className="text-center md:text-left">
            <span className="text-base font-extrabold tracking-wider text-white">
              ISKCON KR Puram
            </span>
            <p className="text-[9px] text-gray-400 mt-0.5">Sri Sri Radha Krishna Mandir</p>
          </div>

          {/* Main Navigation Links */}
          <div className="flex flex-wrap items-center justify-center gap-4 text-xs font-semibold">
            <Link to="/" className="transition hover:text-white" style={{ color: 'var(--theme-text-soft)' }}>Home</Link>
            <Link to="/janmashtami" className="transition hover:text-white" style={{ color: 'var(--theme-text-soft)' }}>Janmashtami</Link>
            <Link to="/iyf" className="transition hover:text-white" style={{ color: 'var(--theme-text-soft)' }}>IYF</Link>
            <Link to="/imyf" className="transition hover:text-white" style={{ color: 'var(--theme-text-soft)' }}>BhaktiVriksha</Link>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-2">
          {/* Copyright Statement (Left Aligned) */}
          <p className="text-[10px] text-gray-500 text-center md:text-left order-2 md:order-1">
            © 2026 ISKCON KR Puram. All rights reserved.
          </p>

          {/* Legal and Policy Links (Right Aligned) */}
          <div className="flex flex-wrap items-center justify-center gap-3 md:gap-4 text-xs text-gray-400 order-1 md:order-2">
            <Link to="/terms" className="hover:text-white transition">Terms & Conditions</Link>
            <span className="hidden sm:inline text-gray-600">|</span>
            <Link to="/refund-policy" className="hover:text-white transition">Refund Policy</Link>
            <span className="hidden sm:inline text-gray-600">|</span>
            <Link to="/privacy-policy" className="hover:text-white transition">Privacy Policy</Link>
            <span className="hidden sm:inline text-gray-600">|</span>
            <Link to="/disclaimer" className="hover:text-white transition">Disclaimer</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
