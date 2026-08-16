import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { getAuth } from '../../services/api'

export default function AdminOnly({ children }) {
  const navigate = useNavigate()
  const auth = getAuth()

  useEffect(() => {
    if (!auth || auth.role !== 'admin') {
      navigate('/login', { replace: true })
    }
  }, [auth, navigate])

  if (!auth || auth.role !== 'admin') return null
  return children
}