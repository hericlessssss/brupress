export function BrandHeader() {
  return (
    <div>
      <div className="flex items-center gap-3">
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
      <div className="mt-3 h-px w-full bg-line/25" />
    </div>
  );
}
