import React, { Suspense, lazy } from 'react'
import ReactDOM from 'react-dom/client'
import './styles/globals.css'
import { ThemeProvider } from './context/ThemeContext'
import { BrowserRouter } from 'react-router-dom'

const App = lazy(() => import('./App'))

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ThemeProvider>
      <BrowserRouter>
        <Suspense fallback={
          <div className="min-h-screen bg-[#0F0F0F] flex items-center justify-center">
            <div className="flex flex-col items-center gap-4">
              <div className="w-8 h-8 rounded-full border-2 border-brand-teal border-t-transparent animate-spin" />
              <span className="text-sm text-dark-subtext">Loading APS...</span>
            </div>
          </div>
        }>
          <App />
        </Suspense>
      </BrowserRouter>
    </ThemeProvider>
  </React.StrictMode>
)