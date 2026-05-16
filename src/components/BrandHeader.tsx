interface BrandHeaderProps {
  greeting?: string;
  name?: string;
  subtitle?: string;
  date?: string;
}

export function BrandHeader({
  greeting,
  name,
  subtitle,
  date,
}: BrandHeaderProps) {
  const hasGreeting = greeting && name && subtitle && date;

  return (
    <div
      className={`flex w-80 max-w-full flex-col sm:w-full ${hasGreeting ? 'gap-6' : 'gap-3'}`}
    >
      <div className="grid grid-cols-[1fr_auto] items-center gap-4">
        <p className="font-display text-lg font-bold uppercase tracking-[0.22em] text-accent">
          Brupress
        </p>
        <svg
          aria-hidden="true"
          className="h-7 w-7 shrink-0 text-accent"
          fill="none"
          viewBox="0 0 24 24"
        >
          <path
            d="M13 3.5l1.35 4.15L18.5 9l-4.15 1.35L13 14.5l-1.35-4.15L7.5 9l4.15-1.35L13 3.5Z"
            fill="currentColor"
          />
          <path
            d="M4.75 16.25c4.5 3.4 10.2 3.45 14.5.1"
            stroke="currentColor"
            strokeLinecap="round"
            strokeWidth="1.6"
          />
          <circle cx="4.75" cy="16.25" fill="currentColor" r="1.4" />
        </svg>
      </div>
      <div className="ml-auto h-px w-80 max-w-full bg-[rgba(170,166,156,0.45)]" />
      {hasGreeting && (
        <div className="flex flex-col gap-2">
          <h1 className="font-display text-4xl font-bold leading-none tracking-normal text-heading">
            <span
              className="font-normal italic text-heading"
              style={{ fontFamily: 'Georgia, Cambria, Times New Roman, serif' }}
            >
              {greeting}
            </span>{' '}
            <span
              className="font-normal italic text-accent"
              style={{ fontFamily: 'Georgia, Cambria, Times New Roman, serif' }}
            >
              {name}!
            </span>
          </h1>
          <p className="text-base leading-7 text-secondary">{subtitle}</p>
          <p className="text-sm font-semibold uppercase tracking-[0.12em] text-secondary">
            {date}
          </p>
        </div>
      )}
    </div>
  );
}
