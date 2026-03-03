import clsx from 'clsx'

export function Skeleton({ className }) {
  return (
    <div className={clsx(
      'animate-pulse rounded-md bg-light-muted dark:bg-dark-muted',
      className
    )} />
  )
}

export function ScanTableSkeleton() {
  return (
    <div className="bg-light-surface dark:bg-dark-surface rounded-xl border border-light-border dark:border-dark-border overflow-hidden">
      {/* Toolbar skeleton */}
      <div className="flex items-center gap-3 p-4">
        <Skeleton className="h-9 flex-1 max-w-sm" />
        <Skeleton className="h-9 w-20" />
        <Skeleton className="h-9 w-20" />
        <Skeleton className="h-9 w-24" />
      </div>

      {/* Table header */}
      <div className="flex gap-4 px-4 py-2.5 border-y border-light-border dark:border-dark-border bg-light-bg dark:bg-dark-bg">
        {[140, 80, 90, 120, 100, 80].map((w, i) => (
          <Skeleton key={i} className="h-3" style={{ width: w }} />
        ))}
      </div>

      {/* Rows */}
      {Array.from({ length: 7 }).map((_, i) => (
        <div key={i} className="flex items-center gap-4 px-4 py-3.5 border-b border-light-border dark:border-dark-border">
          <Skeleton className="h-4 w-36" />
          <Skeleton className="h-4 w-16" />
          <Skeleton className="h-6 w-20 rounded-full" />
          <Skeleton className="h-2 w-24 rounded-full" />
          <div className="flex gap-1">
            {[1,2,3,4].map(j => <Skeleton key={j} className="h-5 w-7 rounded" />)}
          </div>
          <Skeleton className="h-4 w-12" />
        </div>
      ))}
    </div>
  )
}

export function SeverityCardsSkeleton() {
  return (
    <div className="flex bg-light-surface dark:bg-dark-surface border-b border-light-border dark:border-dark-border">
      {[1,2,3,4].map(i => (
        <div key={i} className="flex-1 px-5 py-4 border-r border-light-border dark:border-dark-border last:border-0 space-y-3">
          <div className="flex justify-between">
            <Skeleton className="h-4 w-28" />
            <Skeleton className="h-5 w-5 rounded-full" />
          </div>
          <Skeleton className="h-8 w-16" />
          <Skeleton className="h-3 w-40" />
        </div>
      ))}
    </div>
  )
}

export function FindingCardSkeleton() {
  return (
    <div className="p-4 rounded-xl border border-light-border dark:border-dark-border space-y-2.5">
      <div className="flex justify-between">
        <Skeleton className="h-5 w-16 rounded" />
        <Skeleton className="h-4 w-14" />
      </div>
      <Skeleton className="h-4 w-3/4" />
      <Skeleton className="h-3 w-32" />
      <Skeleton className="h-3 w-full" />
      <Skeleton className="h-3 w-4/5" />
    </div>
  )
}