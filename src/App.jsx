import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import Login from './pages/Login'
import Register from './pages/Register'
import Dashboard from './pages/Dashboard'
import Transactions from './pages/Transactions'
import Categories from './pages/Categories'
import { AuthProvider, useAuth } from './context/auth'
import Layout from './components/Layout'
import Users from './pages/Users'

function PrivateRoute({ children }) {
  const { user } = useAuth()
  return user ? children : <Navigate to='/login' />
}

export default function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={
          <PrivateRoute>
            <Layout>
              <Dashboard />
            </Layout>
          </PrivateRoute>
        } />
        <Route path="/transactions" element={
          <PrivateRoute>
            <Layout>
              <Transactions />
            </Layout>
          </PrivateRoute>
        } />
        <Route path="/categories" element={
          <PrivateRoute>
            <Layout>
              <Categories />
            </Layout>
          </PrivateRoute>
        } />
         <Route path="/users" element={
          <PrivateRoute>
            <Layout>
              <Users />
            </Layout>
          </PrivateRoute>
        } />
      </Routes>
    </AuthProvider>
  )
}
