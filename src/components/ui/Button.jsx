// Shared button component — blue hue palette

const variants = {
  primary:   'bg-blue-600 hover:bg-blue-700 text-white border border-blue-600 hover:border-blue-700 shadow-sm',
  secondary: 'bg-white hover:bg-blue-50 text-blue-700 border border-blue-600',
  ghost:     'bg-transparent hover:bg-slate-100 text-slate-600 border border-transparent',
  danger:    'bg-white hover:bg-red-50 text-red-600 border border-red-300',
};

const sizes = {
  sm: 'px-3 py-1.5 text-sm',
  md: 'px-4 py-2 text-sm',
  lg: 'px-5 py-2.5 text-base',
};

export function Button({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  fullWidth = false,
  disabled = false,
  type = 'button',
  onClick,
  icon: Icon,
}) {
  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={[
        'inline-flex items-center justify-center gap-2 rounded-lg font-medium',
        'transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2',
        'disabled:opacity-50 disabled:cursor-not-allowed',
        variants[variant],
        sizes[size],
        fullWidth ? 'w-full' : '',
        className,
      ].join(' ')}
    >
      {Icon && <Icon size={16} className="shrink-0" />}
      {children}
    </button>
  );
}
