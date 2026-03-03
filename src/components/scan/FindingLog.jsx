import { findings } from '../../data/findings'
import { FindingCard } from './FindingCard'

export function FindingLog() {
  return (
    <div className="flex flex-col h-full">
      <div className="px-4 py-3 border-b border-light-border dark:border-dark-border">
        <h3 className="text-sm font-semibold text-light-text dark:text-dark-text">Finding Log</h3>
      </div>
      <div className="flex-1 overflow-y-auto p-3 space-y-3 scrollbar-thin">
        {findings.map(f => <FindingCard key={f.id} finding={f} />)}
      </div>
    </div>
  )
}