import { SeverityBadge } from '../ui/Badge'

export function FindingCard({ finding }) {
  return (
    <div className="p-4 rounded-xl border border-light-border dark:border-dark-border bg-light-bg dark:bg-dark-bg hover:border-light-muted dark:hover:border-dark-muted transition-colors animate-slide-up">
      <div className="flex items-start justify-between gap-2 mb-2">
        <SeverityBadge severity={finding.severity} />
        <span className="text-xs text-light-subtext dark:text-dark-subtext font-mono flex-shrink-0">{finding.time}</span>
      </div>
      <h4 className="text-sm font-semibold text-light-text dark:text-dark-text mt-2 mb-1">{finding.title}</h4>
      <p className="text-xs font-mono text-brand-teal mb-2">{finding.endpoint}</p>
      <p className="text-xs text-light-subtext dark:text-dark-subtext leading-relaxed">{finding.description}</p>
    </div>
  )
}