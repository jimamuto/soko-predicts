export default function EmptyState() {
  return (
    <div className="flex flex-col items-center mt-20 opacity-70">
      <svg width="80" height="80" viewBox="0 0 24 24" className="mb-4">
        <path fill="currentColor"
          d="M12 2C8.134 2 5 5.134 5 9c0 4.5 5.5 11 7 13 1.5-2 7-8.5 7-13c0-3.866-3.134-7-7-7m0 9.5A2.5 2.5 0 1 1 14.5 9A2.5 2.5 0 0 1 12 11.5" />
      </svg>

      <h2 className="text-xl font-bold">No Predictions Yet</h2>
      <p className="text-center max-w-xs">
        Generate your first agriculture market forecast to get started.
      </p>
    </div>
  );
}
