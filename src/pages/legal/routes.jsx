import TermsPage from './TermsPage'
import RefundPage from './RefundPage'
import PrivacyPage from './PrivacyPage'
import DisclaimerPage from './DisclaimerPage'

const legalRoutes = [
  { path: '/terms', element: <TermsPage /> },
  { path: '/refund-policy', element: <RefundPage /> },
  { path: '/privacy-policy', element: <PrivacyPage /> },
  { path: '/disclaimer', element: <DisclaimerPage /> },
]

export default legalRoutes
