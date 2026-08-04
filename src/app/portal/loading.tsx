export default function PortalLoading() {
  return (
    <div className="space-y-6 animate-pulse" aria-busy="true" aria-label="Loading">
      <div className="h-8 w-48 rounded bg-sand" />
      <div className="h-4 w-72 rounded bg-sand" />
      <div className="card h-40 bg-sand/60" />
      <div className="card h-56 bg-sand/60" />
    </div>
  );
}
