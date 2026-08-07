import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts'
import ChartCard from './ChartCard'
import { useThemeColor } from './themeColors'

export default function DonationsOverTime({ trend }) {
  const cta = useThemeColor('--theme-cta-from')
  const data = trend?.map((row) => ({
    ...row,
    date: new Date(row.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' }),
    amount: Number(row.total || 0),
  }))
  return (
    <ChartCard title="Donations Over Time" subtitle="Daily donations collected (last 30 days)">
      <ResponsiveContainer width="100%" height={280}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(128,128,128,0.2)" />
          <XAxis dataKey="date" tick={{ fontSize: 10 }} interval="preserveStartEnd" minTickGap={20} />
          <YAxis tick={{ fontSize: 12 }} tickFormatter={(v) => `₹${v}`} />
          <Tooltip formatter={(v) => [`₹${Number(v).toLocaleString('en-IN')}`, 'Collected']} />
          <Legend />
          <Line type="monotone" dataKey="amount" stroke={cta} strokeWidth={2.5} dot={{ r: 3 }} name="Donations" />
        </LineChart>
      </ResponsiveContainer>
    </ChartCard>
  )
}
