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
              className="w-7 h-7 rounded-full bg-[#1877F2] flex items-center justify-center text-white transition-all duration-300 shadow-sm hover:scale-110"
              title="Facebook"
            >
              <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
            </a>

            <a
              href="https://www.youtube.com/redirect?event=channel_header&redir_token=QUM4Zm9rVHZBR3B3Z0NSTlVtRW42Rk0zOVRBU3xBTl9pYzRlbW02MmZBbW9KOXNTZ2xvNjdrZ1RwNEMzNmVXSG55RG1NVW4ybWNVX1MzbmE0SGdqQkY2Zy1MQkIxSlNVZnhUeE9SVmFYcld6ZThMT2c3X0lGTUF6bFRkZDZkS0hV&q=https%3A%2F%2Finstagram.com%2Fiskcon_kr_puram%3Figshid%3DMzNlNGNkZWQ4Mg%3D%3D"
              target="_blank"
              rel="noopener noreferrer"
              className="w-7 h-7 rounded-lg overflow-hidden flex items-center justify-center transition-all duration-300 shadow-sm hover:scale-110"
              style={{
                background: 'radial-gradient(circle at 30% 107%, #fdf497 0%, #fdf497 5%, #fd5949 45%, #d6249f 60%, #285AEB 90%)',
              }}
              title="Instagram"
            >
              <svg className="w-4 h-4 fill-white" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
            </a>

            <a
              href="https://x.com"
              target="_blank"
              rel="noopener noreferrer"
              className="w-7 h-7 rounded-full bg-black flex items-center justify-center text-white transition-all duration-300 shadow-sm hover:scale-110 border border-gray-700"
              title="X (Twitter)"
            >
              <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
              </svg>
            </a>

            <a
              href="https://www.youtube.com/@iskconkrpuramnew"
              target="_blank"
              rel="noopener noreferrer"
              className="w-7 h-7 rounded-full bg-[#FF0000] flex items-center justify-center text-white transition-all duration-300 shadow-sm hover:scale-110"
              title="YouTube"
            >
              <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
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
