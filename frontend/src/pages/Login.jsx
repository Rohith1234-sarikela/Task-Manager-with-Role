import React, { useState } from 'react'
import api from '../services/api'
import { useNavigate, Link } from 'react-router-dom'

export default function Login(){
  const [form, setForm] = useState({ email:'', password:'' })
  const [msg, setMsg] = useState('')
  const navigate = useNavigate()

  const submit = async e => {
    e.preventDefault()
    try{
      const res = await api.post('/api/login', form)
      localStorage.setItem('token', res.data.token)
      localStorage.setItem('user', JSON.stringify(res.data.user))
      navigate('/dashboard')
    }catch(err){ 
      setMsg(err?.response?.data?.message || 'Error') 
    }
  }

  return (
    <div className="container">
      <h2>Login</h2>
      <form onSubmit={submit}>
        <input placeholder="Email" type="email" value={form.email} onChange={e=>setForm({...form,email:e.target.value})} required />
        <input placeholder="Password" type="password" value={form.password} onChange={e=>setForm({...form,password:e.target.value})} required />
        <button type="submit">Login</button>
      </form>
      {msg && <p>{msg}</p>}
      
      <p style={{marginTop: 12}}>
        New user? <Link to="/register">Create an account</Link>
      </p>
    </div>
  )
}
