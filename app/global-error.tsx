'use client';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen flex items-center justify-center bg-[#F2F4F8] text-[#181B25] p-6 text-center font-sans">
        <div className="space-y-4 max-w-md">
          <h1 className="text-3xl font-extrabold text-[#0D52FF]">Something went wrong!</h1>
          <p className="text-sm text-[#525866]">
            {error.message || 'An unexpected error occurred.'}
          </p>
          <button
            onClick={() => reset()}
            className="inline-block bg-[#0D52FF] text-white px-5 py-2.5 rounded-full font-bold text-sm hover:bg-[#0B44D8] transition-colors"
          >
            Try again
          </button>
        </div>
      </body>
    </html>
  );
}
