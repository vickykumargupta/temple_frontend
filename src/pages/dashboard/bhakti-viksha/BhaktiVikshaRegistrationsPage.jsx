import { Link } from 'react-router-dom'
import RegistrationsTable from '../RegistrationsTable'
import { getBhaktiVikshaRegistrations } from '../../../services/api'

const COLUMNS = [
  { key: 'fullName', label: 'Name' },
  { key: 'gender', label: 'Gender' },
  { key: 'email', label: 'Email' },
  { key: 'phone', label: 'Phone' },
  { key: 'age', label: 'Age' },
  { key: 'company', label: 'Company' },
  { key: 'designation', label: 'Designation' },
  { key: 'spouseName', label: 'Spouse' },
  { key: 'familyMembers', label: 'Family' },
  { key: 'occupation', label: 'Occupation' },
  { key: 'interests', label: 'Interests' },
  { key: 'createdAt', label: 'Registered On' },
]

export default function BhaktiVikshaRegistrationsPage() {
  return (
    <div className="py-12">
      <div className="max-w-[100rem] mx-auto px-4 md:px-8">
        <Link to="/dashboard" className="inline-block text-sm font-semibold mb-4 hover:opacity-80" style={{ color: 'var(--theme-cta-from)' }}>
          ← Back to Dashboard
        </Link>
        <h1 className="text-2xl font-bold text-gray-800 mb-6">BhaktiVriksha Registrations</h1>
        <RegistrationsTable title="BhaktiVriksha" columns={COLUMNS} fetcher={getBhaktiVikshaRegistrations} />
      </div>
    </div>
  )
}