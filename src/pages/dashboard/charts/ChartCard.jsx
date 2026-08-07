export default function ChartCard({ title, subtitle, children }) {
  return (
    <div className="rounded-2xl p-6 shadow-lg bg-white dark:bg-gray-800">
      <h3 className="text-lg font-bold text-gray-800 dark:text-white">{title}</h3>
      {subtitle && <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">{subtitle}</p>}
      <div className="mt-4">{children}</div>
    </div>
  )
}
