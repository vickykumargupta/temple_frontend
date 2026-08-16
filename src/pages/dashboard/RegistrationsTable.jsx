import { useEffect, useState } from 'react'

function formatValue(value) {
  if (value == null || value === '') return <span className="text-gray-400">—</span>
  if (value instanceof Date || (typeof value === 'string' && /^\d{4}-\d{2}-\d{2}T/.test(value))) {
    return new Date(value).toLocaleString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    })
  }
  return String(value)
}

export default function RegistrationsTable({ title, columns, fetcher }) {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    let cancelled = false
    setLoading(true)
    setError(null)
    fetcher()
      .then((rows) => {
        if (!cancelled) setData(rows)
      })
      .catch((err) => {
        if (!cancelled) setError(err.message || 'Failed to load registrations')
      })
      .finally(() => {
        if (!cancelled) setLoading(false)
      })
    return () => {
      cancelled = true
    }
  }, [fetcher])

  return (
    <div className="rounded-2xl shadow-lg overflow-hidden bg-white">
      <div className="px-6 pt-6">
        <h2 className="text-xl font-bold text-gray-800">{title}</h2>
      </div>

      <div className="mt-4">
        {loading && <p className="px-6 py-8 text-center text-gray-500 text-sm">Loading registrations...</p>}
        {error && <p className="px-6 py-8 text-center text-red-600 text-sm font-medium">{error}</p>}
        {!loading && !error && (!data || data.length === 0) && (
          <p className="px-6 py-8 text-center text-gray-500 text-sm">No registrations yet.</p>
        )}
        {!loading && !error && data && data.length > 0 && (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-y border-gray-100 bg-gray-50 text-gray-500 uppercase tracking-wide text-xs">
                  {columns.map((col) => (
                    <th key={col.key} className="px-6 py-3 font-semibold whitespace-nowrap">{col.label}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {data.map((row) => (
                  <tr key={row.id} className="border-b border-gray-100 hover:bg-gray-50 transition">
                    {columns.map((col) => (
                      <td key={col.key} className="px-6 py-3 text-gray-700 whitespace-nowrap max-w-[240px] truncate">
                        {formatValue(row[col.key])}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="px-6 py-3 text-sm text-gray-500 border-t border-gray-100">
              {data.length} registration{data.length === 1 ? '' : 's'}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}