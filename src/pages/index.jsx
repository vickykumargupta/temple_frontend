import homeRoutes from './home/routes'
import janmashtamiRoutes from './janmashtami/routes'
import iyfRoutes from './iyf/routes'
import imyfRoutes from './imyf/routes'
// import designSystemRoutes from './design-system/routes'
import dashboardRoutes from './dashboard/routes'

const pageRoutes = [
  homeRoutes,
  janmashtamiRoutes,
  iyfRoutes,
  imyfRoutes,
  // designSystemRoutes,
  dashboardRoutes,
].flat()

export default pageRoutes
