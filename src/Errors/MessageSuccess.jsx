import React from 'react'

export default function MessageSuccess({successMess}) {
    return (
        <div>
            {successMess && <p className="bg-green-50 border text-center border-green-200 rounded-2xl text-green-800 w-full py-2 ps-10">{successMess}</p>}
        </div>
    )
}
