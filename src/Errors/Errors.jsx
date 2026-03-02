import React from 'react'

export default function Errors({err,touch}) {
    return (
        <>
            {err && touch && <p className="text-red-600 font-mono text-sm">{err.message}</p>}
        </>
    )
}

