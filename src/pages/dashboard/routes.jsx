import Dashboard from './Dashboard'
import AuthPage from './AuthPage'

const dashboardRoutes = [
  { path: '/dashboard', element: <Dashboard /> },
  { path: '/login', element: <AuthPage /> },
]

export default dashboardRoutes