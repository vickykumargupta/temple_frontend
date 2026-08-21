import AdminApprovalsPage from './AdminApprovalsPage'
import { Navigate } from 'react-router-dom'
import { getAuth } from '../../services/api'

function SuperAdminGuard({ children }) {
  const auth = getAuth()
  if (!auth || !auth.isSuperAdmin) return <Navigate to="/dashboard" replace />
  return children
}

export default [
  {
    path: '/dashboard/approvals',
    element: (
      <SuperAdminGuard>
        <AdminApprovalsPage />
      </SuperAdminGuard>
    ),
  },
]