import React, { createContext, useState, useContext, useEffect } from 'react'
import api from '../services/api'

const AuthContext = createContext()

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const raw = localStorage.getItem('pft_user')
    return raw ? JSON.parse(raw) : null
  })
  const [token, setToken] = useState(() => localStorage.getItem('pft_token') || null)

  useEffect(() => {
    if (token) {
      api.setToken(token)
    }
  }, [token])

  const login = (token, user) => {
    setToken(token)
    setUser(user)
    localStorage.setItem('pft_token', token)
    localStorage.setItem('pft_user', JSON.stringify(user))
    api.setToken(token)
  }
  const logout = () => {
    setToken(null)
    setUser(null)
    localStorage.removeItem('pft_token')
    localStorage.removeItem('pft_user')
    api.setToken(null)
  }

  return (
    <AuthContext.Provider value={{ user, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
