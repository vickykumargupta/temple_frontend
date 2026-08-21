import { Link } from 'react-router-dom'
import RegistrationsTable from '../RegistrationsTable'
import { getIyfRegistrations } from '../../../services/api'

const COLUMNS = [
  { key: 'fullName', label: 'Name' },
  { key: 'gender', label: 'Gender' },
  { key: 'email', label: 'Email' },
  { key: 'phone', label: 'Phone' },
  { key: 'age', label: 'Age' },
  { key: 'college', label: 'College' },
  { key: 'course', label: 'Course' },
  { key: 'yearOfStudy', label: 'Year' },
  { key: 'interests', label: 'Interests' },
  { key: 'createdAt', label: 'Registered On' },
]

export default function IyfRegistrationsPage() {
  return (
    <div className="py-12">
      <div className="max-w-[100rem] mx-auto px-4 md:px-8">
        <Link to="/dashboard" className="inline-block text-sm font-semibold mb-4 hover:opacity-80" style={{ color: 'var(--theme-cta-from)' }}>
          ← Back to Dashboard
        </Link>
        <h1 className="text-2xl font-bold text-gray-800 mb-6">IYF Registrations</h1>
        <RegistrationsTable columns={COLUMNS} fetcher={getIyfRegistrations} />
      </div>
    </div>
  )
}