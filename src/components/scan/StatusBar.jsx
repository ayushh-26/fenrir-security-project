export function StatusBar({ stats }) {
  return (
    <div className="flex items-center justify-between px-4 py-2.5 border-t border-light-border dark:border-dark-border bg-light-surface dark:bg-dark-surface flex-wrap gap-2">
      <div className="flex items-center gap-4">
        {[
          { label: 'Sub-Agents', value: stats.subAgents },
          { label: 'Parallel Executions', value: stats.parallelExecutions },
          { label: 'Operations', value: stats.operations },
        ].map(item => (
          <div key={item.label} className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-light-muted dark:bg-dark-muted" />
            <span className="text-xs text-light-subtext dark:text-dark-subtext">
              {item.label}: <span className="text-light-text dark:text-dark-text font-medium">{item.value}</span>
            </span>
          </div>
        ))}
      </div>
      <div className="flex items-center gap-3 text-xs">
        <span>Critical: <span className="text-sev-critical font-semibold">{stats.critical}</span></span>
        <span>High: <span className="text-sev-high font-semibold">{stats.high}</span></span>
        <span>Medium: <span className="text-sev-medium font-semibold">{stats.medium}</span></span>
        <span>Low: <span className="text-sev-low font-semibold">{stats.low}</span></span>
      </div>
    </div>
  )
}