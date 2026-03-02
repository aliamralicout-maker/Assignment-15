import React, { useState } from 'react'
import GetPosts from '../GetAllPosts/GetPosts';
import { HiOutlineSearch, HiOutlineUsers } from 'react-icons/hi';
import { AiOutlineUserAdd } from 'react-icons/ai';
import AddPost from '../AddPost/AddPost';
import ProfileSidebar from '../ProfileSidebar/ProfileSidebar';
import MyPosts from '../MyPosts/MyPosts';



export default function Feed() {


    const [navigate, setNavigate] = useState(null);





    return (
        <>
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 mt-20">
                <div className='grid grid-cols-1 lg:grid-cols-12 gap-6 '>
                    {/* ==================================================================================================== */}
                    {/* col 1 */}
                    <div className=' lg:block lg:col-span-3'>
                    <ProfileSidebar  navigate={setNavigate}/>
                    </div>
                    {/* ==================================================================================================== */}
                    {/* col 2 */}
                    <div className='lg:col-span-6 space-y-5'>
                        <AddPost />
                        {navigate === 'MyPosts' && <MyPosts />}
                        { navigate === 'GetPosts' && <GetPosts />}
                    </div>
                    {/* ==================================================================================================== */}
                    {/* col 3 */}
                    <div className='hidden lg:block lg:col-span-3'>
                        <div className='sticky top-24 space-y-5'>
                            
                            {/* div 4 */}
                            <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
                                {/* Header */}
                                <div className="mb-3 flex items-center justify-between gap-2">
                                    <div className="flex items-center gap-2">
                                        <HiOutlineUsers />
                                        <h3 className="text-base font-extrabold text-slate-900">Suggested Friends</h3>
                                    </div>
                                    <span className="rounded-full bg-slate-100 px-2 py-0.5 text-xs font-bold text-slate-600">5</span>
                                </div>

                                {/* Search */}
                                <div className="mb-3">
                                    <label className="relative block">
                                        <HiOutlineSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                                        <input
                                            placeholder="Search friends..."
                                            className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2 pl-9 pr-3 text-sm text-slate-700 outline-none focus:border-[#1877f2] focus:bg-white"
                                            // value=""
                                        />
                                    </label>
                                </div>

                                {/* Friend List */}
                                <div className="space-y-3">
                                    
                                    {[
                                        {
                                            name: "Ahmed Bahnasy",
                                            username: "@bahnasy20222",
                                            img: "https://pub-3cba56bacf9f4965bbb0989e07dada12.r2.dev/linkedPosts/1771018057253-2285ec56-8e3c-4ea3-9ee4-c235037ffffe-Screenshot-2026-02-13-at-11.27.15---PM.png"
                                        },
                                        {
                                            name: "Ahmed Abd Al-Muti",
                                            username: "@ahmedmutti",
                                            img: "https://pub-3cba56bacf9f4965bbb0989e07dada12.r2.dev/linkedPosts/1771038591307-b70f2a83-d052-400d-a8ea-5c601b51e262-WhatsApp-Image-2026-01-21-at-05.00.10.jpeg"
                                        },
                                        {
                                            name: "Ahmed Bahnasy",
                                            username: "@bahnasy20222w2",
                                            img: "https://pub-3cba56bacf9f4965bbb0989e07dada12.r2.dev/linkedPosts/default-profile.png"
                                        },
                                        {
                                            name: "Nourhan",
                                            username: "@nourhan",
                                            img: "https://pub-3cba56bacf9f4965bbb0989e07dada12.r2.dev/linkedPosts/1771068100123-c9bbeba4-0e5f-4246-811e-add6e4890e40-DSC07722.webp"
                                        },
                                        {
                                            name: "Ahmed Abd Al-Muti",
                                            username: "@ahmedmut3ti",
                                            img: "https://pub-3cba56bacf9f4965bbb0989e07dada12.r2.dev/linkedPosts/1771071361223-3cf47f81-53bb-47d2-baae-783be7cc51e1-IMG-20251121-WA0041.webp"
                                        }
                                    ].map((friend, idx) => (
                                        <div key={idx} className="rounded-xl border border-slate-200 p-2.5">
                                            <div className="flex items-center justify-between gap-2">
                                                <button className="flex min-w-0 items-center gap-2 rounded-lg px-1 py-1 text-left transition hover:bg-slate-50">
                                                    <img
                                                        alt={friend.name}
                                                        className="h-10 w-10 rounded-full object-cover"
                                                        src={friend.img}
                                                    />
                                                    <div className="min-w-0">
                                                        <p className="truncate text-sm font-bold text-slate-900 hover:underline">{friend.name}</p>
                                                        <p className="truncate text-xs text-slate-500">{friend.username}</p>
                                                    </div>
                                                </button>
                                                <button className="inline-flex items-center gap-1 rounded-full px-3 py-1.5 text-xs font-bold transition disabled:opacity-60 bg-[#e7f3ff] text-[#1877f2] hover:bg-[#d8ebff]">
                                                    <AiOutlineUserAdd />
                                                    Follow
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                {/* View More */}
                                <button className="mt-3 inline-flex w-full items-center justify-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm font-bold text-slate-700 transition hover:bg-slate-100">
                                    View more
                                </button>
                            </div>
                        </div>
                    </div>
                    {/* ==================================================================================================== */}
                    
                </div>
            </div>

        </>
    );
}

