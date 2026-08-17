import { cn } from '@/lib/utils'

export function Logo({
  className,
  showText = true,
}: {
  className?: string
  showText?: boolean
}) {
  return (
    <div className={cn('flex items-center gap-2.5', className)}>
      <span className="relative inline-flex size-9 shrink-0 items-center justify-center">
        <svg
          viewBox="0 0 48 48"
          fill="none"
          className="size-9"
          aria-hidden="true"
        >
          <defs>
            <linearGradient id="fl-ball" x1="4" y1="4" x2="44" y2="44">
              <stop offset="0" stopColor="oklch(0.86 0.24 146)" />
              <stop offset="1" stopColor="oklch(0.79 0.16 66)" />
            </linearGradient>
          </defs>
          {/* ball outline */}
          <circle
            cx="24"
            cy="24"
            r="19"
            stroke="url(#fl-ball)"
            strokeWidth="3"
          />
          {/* stylized pentagon core */}
          <path
            d="M24 12l7 5-2.7 8.3h-8.6L17 17z"
            fill="oklch(0.86 0.24 146)"
          />
          {/* lightning bolt cutting through */}
          <path
            d="M27 6L14 26h8l-4 16 18-24h-9l5-12z"
            fill="oklch(0.79 0.16 66)"
            stroke="oklch(0.16 0.022 264)"
            strokeWidth="1"
            strokeLinejoin="round"
          />
        </svg>
      </span>
      {showText && (
        <span className="font-display text-lg leading-none italic tracking-tight sm:text-xl">
          <span className="text-primary">FOOTBALL</span>{' '}
          <span className="text-secondary">LOVERS</span>
        </span>
      )}
    </div>
  )
}
