import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Download, StopCircle, ArrowLeft } from 'lucide-react'
import { AppLayout } from '../components/layout/AppLayout'
import { ProgressRing } from '../components/scan/ProgressRing'
import { StepTracker } from '../components/scan/StepTracker'
import { ScanMetadata } from '../components/scan/ScanMetadata'
import { LiveConsole } from '../components/scan/LiveConsole'
import { FindingLog } from '../components/scan/FindingLog'
import { StatusBar } from '../components/scan/StatusBar'
import { Modal } from '../components/ui/Modal'
import { Button } from '../components/ui/Button'
import { PageTransition } from '../components/layout/PageTransition'
import { scans } from '../data/scans'
import { toast } from 'sonner'

const statusBarStats = {
  subAgents: 0,
  parallelExecutions: 2,
  operations: 1,
  critical: 0,
  high: 0,
  medium: 0,
  low: 0,
}

export default function ScanDetailPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [stopModal, setStopModal] = useState(false)
  const [stopped, setStopped] = useState(false)

  // Look up the actual scan from mock data
  const scan = scans.find(s => s.id === id) || scans[0]

  // Build metadata from real scan data
  const meta = {
    scanType: scan.type === 'Greybox' ? 'Grey Box' : scan.type === 'Blackbox' ? 'Black Box' : 'White Box',
    targets: scan.target,
    startedAt: 'Nov 22, 09:00AM',
    credentials: scan.status === 'Completed' ? '2 Active' : '1 Active',
    files: 'Control.pdf',
    checklists: scan.status === 'Completed' ? '350/350' : '40/350',
  }

  const progress = scan.status === 'Completed' ? 100 : scan.status === 'Failed' ? scan.progress : 0

  const handleStop = () => {
    setStopped(true)
    setStopModal(false)
    toast.error('Scan stopped successfully')
  }

  const actions = (
    <>
      <Button
        variant="secondary"
        size="sm"
        onClick={() => toast.success(`Report exported as ${scan.name.toLowerCase().replace(/ /g, '-')}-report.pdf`)}
      >
        <Download size={14} />
        <span className="hidden sm:inline">Export Report</span>
      </Button>
      <Button
        variant="danger"
        size="sm"
        onClick={() => stopped ? null : setStopModal(true)}
        disabled={stopped || scan.status === 'Completed'}
        aria-label={stopped ? 'Scan already stopped' : 'Stop this scan'}
      >
        <StopCircle size={14} />
        <span className="hidden sm:inline">
          {stopped || scan.status === 'Completed' ? 'Completed' : 'Stop Scan'}
        </span>
      </Button>
    </>
  )

  return (
    <PageTransition>
      <AppLayout
        breadcrumbs={['Private Assets', scan.name]}
        actions={actions}
      >
        {/* Top section */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-light-surface dark:bg-dark-surface border-b border-light-border dark:border-dark-border"
        >
          <div className="flex items-center gap-6 px-5 py-5">
            <div className="flex-shrink-0">
              <ProgressRing
                percent={stopped ? 45 : progress}
                label={scan.status === 'Completed' ? 'Completed' : stopped ? 'Stopped' : 'In Progress'}
                size={96}
              />
            </div>
            <StepTracker
              activeStep={
                scan.status === 'Completed' ? 4
                : scan.status === 'Failed' ? 1
                : 0
              }
            />
          </div>
          <ScanMetadata meta={meta} />
        </motion.div>

        {/* Console + Findings */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.15 }}
          className="flex flex-col lg:flex-row m-4 lg:m-5 rounded-xl border border-light-border dark:border-dark-border overflow-hidden bg-light-surface dark:bg-dark-surface"
          style={{ minHeight: '500px' }}
        >
          <div className="flex-1 flex flex-col border-b lg:border-b-0 lg:border-r border-light-border dark:border-dark-border min-h-[350px] lg:min-h-0">
            <LiveConsole />
          </div>
          <div className="w-full lg:w-80 xl:w-96 flex flex-col min-h-[300px] lg:min-h-0">
            <FindingLog />
          </div>
        </motion.div>

        <StatusBar stats={statusBarStats} />

        <Modal isOpen={stopModal} onClose={() => setStopModal(false)} title="Stop Active Scan?">
          <p className="text-sm text-light-subtext dark:text-dark-subtext mb-5">
            Stopping the scan will halt all active agents and sub-processes. Partial findings will be saved. This action cannot be undone.
          </p>
          <div className="flex gap-3">
            <Button variant="secondary" className="flex-1" onClick={() => setStopModal(false)}>
              Keep Running
            </Button>
            <Button variant="danger" className="flex-1" onClick={handleStop}>
              Stop Scan
            </Button>
          </div>
        </Modal>
      </AppLayout>
    </PageTransition>
  )
}