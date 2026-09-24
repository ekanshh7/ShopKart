import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { getProfile } from '../services/api'

function Home({ onUnauthenticated }) {
  const navigate = useNavigate()
  const [customer, setCustomer] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    let isCurrent = true
    getProfile().then(({ data }) => { if (isCurrent) setCustomer(data.customer) }).catch((error) => { if (error.response?.status === 401) { onUnauthenticated(); navigate('/login', { replace: true }) } }).finally(() => { if (isCurrent) setIsLoading(false) })
    return () => { isCurrent = false }
  }, [navigate, onUnauthenticated])

  if (isLoading) return <div className="flex min-h-[calc(100vh-81px)] items-center justify-center text-[#68756b]">Loading your account...</div>
  if (!customer) return null
  const customerName = customer.fullname || customer.fullName || customer.name || 'Customer'
  const customerPhone = customer.phoneno || customer.phone || customer.phoneNumber || 'Not provided'
  return <section className="mx-auto max-w-6xl px-6 py-16 lg:px-8"><p className="text-sm font-bold uppercase tracking-[0.24em] text-[#e56b45]">Your ShopKart</p><h1 className="mt-3 max-w-2xl text-5xl font-bold leading-tight tracking-tight sm:text-6xl">Good to see you, {customerName}.</h1><p className="mt-5 max-w-xl text-lg leading-8 text-[#68756b]">Your account is ready for the next thoughtful find.</p><div className="mt-12 grid max-w-3xl gap-4 sm:grid-cols-3"><div className="rounded-2xl border border-[#dfe6dc] bg-white p-5"><p className="text-xs font-bold uppercase tracking-wider text-[#8a968c]">Name</p><p className="mt-2 font-semibold">{customerName}</p></div><div className="rounded-2xl border border-[#dfe6dc] bg-white p-5"><p className="text-xs font-bold uppercase tracking-wider text-[#8a968c]">Email</p><p className="mt-2 break-words font-semibold">{customer.email}</p></div><div className="rounded-2xl border border-[#dfe6dc] bg-white p-5"><p className="text-xs font-bold uppercase tracking-wider text-[#8a968c]">Phone</p><p className="mt-2 font-semibold">{customerPhone}</p></div></div></section>
}

export default Home