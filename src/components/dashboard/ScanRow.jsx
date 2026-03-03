import { useNavigate } from 'react-router-dom'
import { StatusChip } from '../ui/StatusChip'
import { VulnBadge } from '../ui/Badge'
import clsx from 'clsx'

function ProgressBar({ value, status }) {
  const color = status === 'Failed' ? 'bg-sev-critical' : 'bg-brand-teal'
  return (
    <div className="flex items-center gap-2">
      <div className="w-24 h-1.5 bg-light-muted dark:bg-dark-muted rounded-full overflow-hidden">
        <div className={clsx('h-full rounded-full transition-all duration-500', color)} style={{ width: `${value}%` }} />
      </div>
      <span className="text-xs text-light-subtext dark:text-dark-subtext">{value}%</span>
    </div>
  )
}

export function ScanRow({ scan }) {
  const navigate = useNavigate()

  const handleNav = () => navigate(`/scans/${scan.id}`)

  return (
    <tr
      onClick={handleNav}
      onKeyDown={(e) => e.key === 'Enter' && handleNav()}
      tabIndex={0}
      role="button"
      aria-label={`Open scan: ${scan.name}, type: ${scan.type}, status: ${scan.status}`}
      className="border-b border-light-border dark:border-dark-border hover:bg-light-bg dark:hover:bg-dark-muted/30 cursor-pointer transition-colors group focus:outline-none focus-visible:bg-light-bg dark:focus-visible:bg-dark-muted/30"
    >
      <td className="px-4 py-3">
        <span className="text-sm font-medium text-light-text dark:text-dark-text group-hover:text-brand-teal transition-colors">
          {scan.name}
        </span>
      </td>
      <td className="px-4 py-3 text-sm text-light-subtext dark:text-dark-subtext">{scan.type}</td>
      <td className="px-4 py-3"><StatusChip status={scan.status} /></td>
      <td className="px-4 py-3"><ProgressBar value={scan.progress} status={scan.status} /></td>
      <td className="px-4 py-3">
        <div className="flex items-center gap-1">
          <VulnBadge count={scan.vulns.critical} severity="critical" />
          <VulnBadge count={scan.vulns.high} severity="high" />
          <VulnBadge count={scan.vulns.medium} severity="medium" />
          <VulnBadge count={scan.vulns.low} severity="low" />
        </div>
      </td>
      <td className="px-4 py-3 text-xs text-light-subtext dark:text-dark-subtext">{scan.lastScan}</td>
    </tr>
  )
}

export function ScanCard({ scan }) {
  const navigate = useNavigate()

  const handleNav = () => navigate(`/scans/${scan.id}`)

  return (
    <div
      onClick={handleNav}
      onKeyDown={(e) => e.key === 'Enter' && handleNav()}
      tabIndex={0}
      role="button"
      aria-label={`Open scan: ${scan.name}, status: ${scan.status}`}
      className="p-4 bg-light-card dark:bg-dark-card rounded-xl border border-light-border dark:border-dark-border cursor-pointer hover:border-brand-teal/40 transition-all active:scale-[0.99] focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-teal"
    >
      <div className="flex items-start justify-between mb-2">
        <div>
          <p className="text-sm font-semibold text-light-text dark:text-dark-text">{scan.name}</p>
          <p className="text-xs text-light-subtext dark:text-dark-subtext mt-0.5">{scan.type} · {scan.lastScan}</p>
        </div>
        <StatusChip status={scan.status} />
      </div>
      <div className="flex items-center gap-2 mt-3">
        <div className="flex-1 h-1.5 bg-light-muted dark:bg-dark-muted rounded-full overflow-hidden">
          <div
            className={clsx('h-full rounded-full transition-all duration-500', scan.status === 'Failed' ? 'bg-sev-critical' : 'bg-brand-teal')}
            style={{ width: `${scan.progress}%` }}
          />
        </div>
        <span className="text-xs text-light-subtext dark:text-dark-subtext">{scan.progress}%</span>
      </div>
      <div className="flex items-center gap-1 mt-2">
        <VulnBadge count={scan.vulns.critical} severity="critical" />
        <VulnBadge count={scan.vulns.high} severity="high" />
        <VulnBadge count={scan.vulns.medium} severity="medium" />
        <VulnBadge count={scan.vulns.low} severity="low" />
      </div>
    </div>
  )
}