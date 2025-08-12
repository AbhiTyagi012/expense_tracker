import React, { useEffect, useState } from 'react';
import api from '../services/api';
import { useAuth } from '../context/auth';

export default function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { user } = useAuth();

  useEffect(() => {
    if (user?.role === 'admin') {
      api.users.list()
        .then(res => setUsers(res.data.users)) // ✅ fix: use res.data.users
        .catch(err => setError(err.response?.data?.message || 'Failed to load users'))
        .finally(() => setLoading(false));
    } else {
      setLoading(false); // ✅ avoid infinite "Loading..."
    }
  }, [user]);

  if (user?.role !== 'admin') {
    return <div className="p-4 text-red-600">Access denied.</div>;
  }

  if (loading) return <div className="p-4">Loading users...</div>;
  if (error) return <div className="p-4 text-red-600">{error}</div>;

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Users</h2>
      <table className="min-w-full border">
        <thead>
          <tr className="bg-gray-100">
            <th className="border px-4 py-2">Name</th>
            <th className="border px-4 py-2">Email</th>
            <th className="border px-4 py-2">Role</th>
          </tr>
        </thead>
        <tbody>
          {users.map(u => (
            <tr key={u._id}>
              <td className="border px-4 py-2">{u.name}</td>
              <td className="border px-4 py-2">{u.email}</td>
              <td className="border px-4 py-2">{u.role}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
