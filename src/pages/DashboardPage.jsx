import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Download, StopCircle } from 'lucide-react'
import { AppLayout } from '../components/layout/AppLayout'
import { OrgStatsBar } from '../components/dashboard/OrgStatsBar'
import { SeverityCard } from '../components/dashboard/SeverityCard'
import { ScanTable } from '../components/dashboard/ScanTable'
import { Button } from '../components/ui/Button'
import { SeverityCardsSkeleton, ScanTableSkeleton } from '../components/ui/Skeleton'
import { PageTransition } from '../components/layout/PageTransition'
import { scans, severityStats } from '../data/scans'
import { toast } from 'sonner'

export default function DashboardPage() {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 900)
    return () => clearTimeout(t)
  }, [])

  const actions = (
    <>
      <Button variant="secondary" size="sm" onClick={() => toast.success('Report exported!')}>
        <Download size={14} />
        <span className="hidden sm:inline">Export Report</span>
      </Button>
      <Button variant="danger" size="sm" onClick={() => toast.error('All scans stopped')}>
        <StopCircle size={14} />
        <span className="hidden sm:inline">Stop Scan</span>
      </Button>
    </>
  )

  return (
    <PageTransition>
      <AppLayout breadcrumbs={['Scan', '⌂', 'Private Assets', 'New Scan']} actions={actions}>
        <OrgStatsBar />

        {loading ? (
          <>
            <SeverityCardsSkeleton />
            <div className="p-4 lg:p-5">
              <ScanTableSkeleton />
            </div>
          </>
        ) : (
          <>
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="flex bg-light-surface dark:bg-dark-surface border-b border-light-border dark:border-dark-border overflow-x-auto"
            >
              {Object.entries(severityStats).map(([key, val]) => (
                <SeverityCard
                  key={key}
                  severity={key.charAt(0).toUpperCase() + key.slice(1)}
                  count={val.count}
                  change={val.change}
                  up={val.up}
                />
              ))}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.1 }}
              className="p-4 lg:p-5"
            >
              <ScanTable scans={scans} />
            </motion.div>
          </>
        )}
      </AppLayout>
    </PageTransition>
  )
}