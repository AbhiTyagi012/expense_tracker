import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import api from '../services/api'

export default function Register(){
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [err, setErr] = useState('')
  const navigate = useNavigate()

  const submit = async (e) => {
    e.preventDefault()
    try {
      await api.auth.register({ name, email, password })
      navigate('/login')
    } catch (error) {
      setErr(error.response?.data?.message || 'Register failed')
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-full max-w-md bg-white p-6 rounded shadow">
        <h2 className="text-2xl font-bold mb-4">Register</h2>
        {err && <div className="text-red-600 mb-2">{err}</div>}
        <form onSubmit={submit} className="space-y-3">
          <input value={name} onChange={e=>setName(e.target.value)} placeholder="Full name" className="w-full px-3 py-2 border rounded" />
          <input value={email} onChange={e=>setEmail(e.target.value)} placeholder="Email" className="w-full px-3 py-2 border rounded" />
          <input type="password" value={password} onChange={e=>setPassword(e.target.value)} placeholder="Password" className="w-full px-3 py-2 border rounded" />
          <button className="w-full bg-green-600 text-white py-2 rounded">Register</button>
        </form>
        <div className="mt-3 text-sm">
          Already have an account? <Link to="/login" className="text-blue-600">Login</Link>
        </div>
      </div>
    </div>
  )
}
