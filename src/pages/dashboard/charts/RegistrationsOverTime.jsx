import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts'
import ChartCard from './ChartCard'
import { useThemeColor } from './themeColors'

export default function RegistrationsOverTime({ trend }) {
  const from = useThemeColor('--theme-from')
  const cta = useThemeColor('--theme-cta-from')
  const accent = useThemeColor('--theme-accent')
  const data = trend?.map((row) => ({
    ...row,
    date: new Date(row.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' }),
  }))
  return (
    <ChartCard title="Registrations Over Time" subtitle="Daily sign-ups across all programs (last 30 days)">
      <ResponsiveContainer width="100%" height={280}>
        <AreaChart data={data}>
          <defs>
            <linearGradient id="gradJm" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor={from} stopOpacity={0.6} />
              <stop offset="95%" stopColor={from} stopOpacity={0} />
            </linearGradient>
            <linearGradient id="gradIyf" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor={cta} stopOpacity={0.6} />
              <stop offset="95%" stopColor={cta} stopOpacity={0} />
            </linearGradient>
            <linearGradient id="gradImyf" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor={accent} stopOpacity={0.6} />
              <stop offset="95%" stopColor={accent} stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(128,128,128,0.2)" />
          <XAxis dataKey="date" tick={{ fontSize: 10 }} interval="preserveStartEnd" minTickGap={20} />
          <YAxis allowDecimals={false} tick={{ fontSize: 12 }} />
          <Tooltip />
          <Legend />
          <Area type="monotone" dataKey="Janmashtami" stroke={from} fill="url(#gradJm)" strokeWidth={2} />
          <Area type="monotone" dataKey="IYF" stroke={cta} fill="url(#gradIyf)" strokeWidth={2} />
          <Area type="monotone" dataKey="IMYF" stroke={accent} fill="url(#gradImyf)" strokeWidth={2} />
        </AreaChart>
      </ResponsiveContainer>
    </ChartCard>
  )
}
