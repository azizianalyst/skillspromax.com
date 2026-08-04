"use client";

export default function PortalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="card p-8 text-center">
      <h1 className="display-md">Something went wrong</h1>
      <p className="mt-3 text-sm text-muted">
        The student portal hit an error. You can try again, or sign out and sign back in.
      </p>
      {error.digest && (
        <p className="mt-2 text-xs text-faint">Reference: {error.digest}</p>
      )}
      <div className="mt-6 flex flex-wrap justify-center gap-3">
        <button type="button" onClick={reset} className="btn btn-primary">
          Try again
        </button>
        <a href="/login" className="btn btn-outline">
          Sign in again
        </a>
      </div>
    </div>
  );
}
