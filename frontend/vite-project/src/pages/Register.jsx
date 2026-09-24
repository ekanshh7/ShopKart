import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { registerUser } from '../services/api'

function Register() {
  const navigate = useNavigate()
  const [form, setForm] = useState({ fullname: '', email: '', password: '', phoneno: '' })
  const [error, setError] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const handleChange = (event) => setForm({ ...form, [event.target.name]: event.target.value })

  const handleSubmit = async (event) => {
    event.preventDefault(); setError('')
    if (!form.fullname || !form.email || !form.password || !form.phoneno) return setError('Complete all fields to continue.')
    if (form.password.length <= 6) return setError('Password must be longer than 6 characters.')
    setIsSubmitting(true)
    try { await registerUser({ ...form, phoneno: Number(form.phoneno) }); navigate('/login') } catch (requestError) { setError(requestError.response?.data?.message || 'Unable to create your account.') } finally { setIsSubmitting(false) }
  }

  return (
    <section className="mx-auto flex min-h-[calc(100vh-81px)] max-w-xl items-center px-6 py-12"><div className="w-full rounded-[2rem] border border-[#dfe6dc] bg-white p-8 shadow-[0_20px_60px_rgba(43,58,45,0.08)] sm:p-10">
      <p className="text-sm font-semibold text-[#e56b45]">Start shopping smarter</p><h1 className="mt-2 text-3xl font-bold">Create your account</h1>
      <form onSubmit={handleSubmit} className="mt-8 grid gap-5 sm:grid-cols-2">
        <label className="block text-sm font-semibold sm:col-span-2">Full Name<input name="fullname" value={form.fullname} onChange={handleChange} className="mt-2 w-full rounded-xl border border-[#d5dfd3] px-4 py-3 outline-none focus:border-[#e56b45] focus:ring-2 focus:ring-[#e56b45]/15" placeholder="John Doe" /></label>
        <label className="block text-sm font-semibold sm:col-span-2">Email<input name="email" type="email" value={form.email} onChange={handleChange} className="mt-2 w-full rounded-xl border border-[#d5dfd3] px-4 py-3 outline-none focus:border-[#e56b45] focus:ring-2 focus:ring-[#e56b45]/15" placeholder="you@example.com" /></label>
        <label className="block text-sm font-semibold">Password<input name="password" type="password" value={form.password} onChange={handleChange} className="mt-2 w-full rounded-xl border border-[#d5dfd3] px-4 py-3 outline-none focus:border-[#e56b45] focus:ring-2 focus:ring-[#e56b45]/15" placeholder="7+ characters" /></label>
        <label className="block text-sm font-semibold">Phone Number<input name="phoneno" type="tel" value={form.phoneno} onChange={handleChange} className="mt-2 w-full rounded-xl border border-[#d5dfd3] px-4 py-3 outline-none focus:border-[#e56b45] focus:ring-2 focus:ring-[#e56b45]/15" placeholder="9876543210" /></label>
        {error && <p className="rounded-lg bg-[#fff0eb] px-3 py-2 text-sm text-[#bd482a] sm:col-span-2">{error}</p>}
        <button type="submit" disabled={isSubmitting} className="rounded-xl bg-[#17211b] px-4 py-3 font-bold text-white transition hover:bg-[#e56b45] disabled:cursor-not-allowed disabled:opacity-60 sm:col-span-2">{isSubmitting ? 'Creating account...' : 'Create account'}</button>
      </form><p className="mt-6 text-center text-sm text-[#68756b]">Already registered? <Link to="/login" className="font-bold text-[#c95333] hover:underline">Log in</Link></p>
    </div></section>
  )
}

export default Register