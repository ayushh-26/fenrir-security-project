import clsx from 'clsx'

export function Button({ children, variant = 'primary', size = 'md', onClick, className, disabled, type = 'button', ...props }) {
  const base = 'inline-flex items-center justify-center gap-2 font-medium rounded-lg transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-teal disabled:opacity-50 disabled:cursor-not-allowed'

  const variants = {
    primary: 'bg-brand-teal hover:bg-brand-tealDark text-white shadow-sm',
    secondary: 'bg-transparent border border-light-border dark:border-dark-border text-light-text dark:text-dark-text hover:bg-light-muted dark:hover:bg-dark-muted',
    danger: 'bg-sev-critical/10 border border-sev-critical/30 text-sev-critical hover:bg-sev-critical hover:text-white',
    ghost: 'bg-transparent text-light-subtext dark:text-dark-subtext hover:text-light-text dark:hover:text-dark-text hover:bg-light-muted dark:hover:bg-dark-muted',
  }

  const sizes = {
    sm: 'px-3 py-1.5 text-xs',
    md: 'px-4 py-2 text-sm',
    lg: 'px-5 py-2.5 text-sm',
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={clsx(base, variants[variant], sizes[size], className)}
      {...props}
    >
      {children}
    </button>
  )
}