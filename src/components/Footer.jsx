import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="bg-gray-800 text-gray-300 py-10">
      <div className="max-w-6xl mx-auto px-4 text-center">
        <div className="flex items-center justify-center gap-3 mb-4">
          <div className="w-9 h-9 rounded-full flex items-center justify-center text-white font-bold" style={{ background: 'linear-gradient(135deg, var(--theme-from), var(--theme-to))' }}></div>
          <div className="text-left">
            <p className="text-sm font-bold text-white">ISKCON KR Puram</p>
            <p className="text-xs text-gray-400">Bangalore</p>
          </div>
        </div>
        <p className="text-sm text-gray-400 mb-6 max-w-xl mx-auto">
          Janmashtami Celebration 2026 • ISKCON Youth Forum (IYF) • ISKCON Men & Youth Forum (IMYF)
        </p>
        <div className="flex items-center justify-center gap-6 mb-6 text-sm">
          <Link to="/" className="transition" style={{ color: 'var(--theme-text-soft)' }}>Home</Link>
          <Link to="/janmashtami" className="transition" style={{ color: 'var(--theme-text-soft)' }}>Janmashtami</Link>
          <Link to="/iyf" className="transition" style={{ color: 'var(--theme-text-soft)' }}>IYF</Link>
          <Link to="/imyf" className="transition" style={{ color: 'var(--theme-text-soft)' }}>IMYF</Link>
        </div>
        <p className="text-xs text-gray-500">
          2026 Janmashtami Celebration Committee. All rights reserved.
        </p>
      </div>
    </footer>
  )
}
