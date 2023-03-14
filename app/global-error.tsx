'use client';

export default function GlobalError({error, reset}: {
    error: Error,
    reset: () => void
}) {
    return (
    <html lang='en'>
      <head>
        
      </head>
      <body>
        <h2>Something went wrong!</h2>
        <button type='button' onClick={() => reset()}>Try again</button>
      </body>
    </html>
    )
}