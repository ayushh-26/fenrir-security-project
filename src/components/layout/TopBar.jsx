import { useNavigate } from 'react-router-dom'
import { Sun, Moon, Download, Home } from 'lucide-react'
import { useTheme } from '../../context/ThemeContext'
import { MobileMenuButton } from './Sidebar'

export function TopBar({ breadcrumbs, actions, onMobileMenu }) {
  const { isDark, toggle } = useTheme()
  const navigate = useNavigate()

  return (
    <header
      className="h-14 border-b border-light-border dark:border-dark-border bg-light-surface dark:bg-dark-surface flex items-center px-4 gap-3 sticky top-0 z-30"
      role="banner"
    >
      <MobileMenuButton onClick={onMobileMenu} />

      {/* Breadcrumbs — each segment is clickable */}
      <nav className="flex items-center gap-1.5 text-sm flex-1 min-w-0" aria-label="Breadcrumb">
        <ol className="flex items-center gap-1.5 min-w-0">
          {/* Always show a home icon first */}
          <li>
            <button
              onClick={() => navigate('/dashboard')}
              aria-label="Go to dashboard"
              className="text-light-subtext dark:text-dark-subtext hover:text-brand-teal transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-teal rounded"
            >
              <Home size={14} />
            </button>
          </li>
          {breadcrumbs?.map((crumb, i) => (
            <li key={i} className="flex items-center gap-1.5 min-w-0">
              <span className="text-light-subtext dark:text-dark-subtext">/</span>
              {i === breadcrumbs.length - 1 ? (
                <span className="text-brand-teal font-medium truncate" aria-current="page">
                  {crumb}
                </span>
              ) : (
                <button
                  onClick={() => navigate('/dashboard')}
                  className="text-light-subtext dark:text-dark-subtext hover:text-light-text dark:hover:text-dark-text truncate transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-teal rounded"
                >
                  {crumb}
                </button>
              )}
            </li>
          ))}
        </ol>
      </nav>

      {/* Actions + theme toggle */}
      <div className="flex items-center gap-2 flex-shrink-0">
        {actions}
        <button
          onClick={toggle}
          aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
          className="p-2 rounded-lg text-light-subtext dark:text-dark-subtext hover:bg-light-muted dark:hover:bg-dark-muted transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-teal"
        >
          {isDark ? <Sun size={16} aria-hidden="true" /> : <Moon size={16} aria-hidden="true" />}
        </button>
      </div>
    </header>
  )
}