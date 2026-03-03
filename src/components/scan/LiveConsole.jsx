import { useState } from 'react'
import { activityLogs, verificationLogs } from '../../data/logs'
import clsx from 'clsx'

function LogLine({ entry }) {
  const renderHighlight = (h) => {
    if (!h?.length) return null
    return h.map((item, i) => {
      const cls = {
        url: 'text-brand-teal underline cursor-pointer',
        warn: 'text-sev-medium',
        path: 'bg-dark-muted/80 text-sev-low px-1 rounded font-mono text-xs',
        header: 'text-sev-high font-mono',
        critical: 'font-bold text-sev-critical',
      }[item.type] || 'text-brand-teal'
      return <span key={i} className={cls}>{item.value}</span>
    })
  }

  return (
    <div className="mb-3 text-xs leading-relaxed font-mono">
      <span className="text-brand-teal/70">[{entry.time}]</span>{' '}
      <span className="text-dark-text">{entry.text}</span>
      {renderHighlight(entry.highlight)}
      {entry.after && <span className="text-dark-text">{entry.after}</span>}
      {entry.highlight2 && renderHighlight(entry.highlight2)}
      {entry.after2 && <span className="text-dark-text">{entry.after2}</span>}
      {entry.block && (
        <div className="mt-1 ml-4 pl-3 border-l border-dark-border text-dark-subtext whitespace-pre-wrap">
          {entry.block}
        </div>
      )}
    </div>
  )
}

export function LiveConsole() {
  const [tab, setTab] = useState('activity')
  const tabs = [['activity', 'Activity Log'], ['verification', 'Verification Loops']]
  const logs = tab === 'activity' ? activityLogs : verificationLogs

  return (
    <div className="flex flex-col h-full">
      {/* Console header */}
      <div className="flex items-center justify-between px-4 py-2.5 border-b border-light-border dark:border-dark-border">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-brand-teal animate-pulse-dot" aria-hidden="true" />
          <span className="text-sm font-semibold text-light-text dark:text-dark-text">Live Scan Console</span>
        </div>
        <div className="flex items-center gap-2 text-xs text-light-subtext dark:text-dark-subtext" aria-live="polite">
          <span className="w-1.5 h-1.5 rounded-full bg-brand-teal animate-pulse-dot" aria-hidden="true" />
          Running...
        </div>
      </div>

      {/* Tabs with ARIA + keyboard nav */}
      <div
        className="flex border-b border-light-border dark:border-dark-border"
        role="tablist"
        aria-label="Console output tabs"
      >
        {tabs.map(([id, label], i) => (
          <button
            key={id}
            role="tab"
            aria-selected={tab === id}
            aria-controls={`console-panel-${id}`}
            id={`console-tab-${id}`}
            onClick={() => setTab(id)}
            onKeyDown={(e) => {
              if (e.key === 'ArrowRight') setTab(tabs[(i + 1) % tabs.length][0])
              if (e.key === 'ArrowLeft') setTab(tabs[(i - 1 + tabs.length) % tabs.length][0])
            }}
            className={clsx(
              'px-4 py-2 text-xs font-medium border-b-2 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-brand-teal',
              tab === id
                ? 'border-brand-teal text-brand-teal'
                : 'border-transparent text-light-subtext dark:text-dark-subtext hover:text-light-text dark:hover:text-dark-text'
            )}
          >
            {label}
          </button>
        ))}
      </div>

      {/* Log output */}
      <div
        id={`console-panel-${tab}`}
        role="tabpanel"
        aria-labelledby={`console-tab-${tab}`}
        className="flex-1 overflow-y-auto p-4 bg-[#0D0D0D] scrollbar-thin"
      >
        {logs.map(entry => <LogLine key={entry.id} entry={entry} />)}
        {/* Blinking cursor */}
        <div className="flex items-center gap-1 mt-1" aria-hidden="true">
          <span className="w-2 h-4 bg-brand-teal/70 animate-pulse inline-block" />
        </div>
      </div>
    </div>
  )
}