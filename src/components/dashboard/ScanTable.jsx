import { useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { ScanRow, ScanCard } from './ScanRow'
import { TableToolbar } from './TableToolbar'
import { Modal } from '../ui/Modal'
import { Button } from '../ui/Button'
import { Input } from '../ui/Input'
import { toast } from 'sonner'

const PAGE_SIZE = 8

export function ScanTable({ scans }) {
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState('All')
  const [page, setPage] = useState(1)
  const [newScanModal, setNewScanModal] = useState(false)
  const [newScanName, setNewScanName] = useState('')
  const [newScanType, setNewScanType] = useState('Greybox')

  const filtered = scans.filter(s => {
    const matchesSearch = s.name.toLowerCase().includes(search.toLowerCase()) ||
      s.type.toLowerCase().includes(search.toLowerCase())
    const matchesStatus = statusFilter === 'All' || s.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const totalPages = Math.ceil(filtered.length / PAGE_SIZE)
  const paginated = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE)

  const handleSearch = (val) => { setSearch(val); setPage(1) }
  const handleStatusFilter = (val) => { setStatusFilter(val); setPage(1) }

  const handleNewScan = () => {
    if (!newScanName.trim()) { toast.error('Please enter a scan name'); return }
    toast.success(`Scan "${newScanName}" queued successfully`)
    setNewScanModal(false)
    setNewScanName('')
    setNewScanType('Greybox')
  }

  return (
    <>
      <div className="bg-light-surface dark:bg-dark-surface rounded-xl border border-light-border dark:border-dark-border overflow-hidden">
        <TableToolbar
          search={search}
          onSearch={handleSearch}
          onNewScan={() => setNewScanModal(true)}
          statusFilter={statusFilter}
          onStatusFilter={handleStatusFilter}
        />

        {/* Active filter indicator */}
        {statusFilter !== 'All' && (
          <div className="px-4 pb-2 flex items-center gap-2">
            <span className="text-xs text-light-subtext dark:text-dark-subtext">Filtered by:</span>
            <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-xs bg-brand-teal/10 text-brand-teal border border-brand-teal/20">
              {statusFilter}
              <button
                onClick={() => handleStatusFilter('All')}
                aria-label="Clear filter"
                className="hover:text-white transition-colors"
              >
                ×
              </button>
            </span>
          </div>
        )}

        {/* Desktop table */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full" role="table" aria-label="Scan list">
            <thead>
              <tr className="border-y border-light-border dark:border-dark-border bg-light-bg dark:bg-dark-bg">
                {['Scan Name', 'Type', 'Status', 'Progress', 'Vulnerability', 'Last Scan'].map(col => (
                  <th
                    key={col}
                    scope="col"
                    className="px-4 py-2.5 text-left text-xs font-semibold text-light-subtext dark:text-dark-subtext uppercase tracking-wide"
                  >
                    {col}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {paginated.length > 0 ? (
                paginated.map(scan => <ScanRow key={scan.id} scan={scan} />)
              ) : (
                <tr>
                  <td colSpan={6} className="px-4 py-12 text-center text-sm text-light-subtext dark:text-dark-subtext">
                    No scans match your current filters.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Mobile cards */}
        <div className="md:hidden px-4 pb-4 space-y-3">
          {paginated.length > 0 ? (
            paginated.map(scan => <ScanCard key={scan.id} scan={scan} />)
          ) : (
            <p className="text-center text-sm text-light-subtext dark:text-dark-subtext py-10">
              No scans match your current filters.
            </p>
          )}
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between px-4 py-3 border-t border-light-border dark:border-dark-border">
          <p className="text-xs text-light-subtext dark:text-dark-subtext">
            Showing {filtered.length === 0 ? 0 : (page - 1) * PAGE_SIZE + 1}–{Math.min(page * PAGE_SIZE, filtered.length)} of {filtered.length} scans
          </p>
          <div className="flex items-center gap-1">
            <button
              onClick={() => setPage(p => Math.max(1, p - 1))}
              disabled={page === 1}
              aria-label="Previous page"
              className="p-1.5 rounded-md hover:bg-light-muted dark:hover:bg-dark-muted disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
            >
              <ChevronLeft size={14} className="text-light-subtext dark:text-dark-subtext" />
            </button>
            <span className="text-xs text-light-subtext dark:text-dark-subtext px-2">
              {totalPages > 0 ? `${page} / ${totalPages}` : '0 / 0'}
            </span>
            <button
              onClick={() => setPage(p => Math.min(totalPages, p + 1))}
              disabled={page === totalPages || totalPages === 0}
              aria-label="Next page"
              className="p-1.5 rounded-md hover:bg-light-muted dark:hover:bg-dark-muted disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
            >
              <ChevronRight size={14} className="text-light-subtext dark:text-dark-subtext" />
            </button>
          </div>
        </div>
      </div>

      {/* New Scan Modal */}
      <Modal isOpen={newScanModal} onClose={() => setNewScanModal(false)} title="Create New Scan">
        <div className="space-y-4">
          <div>
            <label className="block text-xs font-medium text-light-subtext dark:text-dark-subtext mb-1.5">
              Scan Name *
            </label>
            <Input
              placeholder="e.g. Web App Servers"
              value={newScanName}
              onChange={e => setNewScanName(e.target.value)}
              aria-label="New scan name"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-light-subtext dark:text-dark-subtext mb-1.5">
              Scan Type
            </label>
            <select
              value={newScanType}
              onChange={e => setNewScanType(e.target.value)}
              aria-label="Scan type"
              className="w-full bg-light-surface dark:bg-dark-card border border-light-border dark:border-dark-border rounded-lg px-3 py-2 text-sm text-light-text dark:text-dark-text focus:outline-none focus:ring-2 focus:ring-brand-teal/40"
            >
              <option>Greybox</option>
              <option>Blackbox</option>
              <option>Whitebox</option>
            </select>
          </div>
          <div>
            <label className="block text-xs font-medium text-light-subtext dark:text-dark-subtext mb-1.5">
              Target URL
            </label>
            <Input
              placeholder="https://target.example.com"
              aria-label="Target URL"
            />
          </div>
          <div className="flex gap-3 pt-1">
            <Button variant="secondary" className="flex-1" onClick={() => setNewScanModal(false)}>
              Cancel
            </Button>
            <Button variant="primary" className="flex-1" onClick={handleNewScan}>
              Create Scan
            </Button>
          </div>
        </div>
      </Modal>
    </>
  )
}