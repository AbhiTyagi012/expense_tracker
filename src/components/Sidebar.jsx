import React from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/auth'

const Link = ({ to, children }) => (
  <NavLink to={to} className={({isActive}) => isActive ? 'block px-4 py-2 rounded bg-gray-200' : 'block px-4 py-2 rounded hover:bg-gray-50'}>
    {children}
  </NavLink>
)

export default function Sidebar(){
  const { logout, user } = useAuth()
  const navigate = useNavigate()
  return (
    <aside className="w-64 bg-white border-r">
      <div className="p-4 border-b">
        <h1 className="text-lg font-bold">Personal Finance</h1>
        <p className="text-sm text-gray-500">Welcome {user?.name || ''}</p>
      </div>
      <nav className="p-4 space-y-1">
        <Link to="/">Dashboard</Link>
        <Link to="/transactions">Transactions</Link>
        {/* Show Users link only for admin */}
        {user?.role === 'admin' && (
          <Link to="/users">Users</Link>
        )}
        {/* <Link to="/categories">Categories</Link> */}
        <button onClick={() => { logout(); navigate('/login') }} className="w-full text-left px-4 py-2 rounded hover:bg-gray-50">Logout</button>
      </nav>
    </aside>
  )
}
