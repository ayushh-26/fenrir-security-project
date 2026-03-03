import { lazy, Suspense } from 'react'
import { Routes, Route, Navigate, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import { Toaster } from 'sonner'

const LoginPage = lazy(() => import('./pages/LoginPage'))
const DashboardPage = lazy(() => import('./pages/DashboardPage'))
const ScanDetailPage = lazy(() => import('./pages/ScanDetailPage'))

function PageLoader() {
  return (
    <div className="flex-1 flex items-center justify-center min-h-screen bg-light-bg dark:bg-dark-bg">
      <div className="flex flex-col items-center gap-3">
        <div className="w-7 h-7 rounded-full border-2 border-brand-teal border-t-transparent animate-spin" />
        <span className="text-xs text-light-subtext dark:text-dark-subtext">Loading...</span>
      </div>
    </div>
  )
}

export default function App() {
  const location = useLocation()

  return (
    <>
      <AnimatePresence mode="wait">
        <Suspense fallback={<PageLoader />}>
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<Navigate to="/login" replace />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/scans/:id" element={<ScanDetailPage />} />
            <Route path="/projects" element={<DashboardPage />} />
            <Route path="/scans" element={<DashboardPage />} />
            <Route path="/schedule" element={<DashboardPage />} />
            <Route path="/notifications" element={<DashboardPage />} />
            <Route path="/settings" element={<DashboardPage />} />
            <Route path="/support" element={<DashboardPage />} />
            <Route path="*" element={<Navigate to="/login" replace />} />
          </Routes>
        </Suspense>
      </AnimatePresence>
      <Toaster
        position="top-right"
        richColors
        closeButton
      />
    </>
  )
}