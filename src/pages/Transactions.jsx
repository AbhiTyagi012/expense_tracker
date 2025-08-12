import React, { useEffect, useState } from 'react'
import api from '../services/api'

export default function Transactions(){
  const [items, setItems] = useState([])
  const [categories, setCategories] = useState([])
  const [form, setForm] = useState({ amount: '', type: 'expense', category: '', date: '', description: '' })
  const [editing, setEditing] = useState(null)

  const load = async () => {
    const res = await api.transactions.list({ page:1, limit:50 })
    setItems(res.data.items || [])
  }

  const loadCategories = async () => {
    const res = await api.transactions.categories()
    setCategories(res.data.categories || [])
  }

  useEffect(()=>{ load(); loadCategories() }, [])

  const submit = async (e) => {
    e.preventDefault()
    try {
      if (editing) {
        await api.transactions.update(editing, form)
      } else {
        await api.transactions.create(form)
      }
      setForm({ amount: '', type: 'expense', category: '', date: '', description: '' })
      setEditing(null)
      load()
    } catch (err) {
      console.error(err)
    }
  }

  const edit = (it) => {
    setEditing(it._id)
    setForm({ amount: it.amount, type: it.type, category: it.category?._id || '', date: it.date?.split('T')[0] || '', description: it.description || '' })
  }

  const remove = async (id) => {
    if (!confirm('Delete?')) return
    await api.transactions.remove(id)
    load()
  }

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Transactions</h2>
      <div className="mb-4 bg-white p-4 rounded shadow">
        <form onSubmit={submit} className="grid grid-cols-3 gap-3">
          <input value={form.amount} onChange={e=>setForm({...form, amount: e.target.value})} placeholder="Amount" className="px-3 py-2 border rounded" />
          <select value={form.type} onChange={e=>setForm({...form, type: e.target.value})} className="px-3 py-2 border rounded">
            <option value="expense">Expense</option>
            <option value="income">Income</option>
          </select>
          <select value={form.category} onChange={e=>setForm({...form, category: e.target.value})} className="px-3 py-2 border rounded">
            <option value="">Select category</option>
            {categories.map(c=> <option key={c._id} value={c._id}>{c.name}</option>)}
          </select>
          <input type="date" value={form.date} onChange={e=>setForm({...form, date: e.target.value})} className="px-3 py-2 border rounded" />
          <input value={form.description} onChange={e=>setForm({...form, description: e.target.value})} placeholder="Description" className="px-3 py-2 border rounded" />
          <div className="flex items-center">
            <button className="bg-blue-600 text-white px-4 py-2 rounded">{editing ? 'Update' : 'Add'}</button>
            {editing && <button type="button" onClick={()=>{ setEditing(null); setForm({ amount:'', type:'expense', category:'', date:'', description:'' }) }} className="ml-2 px-3 py-2 border rounded">Cancel</button>}
          </div>
        </form>
      </div>

      <div className="space-y-2">
        {items.map(it => (
          <div key={it._id} className="bg-white p-3 rounded shadow flex justify-between items-center">
            <div>
              <div className="font-semibold">{it.type} - {it.amount}</div>
              <div className="text-sm text-gray-500">{it.category?.name} • {new Date(it.date).toLocaleDateString()}</div>
              <div>{it.description}</div>
            </div>
            <div className="space-x-2">
              <button onClick={()=>edit(it)} className="px-3 py-1 border rounded">Edit</button>
              <button onClick={()=>remove(it._id)} className="px-3 py-1 border rounded">Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
