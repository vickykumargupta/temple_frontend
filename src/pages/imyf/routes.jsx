import ImyfSection from './ImyfSection'
import HouseProgramPage from './HouseProgramPage'
import WisdomSharingPage from './WisdomSharingPage'

export default [
  {
    path: '/imyf',
    element: <ImyfSection />,
  },
  {
    path: '/imyf/house-program',
    element: <HouseProgramPage />,
  },
  {
    path: '/imyf/wisdom-sharing',
    element: <WisdomSharingPage />,
  },
]
