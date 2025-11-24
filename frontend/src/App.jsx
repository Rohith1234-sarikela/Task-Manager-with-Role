import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from './components/Header'

export default function App(){
  return (
    <div>
      <Header />
      <main style={{ padding: 16 }}>
        <Outlet />
      </main>
      <footer style={{ textAlign: 'center', padding: 12 }}>
        Task Manager
      </footer>
    </div>
  )
}
