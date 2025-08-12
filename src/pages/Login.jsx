import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import api from '../services/api'
import { useAuth } from '../context/auth'

export default function Login(){
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [err, setErr] = useState('')
  const { login } = useAuth()
  const navigate = useNavigate()

  const submit = async (e) => {
    e.preventDefault()
    try {
      const res = await api.auth.login({ email, password })
      const { token, user } = res.data
      login(token, user)
      navigate('/')
    } catch (error) {
      setErr(error.response?.data?.message || 'Login failed')
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-full max-w-md bg-white p-6 rounded shadow">
        <h2 className="text-2xl font-bold mb-4">Login</h2>
        {err && <div className="text-red-600 mb-2">{err}</div>}
        <form onSubmit={submit} className="space-y-3">
          <input value={email} onChange={e=>setEmail(e.target.value)} placeholder="Email" className="w-full px-3 py-2 border rounded" />
          <input type="password" value={password} onChange={e=>setPassword(e.target.value)} placeholder="Password" className="w-full px-3 py-2 border rounded" />
          <button className="w-full bg-blue-600 text-white py-2 rounded">Login</button>
        </form>
        <div className="mt-3 text-sm">
          Don't have an account? <Link to="/register" className="text-blue-600">Register</Link>
        </div>
      </div>
    </div>
  )
}
