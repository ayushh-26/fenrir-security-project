import { Sun, Moon, Download, StopCircle } from 'lucide-react'
import { useTheme } from '../../context/ThemeContext'
import { Button } from '../ui/Button'
import { MobileMenuButton } from './Sidebar'
import { toast } from 'sonner'

export function TopBar({ breadcrumbs, actions, onMobileMenu }) {
  const { isDark, toggle } = useTheme()

  return (
    <header className="h-14 border-b border-light-border dark:border-dark-border bg-light-surface dark:bg-dark-surface flex items-center px-4 gap-3 sticky top-0 z-30">
      {/* Mobile menu button */}
      <MobileMenuButton onClick={onMobileMenu} />

      {/* Breadcrumbs */}
      <div className="flex items-center gap-1.5 text-sm flex-1 min-w-0">
        {breadcrumbs?.map((crumb, i) => (
          <span key={i} className="flex items-center gap-1.5 min-w-0">
            {i > 0 && <span className="text-light-subtext dark:text-dark-subtext">/</span>}
            <span className={
              i === breadcrumbs.length - 1
                ? 'text-brand-teal font-medium truncate'
                : 'text-light-subtext dark:text-dark-subtext truncate'
            }>
              {crumb}
            </span>
          </span>
        ))}
      </div>

      {/* Actions */}
      <div className="flex items-center gap-2">
        {actions}

        {/* Theme toggle */}
        <button
          onClick={toggle}
          aria-label="Toggle theme"
          className="p-2 rounded-lg text-light-subtext dark:text-dark-subtext hover:bg-light-muted dark:hover:bg-dark-muted transition-all duration-200"
        >
          {isDark ? <Sun size={16} /> : <Moon size={16} />}
        </button>
      </div>
    </header>
  )
}