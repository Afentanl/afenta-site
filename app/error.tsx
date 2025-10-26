// app/error.tsx
'use client';

import Link from 'next/link';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="container-afenta py-24">
      <h1 className="text-2xl font-bold">Something went wrong</h1>
      <p className="opacity-70 mt-2">{error.message}</p>

      <div className="mt-6 flex gap-3">
        <button onClick={() => reset()} className="btn-afenta-solid">
          Try again
        </button>
        <Link href="/" className="btn-afenta-outline">
          Go home
        </Link>
      </div>
    </div>
  );
}
