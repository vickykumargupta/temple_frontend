import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="bg-gray-800 text-gray-300 py-10">
      <div className="max-w-6xl mx-auto px-4 text-center">
        <div className="flex items-center justify-center gap-6 mb-6 text-sm">
          <Link to="/" className="transition" style={{ color: 'var(--theme-text-soft)' }}>Home</Link>
          <Link to="/janmashtami" className="transition" style={{ color: 'var(--theme-text-soft)' }}>Janmashtami</Link>
          <Link to="/iyf" className="transition" style={{ color: 'var(--theme-text-soft)' }}>IYF</Link>
          <Link to="/imyf" className="transition" style={{ color: 'var(--theme-text-soft)' }}>BhaktiVriksha</Link>
        </div>
        <p className="text-xs text-gray-500">
          © 2026 ISKCON KR Puram Committee. All rights reserved.
        </p>
      </div>
    </footer>
  )
}
