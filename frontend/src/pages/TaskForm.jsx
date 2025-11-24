import React, { useState } from 'react'
import api from '../services/api'
import { useNavigate } from 'react-router-dom'

export default function TaskForm({ onSaved }){
  const [form, setForm] = useState({ title:'', description:'', status:'pending' })
  const [msg, setMsg] = useState('')
  const navigate = useNavigate()

  const submit = async e => {
    e.preventDefault()
    const token = localStorage.getItem('token')

    if (!token) {
      setMsg('You must be logged in to create a task. Redirecting to login...')
      setTimeout(()=>navigate('/login'), 900)
      return
    }

    try {
      await api.post('/api/tasks', form)
      setForm({ title:'', description:'', status:'pending' })
      setMsg('Saved')
      if (onSaved) onSaved()
    } catch (err) {
      const serverMsg = err?.response?.data?.message
      setMsg(serverMsg || 'Error saving task')
      console.error('Task save error', err)
    }
  }

  return (
    <div style={{marginTop:12}}>
      <form onSubmit={submit} className="container">
        <h3>Create Task</h3>
        <input 
          placeholder="Title" 
          value={form.title} 
          onChange={e=>setForm({...form,title:e.target.value})} 
          required 
        />
        <textarea 
          placeholder="Description" 
          value={form.description} 
          onChange={e=>setForm({...form,description:e.target.value})} 
        />
        <select 
          value={form.status} 
          onChange={e=>setForm({...form,status:e.target.value})}
        >
          <option value="pending">Pending</option>
          <option value="in-progress">In Progress</option>
          <option value="completed">Completed</option>
        </select>
        <button type="submit">Save Task</button>
      </form>
      {msg && <p style={{textAlign:'center'}}>{msg}</p>}
    </div>
  )
}
