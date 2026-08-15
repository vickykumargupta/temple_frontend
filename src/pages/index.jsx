import homeRoutes from './home/routes'
import janmashtamiRoutes from './janmashtami/routes'
import iyfRoutes from './iyf/routes'
import bhaktiVikshaRoutes from './bhakti-viksha/routes'
// import designSystemRoutes from './design-system/routes'
import dashboardRoutes from './dashboard/routes'
import legalRoutes from './legal/routes'

const pageRoutes = [
  homeRoutes,
  janmashtamiRoutes,
  iyfRoutes,
  bhaktiVikshaRoutes,
  // designSystemRoutes,
  dashboardRoutes,
  legalRoutes,
].flat()

export default pageRoutes
