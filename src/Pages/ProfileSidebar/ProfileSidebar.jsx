import React, { useEffect, useState } from 'react'
import { MdOutlineFeed } from 'react-icons/md';
import { PiShootingStarDuotone } from 'react-icons/pi';
import { FaEarthAmericas } from 'react-icons/fa6';
import { CiBookmark } from 'react-icons/ci';

export default function ProfileSidebar({ navigate }) {

    const [btnAct, setBtnAct] = useState(1);
    const hoverCol = 'bg-slate-50 text-slate-700 hover:bg-slate-100'
    const actcol = 'bg-[#e7f3ff] text-[#1877f2]'

    useEffect(() => {
        navigate('MyPosts')
    }, []);

    return (
        <div>

            <div className="xl:fixed top-24 ">
                <nav className="bg-white rounded-2xl border-2 border-gray-200 p-4 max-w mt-5">
                    <div className="grid grid-cols-2 lg:grid-cols-1 gap-4">

                        <div className='space-y-2'>
                            <button onClick={() => { setBtnAct(1); navigate('MyPosts') }} className={` ${btnAct === 1 ? actcol : hoverCol} w-full  text-start rounded-xl px-3 py-2 text-sm font-bold transition`} >
                                <div className='flex items-center'> <MdOutlineFeed size={'1.5rem'} /> <span className='ms-2'>Feed</span> </div>
                            </button>

                            <button onClick={() => { setBtnAct(2); navigate('MyPosts') }} className={` ${btnAct === 2 ? actcol : hoverCol} w-full  text-start rounded-xl px-3 py-2 text-sm font-bold transition`}>
                                <div className='flex items-center'> <PiShootingStarDuotone size={'1.5rem'} /> <span className='ms-2'>My Posts</span>  </div>
                            </button>
                        </div>

                        <div className='space-y-2'>
                            <button onClick={() => { setBtnAct(3); navigate('GetPosts') }} className={` ${btnAct === 3 ? actcol : hoverCol} w-full  text-start rounded-xl px-3 py-2 text-sm font-bold transition`}>
                                <div className='flex items-center'> <FaEarthAmericas size={'1.4rem'} /> <span className='ms-2'>Community</span>  </div>
                            </button>

                            <button onClick={() => setBtnAct(4)} className={` ${btnAct === 4 ? actcol : hoverCol} w-full  text-start rounded-xl px-3 py-2 text-sm font-bold transition`}>
                                <div className='flex items-center'> <CiBookmark size={'1.5rem'} /> <span className='ms-2'>Saved</span>  </div>
                            </button>
                        </div>

                    </div>
                </nav>
            </div>


        </div>
    )
}
