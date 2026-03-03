import clsx from 'clsx'

const severityConfig = {
  Critical: 'bg-sev-critical text-white',
  High: 'bg-sev-high text-white',
  Medium: 'bg-sev-medium text-black',
  Low: 'bg-sev-low text-white',
}

const severityDotConfig = {
  Critical: 'bg-red-100 text-sev-critical border border-red-200 dark:bg-red-900/20 dark:border-red-800',
  High: 'bg-orange-100 text-sev-high border border-orange-200 dark:bg-orange-900/20 dark:border-orange-800',
  Medium: 'bg-yellow-100 text-sev-medium border border-yellow-200 dark:bg-yellow-900/20 dark:border-yellow-800',
  Low: 'bg-green-100 text-sev-low border border-green-200 dark:bg-green-900/20 dark:border-green-800',
}

// Small colored number badge used in table vuln columns
export function VulnBadge({ count, severity }) {
  const colors = {
    critical: 'bg-sev-critical',
    high: 'bg-sev-high',
    medium: 'bg-sev-medium',
    low: 'bg-sev-low',
  }
  if (count === null || count === undefined) return null
  return (
    <span className={clsx(
      'inline-flex items-center justify-center min-w-[22px] h-[22px] px-1 rounded text-xs font-semibold text-white',
      colors[severity]
    )}>
      {count}
    </span>
  )
}

// Full pill badge for finding log severity
export function SeverityBadge({ severity, variant = 'pill' }) {
  if (variant === 'dot') {
    return (
      <span className={clsx(
        'inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold',
        severityDotConfig[severity]
      )}>
        {severity}
      </span>
    )
  }
  return (
    <span className={clsx(
      'inline-flex items-center px-2 py-0.5 rounded text-xs font-bold tracking-wide',
      severityConfig[severity]
    )}>
      {severity}
    </span>
  )
}