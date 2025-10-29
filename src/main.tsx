import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import { Buffer } from 'buffer'
import './components/animations.css'
import ErrorBoundary from './components/ErrorBoundary'

// Polyfill for Buffer
if (typeof window !== 'undefined') {
  window.Buffer = Buffer
}

console.log('App starting...')

try {
  ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
      <ErrorBoundary>
        <App />
      </ErrorBoundary>
    </React.StrictMode>,
  )
  
  console.log('App rendered successfully!')
} catch (error) {
  console.error('Failed to render app:', error)
}