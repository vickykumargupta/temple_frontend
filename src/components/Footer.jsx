import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="bg-gray-800 text-gray-300 py-4">
      <div className="max-w-8xl mx-auto px-4 md:px-20">
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
            <Link to="/bhakti-viksha" className="transition hover:text-white" style={{ color: 'var(--theme-text-soft)' }}>BhaktiVriksha</Link>
          </div>

          {/* Social Media Links */}
          <div className="flex items-center gap-2.5">
            <a
              href="https://www.facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="w-7 h-7 rounded-full bg-gray-700 hover:bg-[#1877F2] flex items-center justify-center text-gray-300 hover:text-white transition-all duration-300 shadow-sm"
              title="Facebook"
            >
              <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
            </a>

            <a
              href="https://www.instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="w-7 h-7 rounded-full bg-gray-700 hover:bg-[#E4405F] flex items-center justify-center text-gray-300 hover:text-white transition-all duration-300 shadow-sm"
              title="Instagram"
            >
              <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
            </a>

            <a
              href="https://x.com"
              target="_blank"
              rel="noopener noreferrer"
              className="w-7 h-7 rounded-full bg-gray-700 hover:bg-black flex items-center justify-center text-gray-300 hover:text-white transition-all duration-300 shadow-sm"
              title="X (Twitter)"
            >
              <svg className="w-3 h-3 fill-current" viewBox="0 0 24 24">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
              </svg>
            </a>

            <a
              href="https://www.snapchat.com"
              target="_blank"
              rel="noopener noreferrer"
              className="w-7 h-7 rounded-full bg-gray-700 hover:bg-[#FFFC00] flex items-center justify-center text-gray-300 hover:text-black transition-all duration-300 shadow-sm"
              title="Snapchat"
            >
              <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                <path d="M12.002 2c-3.924 0-6.19 2.87-6.19 6.223 0 1.25.334 2.85 1.134 4.14-.144.404-.645.717-1.173.805-.333.056-.677.02-.977-.074-.298-.093-.52-.271-.628-.369-.168-.152-.409-.17-.598-.043-.189.127-.26.376-.171.59.39.938 1.341 1.637 2.457 1.802.164.887.893 1.583 1.776 1.696.082.01.164.016.246.016 1.488 0 2.268-.962 2.502-1.309.432.181.93.284 1.45.284.516 0 1.011-.102 1.44-.282.238.35.998 1.307 2.484 1.307.086 0 .172-.006.258-.017.882-.113 1.611-.809 1.775-1.696 1.116-.165 2.067-.864 2.457-1.802.089-.214.018-.463-.171-.59-.189-.127-.43-.109-.598.043-.108.098-.33.276-.628.369-.3.094-.644.13-.977.074-.528-.088-1.029-.401-1.173-.805.8-.1 1.134-4.14 1.134-1.29 0-6.19-2.266-6.19-6.223zm-3.645 6.011c.642 0 1.162.52 1.162 1.162s-.52 1.162-1.162 1.162-1.162-.52-1.162-1.162.52-1.162 1.162-1.162zm7.29 0c.642 0 1.162.52 1.162 1.162s-.52 1.162-1.162 1.162-1.162-.52-1.162-1.162.52-1.162 1.162-1.162z"/>
              </svg>
            </a>
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
