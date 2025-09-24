'use client';

export default function GlobalError({
  error: _error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html>
      <body>
        <div style={{ padding: '20px', textAlign: 'center' }}>
          <h2>Qualcosa è andato storto!</h2>
          <button onClick={() => reset()}>Riprova</button>
        </div>
      </body>
    </html>
  );
}