import { useEffect, useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { getDashboardStats, getDashboardCharts, getMyDashboard, getAuth, clearAuth } from '../../services/api'
import { useTheme } from '../../context/ThemeContext'
import JanmashtamiDashboard from './janmashtami/JanmashtamiDashboard'
import IyfDashboard from './iyf/IyfDashboard'
import BhaktiVikshaDashboard from './bhakti-viksha/BhaktiVikshaDashboard'
import WelcomeBanner from './WelcomeBanner'
import RegistrationsByProgram from './charts/RegistrationsByProgram'
import RegistrationsOverTime from './charts/RegistrationsOverTime'
import ProgramShare from './charts/ProgramShare'
import DonationsOverTime from './charts/DonationsOverTime'
import DevoteeDashboard from './DevoteeDashboard'

export default function Dashboard() {
  const navigate = useNavigate()
  const auth = getAuth()
  const isAdmin = auth?.role === 'admin'
  const { theme } = useTheme()
  const [stats, setStats] = useState(null)
  const [charts, setCharts] = useState(null)
  const [devoteeData, setDevoteeData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  async function load() {
    try {
      if (isAdmin) {
        const data = await getDashboardStats()
        setStats(data)
        const chartData = await getDashboardCharts()
        setCharts(chartData)
      } else {
        const data = await getMyDashboard()
        setDevoteeData(data)
      }
    } catch (err) {
      setError(err.message || 'Failed to load dashboard')
      clearAuth()
      navigate('/login', { replace: true })
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (!auth) {
      navigate('/login', { replace: true })
      return
    }
    if (!isAdmin) {
      navigate('/', { replace: true })
      return
    }
    load()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [navigate, isAdmin])

  if (loading) {
    return (
      <div className="py-24 text-center text-gray-500">
        <p className="text-lg">Loading dashboard...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="py-24 text-center">
        <p className="text-red-600 font-semibold">{error}</p>
      </div>
    )
  }

  if (!isAdmin && devoteeData) {
    const name = devoteeData.my?.janmashtami?.fullName ||
                 devoteeData.my?.iyf?.[0]?.fullName ||
                 devoteeData.my?.bhaktiViksha?.[0]?.fullName ||
                 ''
    return (
      <div className="py-12">
        <div key={theme} className="max-w-[100rem] mx-auto px-4 md:px-8">
          <WelcomeBanner name={name} />
          <DevoteeDashboard data={devoteeData} />
        </div>
      </div>
    )
  }

  return (
    <div className="py-12">
      <div key={theme} className="max-w-[100rem] mx-auto px-4 md:px-8">
        <WelcomeBanner isAdmin />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Link to="/dashboard/janmashtami">
            <JanmashtamiDashboard count={stats?.janmashtami ?? 0} />
          </Link>
          <Link to="/dashboard/iyf">
            <IyfDashboard count={stats?.iyf ?? 0} />
          </Link>
          <Link to="/dashboard/bhakti-viksha">
            <BhaktiVikshaDashboard count={stats?.bhaktiViksha ?? 0} />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          <RegistrationsByProgram stats={stats} />
          <ProgramShare stats={stats} />
          <RegistrationsOverTime trend={charts?.registrationTrend} />
          <DonationsOverTime trend={charts?.donationTrend} />
        </div>

        <div className="mt-8 rounded-2xl p-6 text-white"
          style={{ background: 'linear-gradient(90deg, var(--theme-from), var(--theme-via), var(--theme-to))' }}>
          <div className="flex items-center justify-between">
            <p className="text-2xl font-bold">Total Registrations</p>
            <p className="text-5xl font-bold" style={{ color: 'var(--theme-accent)' }}>{stats?.total ?? 0}</p>
          </div>
        </div>
      </div>
    </div>
  )
}
