'use client';

export default function ErrorPage({error, reset}: {
    error: Error,
    reset: () => void
}) {
    return (
        <p>Error</p>
    )
}