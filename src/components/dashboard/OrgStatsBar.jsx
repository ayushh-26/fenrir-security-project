import { RefreshCw } from 'lucide-react'
import { orgStats } from '../../data/scans'

export function OrgStatsBar() {
  const items = [
    { label: 'Org:', value: orgStats.org, bold: true },
    { label: 'Owner:', value: orgStats.owner },
    { label: 'Total Scans:', value: orgStats.totalScans },
    { label: 'Scheduled:', value: orgStats.scheduled },
    { label: 'Rescans:', value: orgStats.rescans },
    { label: 'Failed Scans:', value: orgStats.failedScans },
  ]

  return (
    <div className="flex items-center gap-0 px-5 py-3 border-b border-light-border dark:border-dark-border bg-light-surface dark:bg-dark-surface flex-wrap gap-y-2">
      {items.map((item, i) => (
        <div key={i} className="flex items-center gap-1.5 pr-4 mr-4 border-r border-light-border dark:border-dark-border last:border-0 last:mr-0 last:pr-0">
          <span className="text-xs text-light-subtext dark:text-dark-subtext">{item.label}</span>
          <span className={`text-xs ${item.bold ? 'font-semibold text-light-text dark:text-dark-text' : 'text-light-text dark:text-dark-text'}`}>
            {item.value}
          </span>
        </div>
      ))}
      <div className="ml-auto flex items-center gap-1.5 text-xs text-light-subtext dark:text-dark-subtext">
        <RefreshCw size={11} />
        {orgStats.lastUpdated}
      </div>
    </div>
  )
}