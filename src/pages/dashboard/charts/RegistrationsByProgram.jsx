import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts'
import ChartCard from './ChartCard'
import { useThemeColor } from './themeColors'

export default function RegistrationsByProgram({ stats }) {
  const cta = useThemeColor('--theme-cta-from')
  const data = [
    { program: 'Janmashtami', count: stats.janmashtami },
    { program: 'IYF', count: stats.iyf },
    { program: 'BhaktiVriksha', count: stats.imyf },
  ]
  return (
    <ChartCard title="Registrations by Program" subtitle="Total sign-ups per program">
      <ResponsiveContainer width="100%" height={280}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(128,128,128,0.2)" />
          <XAxis dataKey="program" tick={{ fontSize: 12 }} />
          <YAxis allowDecimals={false} tick={{ fontSize: 12 }} />
          <Tooltip />
          <Bar dataKey="count" fill={cta} radius={[8, 8, 0, 0]} name="Registrations" />
        </BarChart>
      </ResponsiveContainer>
    </ChartCard>
  )
}
