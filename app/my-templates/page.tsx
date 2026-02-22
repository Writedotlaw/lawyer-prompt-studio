export default function MyTemplatesPage() {
  return (
    <div className="space-y-6">
      <div className="rounded-3xl border border-base-200/10 bg-base-900/60 p-8">
        <p className="text-xs uppercase tracking-[0.3em] text-base-300">Saved Prompts</p>
        <h1 className="mt-3 text-3xl text-base-50">Coming soon with user accounts</h1>
        <p className="mt-3 text-sm text-base-200/90">
          Saved prompts are temporarily disabled because this app is currently shared and does not yet have user authentication.
          We will re-enable personal saved prompts once accounts are added.
        </p>
      </div>
    </div>
  );
}
