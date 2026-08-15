import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from 'recharts'
import ChartCard from './ChartCard'
import { useThemeColor } from './themeColors'

export default function ProgramShare({ stats }) {
  const from = useThemeColor('--theme-from')
  const cta = useThemeColor('--theme-cta-from')
  const accent = useThemeColor('--theme-accent')
  const data = [
    { name: 'Janmashtami', value: stats.janmashtami },
    { name: 'IYF', value: stats.iyf },
    { name: 'BhaktiVriksha', value: stats.bhaktiViksha },
  ]
  const COLORS = [from, cta, accent]
  return (
    <ChartCard title="Program Share" subtitle="Proportion of total registrations">
      <ResponsiveContainer width="100%" height={280}>
        <PieChart>
          <Pie data={data} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius={60} outerRadius={90} paddingAngle={3}>
            {data.map((entry, i) => (
              <Cell key={entry.name} fill={COLORS[i % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </ChartCard>
  )
}
