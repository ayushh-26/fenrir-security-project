import { TrendingUp, TrendingDown } from 'lucide-react'
import clsx from 'clsx'

const icons = {
  Critical: '🚫',
  High: '⚠️',
  Medium: '⚠️',
  Low: '🔍',
}

const colors = {
  Critical: 'text-sev-critical',
  High: 'text-sev-high',
  Medium: 'text-sev-medium',
  Low: 'text-sev-low',
}

export function SeverityCard({ severity, count, change, up }) {
  return (
    <div className="flex-1 min-w-0 px-5 py-4 border-r border-light-border dark:border-dark-border last:border-0">
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm text-light-subtext dark:text-dark-subtext font-medium">{severity} Severity</span>
        <span className="text-base">{icons[severity]}</span>
      </div>
      <div className="flex items-end gap-3">
        <span className={clsx('text-3xl font-bold tracking-tight', colors[severity])}>{count}</span>
        <div className={clsx(
          'flex items-center gap-0.5 text-xs font-medium mb-1',
          up ? 'text-sev-critical' : 'text-sev-low'
        )}>
          {up ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
          <span>{up ? '+' : '-'}{change}% {up ? 'increase' : 'decrease'} than yesterday</span>
        </div>
      </div>
    </div>
  )
}