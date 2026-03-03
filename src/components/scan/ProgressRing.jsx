export function ProgressRing({ percent = 0, label = 'In Progress', size = 100 }) {
  const radius = 38
  const stroke = 5
  const circumference = 2 * Math.PI * radius
  const offset = circumference - (percent / 100) * circumference

  return (
    <div className="relative flex items-center justify-center" style={{ width: size, height: size }}>
      <svg width={size} height={size} viewBox="0 0 100 100" className="-rotate-90">
        <circle cx="50" cy="50" r={radius} fill="none" stroke="currentColor" strokeWidth={stroke}
          className="text-light-muted dark:text-dark-muted" />
        <circle cx="50" cy="50" r={radius} fill="none" stroke="#0CC8A8" strokeWidth={stroke}
          strokeDasharray={circumference} strokeDashoffset={offset}
          strokeLinecap="round" className="transition-all duration-700" />
      </svg>
      <div className="absolute text-center">
        <p className="text-xl font-bold text-brand-teal leading-none">{percent}%</p>
        <p className="text-[10px] text-light-subtext dark:text-dark-subtext mt-0.5">{label}</p>
      </div>
    </div>
  )
}