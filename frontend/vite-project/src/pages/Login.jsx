import { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { loginUser } from '../services/api'

function Login({ onLogin }) {
  const navigate = useNavigate()
  const location = useLocation()
  const [form, setForm] = useState({ email: '', password: '' })
  const [error, setError] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleChange = (event) => setForm({ ...form, [event.target.name]: event.target.value })

  const handleSubmit = async (event) => {
    event.preventDefault()
    setError('')
    if (!form.email || !form.password) return setError('Enter your email and password.')
    setIsSubmitting(true)
    try {
      await loginUser(form)
      onLogin()
      navigate(location.state?.from || '/me', { replace: true })
    } catch (requestError) {
      setError(requestError.response?.status === 401 ? 'Invalid Credentials' : 'Unable to log in. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section className="mx-auto grid min-h-[calc(100vh-81px)] max-w-6xl items-center gap-12 px-6 py-12 lg:grid-cols-[1fr_420px] lg:px-8">
      <div className="hidden lg:block"><p className="mb-5 text-sm font-bold uppercase tracking-[0.24em] text-[#e56b45]">Welcome back</p><h1 className="max-w-xl text-6xl font-bold leading-[0.98] tracking-tight">Your everyday finds, thoughtfully saved.</h1><p className="mt-7 max-w-md text-lg leading-8 text-[#68756b]">Pick up where you left off and keep the pieces you love close.</p></div>
      <div className="rounded-[2rem] border border-[#dfe6dc] bg-white p-8 shadow-[0_20px_60px_rgba(43,58,45,0.08)] sm:p-10">
        <p className="text-sm font-semibold text-[#68756b]">ShopKart account</p><h2 className="mt-2 text-3xl font-bold">Log in</h2><p className="mt-2 text-sm text-[#68756b]">Your saved wishlist is waiting.</p>
        <form onSubmit={handleSubmit} className="mt-8 space-y-5">
          <label className="block text-sm font-semibold">Email<input name="email" type="email" value={form.email} onChange={handleChange} className="mt-2 w-full rounded-xl border border-[#d5dfd3] px-4 py-3 outline-none transition focus:border-[#e56b45] focus:ring-2 focus:ring-[#e56b45]/15" placeholder="you@example.com" /></label>
          <label className="block text-sm font-semibold">Password<input name="password" type="password" value={form.password} onChange={handleChange} className="mt-2 w-full rounded-xl border border-[#d5dfd3] px-4 py-3 outline-none transition focus:border-[#e56b45] focus:ring-2 focus:ring-[#e56b45]/15" placeholder="••••••••" /></label>
          {error && <p className="rounded-lg bg-[#fff0eb] px-3 py-2 text-sm text-[#bd482a]">{error}</p>}
          <button type="submit" disabled={isSubmitting} className="w-full rounded-xl bg-[#e56b45] px-4 py-3 font-bold text-white transition hover:bg-[#c95333] disabled:cursor-not-allowed disabled:opacity-60">{isSubmitting ? 'Logging in...' : 'Log in'}</button>
        </form><p className="mt-6 text-center text-sm text-[#68756b]">New to ShopKart? <Link to="/register" className="font-bold text-[#c95333] hover:underline">Create an account</Link></p>
      </div>
    </section>
  )
}

export default Login