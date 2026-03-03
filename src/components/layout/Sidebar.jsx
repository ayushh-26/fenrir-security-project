import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard,
  FolderOpen,
  ScanLine,
  Calendar,
  Bell,
  Settings,
  HelpCircle,
  ChevronRight,
  X,
  Menu,
} from "lucide-react";
import clsx from "clsx";

const navItems = [
  { label: "Dashboard", icon: LayoutDashboard, to: "/dashboard" },
  { label: "Projects", icon: FolderOpen, to: "/projects" },
  { label: "Scans", icon: ScanLine, to: "/scans" },
  { label: "Schedule", icon: Calendar, to: "/schedule" },
];

const bottomItems = [
  { label: "Notifications", icon: Bell, to: "/notifications" },
  { label: "Settings", icon: Settings, to: "/settings" },
  { label: "Support", icon: HelpCircle, to: "/support" },
];

function NavItem({ item, onClick }) {
  return (
    <NavLink
      to={item.to}
      onClick={onClick}
      aria-label={`Navigate to ${item.label}`}
      className={({ isActive }) =>
        clsx(
          "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-150 group",
          "focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-teal",
          isActive
            ? "bg-brand-teal/10 text-brand-teal"
            : "text-light-subtext dark:text-dark-subtext hover:text-light-text dark:hover:text-dark-text hover:bg-light-muted dark:hover:bg-dark-muted",
        )
      }
    >
      {({ isActive }) => (
        <>
          <item.icon
            size={17}
            aria-hidden="true"
            className={isActive ? "text-brand-teal" : ""}
          />
          <span>{item.label}</span>
          {isActive && (
            <div
              className="ml-auto w-1.5 h-1.5 rounded-full bg-brand-teal"
              aria-hidden="true"
            />
          )}
        </>
      )}
    </NavLink>
  );
}

function SidebarContent({ onItemClick }) {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col h-full">
      {/* Logo */}
      <div className="flex items-center gap-2.5 px-4 py-4 border-b border-light-border dark:border-dark-border">
        <div className="w-7 h-7 rounded-full bg-brand-teal flex items-center justify-center">
          <div className="w-2.5 h-2.5 rounded-full bg-white" />
        </div>
        <span className="font-bold text-base text-light-text dark:text-dark-text tracking-tight">
          aps
        </span>
      </div>

      {/* Main nav */}
      <nav
        className="flex-1 px-2 py-3 space-y-0.5"
        aria-label="Main navigation"
      >
        {navItems.map((item) => (
          <NavItem key={item.to} item={item} onClick={onItemClick} />
        ))}
      </nav>

      {/* Bottom nav */}
      <div className="px-2 py-3 border-t border-light-border dark:border-dark-border space-y-0.5">
        <nav aria-label="Support navigation">
          {bottomItems.map((item) => (
            <NavItem key={item.to} item={item} onClick={onItemClick} />
          ))}
        </nav>
      </div>

      {/* User profile */}
      <div
        role="button"
        tabIndex={0}
        aria-label="User profile: admin@edu.com, Security Lead"
        onClick={() => {
          navigate("/dashboard");
          onItemClick?.();
        }}
        onKeyDown={(e) => e.key === "Enter" && navigate("/dashboard")}
        className="flex items-center gap-3 px-4 py-3 border-t border-light-border dark:border-dark-border cursor-pointer hover:bg-light-muted dark:hover:bg-dark-muted transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-teal"
      >
        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-orange-400 to-pink-500 flex-shrink-0 overflow-hidden">
          <img
            src="https://api.dicebear.com/7.x/avataaars/svg?seed=admin"
            alt="User avatar"
            className="w-full h-full"
          />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-xs font-medium text-light-text dark:text-dark-text truncate">
            admin@edu.com
          </p>
          <p className="text-xs text-light-subtext dark:text-dark-subtext truncate">
            Security Lead
          </p>
        </div>
        <ChevronRight
          size={14}
          className="text-light-subtext dark:text-dark-subtext flex-shrink-0"
          aria-hidden="true"
        />
      </div>
    </div>
  );
}

export function Sidebar({ mobileOpen, onMobileClose }) {
  return (
    <>
      {/* Desktop sidebar */}
      <aside
        className="hidden lg:flex flex-col w-[168px] shrink-0 bg-light-surface dark:bg-dark-surface border-r border-light-border dark:border-dark-border h-screen sticky top-0"
        aria-label="Application sidebar"
      >
        <SidebarContent />
      </aside>

      {/* Mobile overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={onMobileClose}
              className="lg:hidden fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
              aria-hidden="true"
            />
            <motion.aside
              initial={{ x: -280 }}
              animate={{ x: 0 }}
              exit={{ x: -280 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="lg:hidden fixed left-0 top-0 bottom-0 w-64 z-50 bg-light-surface dark:bg-dark-surface border-r border-light-border dark:border-dark-border"
              aria-label="Mobile navigation sidebar"
            >
              <button
                onClick={onMobileClose}
                aria-label="Close navigation menu"
                className="absolute top-3 right-3 p-1.5 rounded-md text-light-subtext dark:text-dark-subtext hover:bg-light-muted dark:hover:bg-dark-muted focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-teal"
              >
                <X size={16} aria-hidden="true" />
              </button>
              <SidebarContent onItemClick={onMobileClose} />
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

export function MobileMenuButton({ onClick }) {
  return (
    <button
      onClick={onClick}
      aria-label="Open navigation menu"
      aria-expanded={false}
      className="lg:hidden p-2 rounded-lg text-light-subtext dark:text-dark-subtext hover:bg-light-muted dark:hover:bg-dark-muted transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-teal"
    >
      <Menu size={20} aria-hidden="true" />
    </button>
  );
}
