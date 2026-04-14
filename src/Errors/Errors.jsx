import React from 'react'
import { useNavigate } from 'react-router-dom'

export default function Errors({ err, touch, text }) {

    const navigation = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("user_token"); 
        navigation("/login");
    };

    return (
        <>
            {text ?

                <div className="bg-blue-50 border border-blue-200 p-4 rounded-md text-center">

                    <p className="text-red-700 font-medium text-sm mb-3">
                        {text}
                    </p>

                    <button
                        onClick={() => handleLogout()}
                        className="bg-blue-500 text-white text-xs px-4 py-1.5 rounded-md hover:bg-blue-600 transition"
                    >
                        "Sign in to continue"
                    </button>

                </div>


                : <>{err && touch && <p className="text-red-600 font-mono text-sm">{err.message}</p>}</>}
        </>
    )
}

