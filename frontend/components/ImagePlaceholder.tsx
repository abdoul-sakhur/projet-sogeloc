export default function ImagePlaceholder({ label = "Photo à venir" }: { label?: string }) {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-3 border-2 border-dashed border-border bg-surface-alt text-body">
      <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <rect x="3" y="4" width="18" height="16" rx="2" />
        <circle cx="8.5" cy="9.5" r="1.5" />
        <path d="M21 15l-5-5-9 9" />
      </svg>
      <span className="text-sm">{label}</span>
    </div>
  );
}
