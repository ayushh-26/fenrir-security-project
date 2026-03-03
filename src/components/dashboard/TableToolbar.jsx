import { useState, useRef, useEffect } from 'react'
import { Search, Filter, Columns, Plus, Check } from 'lucide-react'
import { Input } from '../ui/Input'
import { Button } from '../ui/Button'

const STATUS_OPTIONS = ['All', 'Completed', 'Scheduled', 'Failed']

export function TableToolbar({ search, onSearch, onNewScan, statusFilter, onStatusFilter }) {
  const [filterOpen, setFilterOpen] = useState(false)
  const [colOpen, setColOpen] = useState(false)
  const filterRef = useRef(null)
  const colRef = useRef(null)

  // Close dropdowns on outside click
  useEffect(() => {
    const handler = (e) => {
      if (filterRef.current && !filterRef.current.contains(e.target)) setFilterOpen(false)
      if (colRef.current && !colRef.current.contains(e.target)) setColOpen(false)
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  return (
    <div className="flex items-center gap-3 p-4 flex-wrap gap-y-3">
      <div className="flex-1 min-w-[200px]">
        <Input
          placeholder="Search scans by name or type..."
          value={search}
          onChange={e => onSearch(e.target.value)}
          icon={<Search size={14} />}
          aria-label="Search scans"
        />
      </div>

      <div className="flex items-center gap-2">
        {/* Filter dropdown */}
        <div className="relative" ref={filterRef}>
          <Button
            variant="secondary"
            size="sm"
            onClick={() => { setFilterOpen(p => !p); setColOpen(false) }}
            aria-haspopup="listbox"
            aria-expanded={filterOpen}
          >
            <Filter size={13} />
            Filter
            {statusFilter !== 'All' && (
              <span className="ml-1 w-4 h-4 rounded-full bg-brand-teal text-white text-[10px] flex items-center justify-center">
                1
              </span>
            )}
          </Button>

          {filterOpen && (
            <div
              role="listbox"
              aria-label="Filter by status"
              className="absolute top-full mt-1 left-0 z-30 bg-light-surface dark:bg-dark-card border border-light-border dark:border-dark-border rounded-xl shadow-xl py-1 min-w-[160px] animate-fade-in"
            >
              <p className="px-3 py-1.5 text-[10px] font-semibold uppercase tracking-wider text-light-subtext dark:text-dark-subtext">
                Status
              </p>
              {STATUS_OPTIONS.map(opt => (
                <button
                  key={opt}
                  role="option"
                  aria-selected={statusFilter === opt}
                  onClick={() => { onStatusFilter(opt); setFilterOpen(false) }}
                  className="w-full flex items-center justify-between px-3 py-2 text-sm text-light-text dark:text-dark-text hover:bg-light-bg dark:hover:bg-dark-muted transition-colors"
                >
                  {opt}
                  {statusFilter === opt && <Check size={12} className="text-brand-teal" />}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Column toggle dropdown */}
        <div className="relative" ref={colRef}>
          <Button
            variant="secondary"
            size="sm"
            onClick={() => { setColOpen(p => !p); setFilterOpen(false) }}
            aria-haspopup="listbox"
            aria-expanded={colOpen}
          >
            <Columns size={13} />
            Column
          </Button>

          {colOpen && (
            <div
              className="absolute top-full mt-1 right-0 z-30 bg-light-surface dark:bg-dark-card border border-light-border dark:border-dark-border rounded-xl shadow-xl py-1 min-w-[180px] animate-fade-in"
            >
              <p className="px-3 py-1.5 text-[10px] font-semibold uppercase tracking-wider text-light-subtext dark:text-dark-subtext">
                Visible Columns
              </p>
              {['Scan Name', 'Type', 'Status', 'Progress', 'Vulnerability', 'Last Scan'].map(col => (
                <div key={col} className="flex items-center gap-2.5 px-3 py-2">
                  <div className="w-3.5 h-3.5 rounded border-2 border-brand-teal bg-brand-teal flex items-center justify-center flex-shrink-0">
                    <Check size={9} className="text-white" />
                  </div>
                  <span className="text-sm text-light-text dark:text-dark-text">{col}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        <Button variant="primary" size="sm" onClick={onNewScan} aria-label="Create new scan">
          <Plus size={13} />
          New Scan
        </Button>
      </div>
    </div>
  )
}