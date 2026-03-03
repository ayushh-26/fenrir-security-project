export function ScanMetadata({ meta }) {
  const items = [
    { label: 'Scan Type', value: meta.scanType },
    { label: 'Targets', value: meta.targets },
    { label: 'Started At', value: meta.startedAt },
    { label: 'Credentials', value: meta.credentials },
    { label: 'Files', value: meta.files },
    { label: 'Checklists', value: meta.checklists, accent: true },
  ]

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-x-4 gap-y-3 px-5 py-4 border-t border-light-border dark:border-dark-border">
      {items.map(item => (
        <div key={item.label} className="min-w-0">
          <p className="text-xs text-light-subtext dark:text-dark-subtext mb-0.5 truncate">
            {item.label}
          </p>
          <p className={`text-sm font-semibold truncate ${item.accent ? 'text-brand-teal' : 'text-light-text dark:text-dark-text'}`}>
            {item.value}
          </p>
        </div>
      ))}
    </div>
  )
}