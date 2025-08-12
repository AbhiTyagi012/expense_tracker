import React, { useEffect, useState } from 'react'
import api from '../services/api'

export default function Categories(){
  const [cats, setCats] = useState([])

  useEffect(()=> {
    api.transactions.categories().then(res => setCats(res.data.categories || []))
  }, [])

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Categories</h2>
      <div className="grid grid-cols-3 gap-3">
        {cats.map(c => (
          <div key={c._id} className="bg-white p-3 rounded shadow">
            <div className="font-semibold">{c.name}</div>
            <div className="text-sm text-gray-500">{c.type}</div>
          </div>
        ))}
      </div>
    </div>
  )
}
