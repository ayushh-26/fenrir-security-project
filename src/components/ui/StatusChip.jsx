import clsx from 'clsx'

const config = {
  Completed: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/25 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800',
  Scheduled: 'bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400 border border-gray-200 dark:border-gray-700',
  Failed: 'bg-red-100 text-red-600 dark:bg-red-900/25 dark:text-red-400 border border-red-200 dark:border-red-800',
  Running: 'bg-brand-teal/10 text-brand-teal border border-brand-teal/30',
}

export function StatusChip({ status }) {
  return (
    <span className={clsx(
      'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium',
      config[status] || config.Scheduled
    )}>
      {status}
    </span>
  )
}