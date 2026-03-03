import { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { LayoutDashboard, FolderOpen, ScanLine, Calendar, Bell, Settings, HelpCircle, ChevronRight, X, Menu } from 'lucide-react'
import clsx from 'clsx'

const navItems = [
  { label: 'Dashboard', icon: LayoutDashboard, to: '/dashboard' },
  { label: 'Projects', icon: FolderOpen, to: '/projects' },
  { label: 'Scans', icon: ScanLine, to: '/scans' },
  { label: 'Schedule', icon: Calendar, to: '/schedule' },
]

const bottomItems = [
  { label: 'Notifications', icon: Bell, to: '/notifications' },
  { label: 'Settings', icon: Settings, to: '/settings' },
  { label: 'Support', icon: HelpCircle, to: '/support' },
]

function NavItem({ item, onClick }) {
  return (
    <NavLink
      to={item.to}
      onClick={onClick}
      className={({ isActive }) => clsx(
        'flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-150 group',
        isActive
          ? 'bg-brand-teal/10 text-brand-teal'
          : 'text-light-subtext dark:text-dark-subtext hover:text-light-text dark:hover:text-dark-text hover:bg-light-muted dark:hover:bg-dark-muted'
      )}
    >
      {({ isActive }) => (
        <>
          <item.icon size={17} className={isActive ? 'text-brand-teal' : ''} />
          <span>{item.label}</span>
          {isActive && <div className="ml-auto w-1.5 h-1.5 rounded-full bg-brand-teal" />}
        </>
      )}
    </NavLink>
  )
}

export function Sidebar({ mobileOpen, onMobileClose }) {
  const navigate = useNavigate()

  const SidebarContent = ({ onItemClick }) => (
    <div className="flex flex-col h-full">
      {/* Logo */}
      <div className="flex items-center gap-2.5 px-4 py-4 border-b border-light-border dark:border-dark-border">
        <div className="w-7 h-7 rounded-full bg-brand-teal flex items-center justify-center">
          <div className="w-3 h-3 rounded-full bg-white/30 border-2 border-white" />
        </div>
        <span className="font-bold text-base text-light-text dark:text-dark-text tracking-tight">aps</span>
      </div>

      {/* Main nav */}
      <nav className="flex-1 px-2 py-3 space-y-0.5">
        {navItems.map(item => (
          <NavItem key={item.to} item={item} onClick={onItemClick} />
        ))}
      </nav>

      {/* Bottom nav */}
      <div className="px-2 py-3 border-t border-light-border dark:border-dark-border space-y-0.5">
        {bottomItems.map(item => (
          <NavItem key={item.to} item={item} onClick={onItemClick} />
        ))}
      </div>

      {/* User profile */}
      <div
        className="flex items-center gap-3 px-4 py-3 border-t border-light-border dark:border-dark-border cursor-pointer hover:bg-light-muted dark:hover:bg-dark-muted transition-colors"
        onClick={() => { navigate('/dashboard'); onItemClick?.() }}
      >
        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-orange-400 to-pink-500 flex-shrink-0 overflow-hidden">
          <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=admin" alt="" className="w-full h-full" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-xs font-medium text-light-text dark:text-dark-text truncate">admin@edu.com</p>
          <p className="text-xs text-light-subtext dark:text-dark-subtext truncate">Security Lead</p>
        </div>
        <ChevronRight size={14} className="text-light-subtext dark:text-dark-subtext flex-shrink-0" />
      </div>
    </div>
  )

  return (
    <>
      {/* Desktop sidebar */}
      <aside className="hidden lg:flex flex-col w-[168px] shrink-0 bg-light-surface dark:bg-dark-surface border-r border-light-border dark:border-dark-border h-screen sticky top-0">
        <SidebarContent />
      </aside>

      {/* Mobile overlay sidebar */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={onMobileClose}
              className="lg:hidden fixed inset-0 bg-black/60 z-40"
            />
            <motion.aside
              initial={{ x: -280 }}
              animate={{ x: 0 }}
              exit={{ x: -280 }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              className="lg:hidden fixed left-0 top-0 bottom-0 w-64 z-50 bg-light-surface dark:bg-dark-surface border-r border-light-border dark:border-dark-border"
            >
              <button
                onClick={onMobileClose}
                className="absolute top-3 right-3 p-1.5 rounded-md text-light-subtext dark:text-dark-subtext hover:bg-light-muted dark:hover:bg-dark-muted"
              >
                <X size={16} />
              </button>
              <SidebarContent onItemClick={onMobileClose} />
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  )
}

// Hamburger button for mobile
export function MobileMenuButton({ onClick }) {
  return (
    <button
      onClick={onClick}
      className="lg:hidden p-2 rounded-lg text-light-subtext dark:text-dark-subtext hover:bg-light-muted dark:hover:bg-dark-muted transition-colors"
      aria-label="Open menu"
    >
      <Menu size={20} />
    </button>
  )
}