import clsx from 'clsx'
import { ScanLine, Map, FlaskConical, ShieldCheck, FileText } from 'lucide-react'

const steps = [
  { label: 'Spidering', icon: ScanLine },
  { label: 'Mapping', icon: Map },
  { label: 'Testing', icon: FlaskConical },
  { label: 'Validating', icon: ShieldCheck },
  { label: 'Reporting', icon: FileText },
]

export function StepTracker({ activeStep = 0 }) {
  return (
    <div className="flex items-start gap-0 flex-1 min-w-0" role="list" aria-label="Scan progress steps">
      {steps.map((step, i) => {
        const isActive = i === activeStep
        const isDone = i < activeStep
        return (
          <div
            key={step.label}
            role="listitem"
            aria-label={`${step.label}${isActive ? ' — current step' : isDone ? ' — completed' : ''}`}
            className="flex-1 flex flex-col items-center min-w-0"
          >
            <div className="flex items-center w-full">
              <div className={clsx(
                'flex-1 h-px',
                i === 0 ? 'invisible' : isDone || isActive ? 'bg-brand-teal' : 'bg-light-border dark:bg-dark-border'
              )} />
              <div className={clsx(
                'w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 border-2 transition-all',
                isActive
                  ? 'border-brand-teal bg-brand-teal/10 shadow-[0_0_12px_rgba(12,200,168,0.3)]'
                  : isDone
                  ? 'border-brand-teal bg-brand-teal'
                  : 'border-light-border dark:border-dark-border bg-light-bg dark:bg-dark-bg'
              )}>
                <step.icon
                  size={14}
                  aria-hidden="true"
                  className={isActive ? 'text-brand-teal' : isDone ? 'text-white' : 'text-light-subtext dark:text-dark-subtext'}
                />
              </div>
              <div className={clsx(
                'flex-1 h-px',
                i === steps.length - 1 ? 'invisible' : isDone ? 'bg-brand-teal' : 'bg-light-border dark:bg-dark-border'
              )} />
            </div>
            {/* Label — hidden on very small screens, shown sm+ */}
            <span className={clsx(
              'mt-1.5 text-xs font-medium text-center leading-tight px-0.5 hidden xs:block sm:block',
              isActive ? 'text-brand-teal' : isDone ? 'text-light-text dark:text-dark-text' : 'text-light-subtext dark:text-dark-subtext'
            )}>
              {step.label}
            </span>
          </div>
        )
      })}
    </div>
  )
}