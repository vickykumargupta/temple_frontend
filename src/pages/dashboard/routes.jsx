import Dashboard from './Dashboard'
import AuthPage from './AuthPage'
import AdminOnly from './AdminOnly'
import JanmashtamiRegistrationsPage from './janmashtami/JanmashtamiRegistrationsPage'
import IyfRegistrationsPage from './iyf/IyfRegistrationsPage'
import BhaktiVikshaRegistrationsPage from './bhakti-viksha/BhaktiVikshaRegistrationsPage'

const dashboardRoutes = [
  { path: '/dashboard', element: <Dashboard /> },
  { path: '/login', element: <AuthPage /> },
  { path: '/dashboard/janmashtami', element: <AdminOnly><JanmashtamiRegistrationsPage /></AdminOnly> },
  { path: '/dashboard/iyf', element: <AdminOnly><IyfRegistrationsPage /></AdminOnly> },
  { path: '/dashboard/bhakti-viksha', element: <AdminOnly><BhaktiVikshaRegistrationsPage /></AdminOnly> },
]

export default dashboardRoutes