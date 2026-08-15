import BhaktiVikshaSection from './BhaktiVikshaSection'
import HouseProgramPage from './HouseProgramPage'
import WisdomSharingPage from './WisdomSharingPage'

export default [
  {
    path: '/bhakti-viksha',
    element: <BhaktiVikshaSection />,
  },
  {
    path: '/bhakti-viksha/house-program',
    element: <HouseProgramPage />,
  },
  {
    path: '/bhakti-viksha/wisdom-sharing',
    element: <WisdomSharingPage />,
  },
]