import clsx from 'clsx'

export function Input({ placeholder, value, onChange, className, type = 'text', icon, ...props }) {
  return (
    <div className="relative">
      {icon && (
        <div className="absolute left-3 top-1/2 -translate-y-1/2 text-light-subtext dark:text-dark-subtext">
          {icon}
        </div>
      )}
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className={clsx(
          'w-full bg-light-surface dark:bg-dark-card border border-light-border dark:border-dark-border',
          'rounded-lg py-2 text-sm text-light-text dark:text-dark-text',
          'placeholder:text-light-subtext dark:placeholder:text-dark-subtext',
          'focus:outline-none focus:ring-2 focus:ring-brand-teal/40 focus:border-brand-teal',
          'transition-all duration-150',
          icon ? 'pl-9 pr-3' : 'px-3',
          className
        )}
        {...props}
      />
    </div>
  )
}