export default function WriteLawMark() {
  return (
    <div className="flex items-center gap-3">
      <div className="relative flex h-11 w-11 items-center justify-center rounded-xl border border-accent-300/40 bg-gradient-to-br from-accent-300/25 to-teal-400/15 shadow-glow">
        <svg viewBox="0 0 48 48" className="h-7 w-7" aria-hidden="true">
          <path d="M8 10h6l5 20 5-14h6l5 14 5-20h6L38 38h-6l-5-14-5 14h-6L8 10Z" fill="currentColor" className="text-accent-100"/>
        </svg>
      </div>
      <div>
        <p className="font-display text-lg leading-none text-base-50">write.law</p>
        <p className="mt-1 text-[11px] uppercase tracking-[0.22em] text-base-300">Prompt Library Studio</p>
      </div>
    </div>
  );
}
