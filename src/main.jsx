import React, { Suspense } from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter as Router } from 'react-router-dom'
import App from './App.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Router>
      <Suspense fallback={<div className="flex items-center justify-center min-h-screen">加载中...</div>}>
        <App />
      </Suspense>
    </Router>
  </React.StrictMode>,
)