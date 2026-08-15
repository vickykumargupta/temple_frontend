import IyfSection from './IyfSection'
import GitaClassesPage from './pages/GitaClassesPage'
import PersonalityDevelopmentPage from './pages/PersonalityDevelopmentPage'
import KirtanCulturePage from './pages/KirtanCulturePage'
import RetreatsCampsPage from './pages/RetreatsCampsPage'
import CampusPreachingPage from './pages/CampusPreachingPage'
import CommunityServicePage from './pages/CommunityServicePage'

export default [
  { path: '/iyf', element: <IyfSection /> },
  { path: '/iyf/gita-classes', element: <GitaClassesPage /> },
  { path: '/iyf/personality-development', element: <PersonalityDevelopmentPage /> },
  { path: '/iyf/kirtan-culture', element: <KirtanCulturePage /> },
  { path: '/iyf/retreats-camps', element: <RetreatsCampsPage /> },
  { path: '/iyf/campus-preaching', element: <CampusPreachingPage /> },
  { path: '/iyf/community-service', element: <CommunityServicePage /> },
]
