import React from 'react'

import img from '../../assets/Imge/signup-bg-DGRfriy9.png'
import { Link } from 'react-router-dom'


export default function NotFound() {
    return (
        <div>
            <section className='bg-black text-white flex justify-center align-center '>

                <div className="relative w-full h-screen">
                    <img
                        src={img}
                        alt="Background"
                        className="w-full h-full object-cover"
                    />

                    <div className="absolute inset-0 bg-blue-500 opacity-50"></div>

                    <div className=" space-y-5 absolute inset-0 flex flex-col items-center justify-center">
                        <div>
                            <h1 className='text-9xl text-black font-bold'>Not Found</h1>
                        </div>
                        <div className='text-black font-bold text-5xl'> Enter To <Link to={'/Login'}> <span className='text-red-700 text-4xl underline'>Back</span> </Link> </div>
                    </div>
                </div>

            </section>
        </div>
    )
}
