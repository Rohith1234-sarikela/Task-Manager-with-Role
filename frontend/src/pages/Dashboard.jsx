import React, { useEffect, useState } from 'react'
import api from '../services/api'
import TaskForm from './TaskForm'

export default function Dashboard(){
  const [tasks, setTasks] = useState([])
  const [loading, setLoading] = useState(false)
  const [q, setQ] = useState('')

  const fetchTasks = async () => {
    setLoading(true)
    try{
      const res = await api.get('/api/tasks', { params: { q } })
      setTasks(res.data.tasks)
    }catch(err){ console.error(err) }
    setLoading(false)
  }

  useEffect(()=>{ fetchTasks() }, [q])

  const del = async (id) => {
    if(!confirm('Delete task?')) return
    try{
      await api.delete(`/api/tasks/${id}`)
      fetchTasks()
    }catch(err){ console.error(err) }
  }

  return (
    <div className="container">
      <h2>Dashboard</h2>
      <TaskForm onSaved={fetchTasks} />
      <div style={{marginTop:12}}>
        <input placeholder="Search title" value={q} onChange={e=>setQ(e.target.value)} />
      </div>
      {loading ? <p>Loading...</p> : (
        tasks.map(t => (
          <div key={t._id} className="task">
            <strong>{t.title}</strong>
            <p>{t.description}</p>
            <small>Status: {t.status} | By: {t.createdBy?.name || 'You'}</small>
            <div>
              <button onClick={()=>del(t._id)} style={{marginLeft:8}}>Delete</button>
            </div>
          </div>
        ))
      )}
    </div>
  )
}
