import homeRoutes from './home/routes'
import janmashtamiRoutes from './janmashtami/routes'
import iyfRoutes from './iyf/routes'
import bhaktiVikshaRoutes from './bhakti-viksha/routes'
import donationRoutes from './donation/routes'
import adminApprovalRoutes from './admin-approvals/routes'
import acceptInviteRoutes from './accept-invite/routes'
import profileRoutes from './profile/routes'
import forgotPasswordRoutes from './forgot-password/routes'
// import designSystemRoutes from './design-system/routes'
import dashboardRoutes from './dashboard/routes'
import legalRoutes from './legal/routes'

const pageRoutes = [
  homeRoutes,
  janmashtamiRoutes,
  iyfRoutes,
  bhaktiVikshaRoutes,
  donationRoutes,
  adminApprovalRoutes,
  acceptInviteRoutes,
  profileRoutes,
  forgotPasswordRoutes,
  // designSystemRoutes,
  dashboardRoutes,
  legalRoutes,
].flat()

export default pageRoutes
