import React, { useContext, useEffect } from 'react'
import { useState } from "react";
import { AiTwotoneCamera, AiTwotoneSmile } from "react-icons/ai";
import { FaEarthAmericas } from 'react-icons/fa6';
import { IoCloseSharp, IoPaperPlaneOutline } from 'react-icons/io5';
import { RiGitRepositoryPrivateFill } from 'react-icons/ri';
import { TbUsers } from 'react-icons/tb';
import { userProfile } from '../../Context/UserprofileContext';
import { api } from '../../API/API'
import axios from 'axios';
import MyPosts from '../MyPosts/MyPosts'
import { useMutation, useQueryClient } from '@tanstack/react-query';





export default function AddPost() {

    const [closeImg, setClosrImg] = useState(true);
    const [text, setText] = useState("");
    const [privacy, setPrivacy] = useState("public");
    const [postImage, setPostImage] = useState(null);

    const { userData } = useContext(userProfile);

    const queryClient = useQueryClient();

    function restData() {
        setText('');
        setClosrImg(true);
    }

    function getImage(e) {
        console.log(e.target.files[0]);
        setPostImage(e.target.files[0]);
    }

    const { mutate } = useMutation({
        mutationFn: addPostApi,
        onSuccess: () => {
            queryClient.invalidateQueries(['posts']); setShowTopComment(false);
        }
    })

    function addPostApi() {

        const formData = new FormData();
        formData.append('body', text);
        postImage && formData.append('image', postImage);


        return axios.request({
            method: 'POST',
            url: api.URL_All_Posts,
            data: formData,
            headers: {
                Authorization: `Bearer ${localStorage.getItem('user_token')}`,
            }
        })
    }

    useEffect(() => {
        return () => {
            if (postImage) URL.revokeObjectURL(postImage);
        };
    }, [postImage]);



    return (
        <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
            <div className="mb-3 flex items-start gap-3">
                <img
                    alt={userData?.name}
                    className="h-11 w-11 rounded-full object-cover"
                    src={userData?.photo}
                />

                <div className="flex-1">
                    <p className="text-base font-extrabold text-slate-900">
                        {userData?.name}
                    </p>

                    <div className="mt-1 inline-flex items-center gap-2 rounded-full bg-slate-100 px-2 py-0.5 text-xs font-semibold text-slate-700">
                        <span> {privacy == 'public' ? <FaEarthAmericas /> : privacy === 'following' ? <TbUsers /> : privacy === 'only_me' ? <RiGitRepositoryPrivateFill /> : null} </span>
                        <select className="bg-transparent outline-none"
                            value={privacy}
                            onChange={(e) => setPrivacy(e.target.value)}
                        >
                            <option value="public">Public</option>
                            <option value="following">Followers</option>
                            <option value="only_me">Only me</option>
                        </select>
                    </div>
                </div>
            </div>


            {/* img container */}
            <div className="relative">
                <textarea
                    rows={4}
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    placeholder={`What's on your mind, ${userData?.name}?`}
                    className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-[17px] leading-relaxed text-slate-800 outline-none transition focus:border-[#1877f2] focus:bg-white"
                />
            </div>
            <div className={`relative mt-2 ${closeImg ? 'hidden' : ' '} `}>
                <img
                    alt="Preview"
                    className="max-h-60 w-full rounded-lg object-cover"
                    src={postImage && URL.createObjectURL(postImage)}
                />
                <button className="absolute right-2 top-2 rounded-full bg-black/60 p-1 text-white backdrop-blur-sm">
                    <IoCloseSharp onClick={() => setClosrImg(true)} size={'1.5rem'} />
                </button>
            </div>

            {/* image Data */}
            <div className="mt-3 flex flex-wrap items-center justify-between gap-2 border-t pt-3">
                <div className="relative flex items-center gap-2">
                    <label htmlFor='img' className="flex cursor-pointer items-center gap-2 rounded-lg px-3 py-2 text-sm font-semibold text-slate-600 transition hover:bg-slate-100">
                        <span><AiTwotoneCamera /></span>
                        <span className="hidden sm:inline">Photo/video</span>
                        <input onChange={(e) => { getImage(e); setClosrImg(false) }} id='img' accept="image/*" className="hidden" type="file" />
                    </label>

                    <button
                        type="button"
                        className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-semibold text-slate-600 transition hover:bg-slate-100"
                    >
                        <span> <AiTwotoneSmile className='text-yellow-300' /> </span>
                        <span className="hidden sm:inline">Feeling/activity</span>
                    </button>
                </div>

                <div className="flex items-center gap-3">
                    <button
                        onClick={() => { mutate(); restData() }}
                        disabled={!text.trim()}
                        className=" flex items-center gap-2 rounded-lg bg-[#1877f2] px-5 py-2 text-sm font-extrabold text-white shadow-sm transition-colors hover:bg-[#166fe5] disabled:opacity-60"
                    >
                        Post <span><IoPaperPlaneOutline /></span>
                    </button>
                </div>
            </div>
            {/* ------------------------------------------------------------------------------------------- */}


        </div>
    );
}

