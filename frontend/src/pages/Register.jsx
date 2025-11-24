import React, { useState } from 'react'
import api from '../services/api'

export default function Register(){
  const [form, setForm] = useState({ name:'', email:'', password:'' })
  const [msg, setMsg] = useState('')

  const submit = async e => {
    e.preventDefault()
    try{
      await api.post('/api/register', form)
      setMsg('Registered successfully. You can now login.')
      setForm({ name:'', email:'', password:'' })
    }catch(err){ 
      setMsg(err?.response?.data?.message || 'Error') 
    }
  }

  return (
    <div className="container">
      <h2>Register</h2>
      <form onSubmit={submit}>
        <input placeholder="Name" value={form.name} onChange={e=>setForm({...form,name:e.target.value})} required />
        <input placeholder="Email" type="email" value={form.email} onChange={e=>setForm({...form,email:e.target.value})} required />
        <input placeholder="Password" type="password" value={form.password} onChange={e=>setForm({...form,password:e.target.value})} required />
        <button type="submit">Register</button>
      </form>
      {msg && <p>{msg}</p>}
    </div>
  )
}
