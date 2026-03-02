import React, { useState } from 'react'
import { CiBookmark, CiTrash } from 'react-icons/ci';
import { PiPencilSimpleDuotone } from 'react-icons/pi';
import { TbDots } from 'react-icons/tb';

export default function DropdownDelete({setUpdatePost,setModalOpen}) {

    const [showDropdown, setShowDropdown] = useState(true);

    return (
        <div>
            <div className="relative">
                <button onClick={() => setShowDropdown(!showDropdown)} className="rounded-full p-1.5 text-slate-500 hover:bg-slate-100 hover:text-slate-700">
                    <span><TbDots /></span>
                    <div className={` ${showDropdown ? 'hidden' : ' '}  absolute right-0 z-20 mt-2 w-44 overflow-hidden rounded-xl border border-slate-200 bg-white py-1 shadow-lg`}>

                        {/* Save Post */}
                        <button className="flex w-full items-center gap-2 px-3 py-2 text-left text-sm font-semibold text-slate-700 hover:bg-slate-50">
                            <CiBookmark size={15} />
                            Save post
                        </button>

                        {/* Edit Post */}
                        <button onClick={()=> setUpdatePost(true)} className="flex w-full items-center gap-2 px-3 py-2 text-left text-sm font-semibold text-slate-700 hover:bg-slate-50">
                            <PiPencilSimpleDuotone size={15} />
                            Edit post
                        </button>

                        {/* Delete Post  */}
                        <button onClick={() => { setModalOpen(true) }} className="flex w-full items-center gap-2 px-3 py-2 text-left text-sm font-semibold text-rose-600 hover:bg-rose-50">
                            <CiTrash size={15} />
                            Delete post
                        </button>

                    </div>
                </button>
            </div>
        </div>
    )
}
