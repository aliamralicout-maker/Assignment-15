import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { FiImage, FiSmile, FiSend } from "react-icons/fi";
import Errors from "../../Errors/Errors";
import { ApiAddComment } from "../../Service/CommentService";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { userProfile } from "../../Context/UserprofileContext";
export default function AddComment({ postId }) {

    const { userData } = useContext(userProfile);
    const queryClient = useQueryClient();

    const [showTopComment, setShowTopComment] = useState(true);

    const { mutate, isPending } = useMutation({
        mutationKey: ['comment',postId ],
        mutationFn: createComment,
        onSuccess: () => {
            queryClient.invalidateQueries(['comments', postId]); setShowTopComment(false);
        }
    })


    const { handleSubmit, register, formState: { errors, touchedFields } } = useForm({
        defaultValues: { content: '', image: '' },
        mode: 'onSubmit'
    })

    async function createComment(data) {
        const payLoad = {
            content: data.content,
            // image: '',
        }
        const x = await ApiAddComment(postId, payLoad);
    }

    return (
        ( showTopComment && <div className="mt-3 px-6 py-4">
            <div className="flex items-start gap-2">
                <img
                    alt={userData.photo}
                    className="h-9 w-9 rounded-full object-cover"
                    src={userData?.photo}
                />

                <form onSubmit={handleSubmit(mutate)} className=" w-full rounded-2xl border border-slate-200 bg-[#f0f2f5] px-2.5 py-1.5 focus-within:border-[#c7dafc] focus-within:bg-white">
                    <textarea
                        {...register("content", {
                            required: { value: true, message: "Comment Is Required" },
                            maxLength: { value: 200, message: "Max 200 char" },
                            minLength: { value: 3, message: "min 3 char" }
                        })}
                        placeholder={`Comment as user? ${userData.name}`}
                        className="max-h-[140px] min-h-[40px] w-full resize-none bg-transparent px-2 py-1.5 text-sm leading-5 outline-none placeholder:text-slate-500"
                    />
                    {errors.content && <Errors err={errors.content} touch={touchedFields.content} />}

                    <div className="mt-1 flex items-center justify-between">
                        <div className="flex items-center gap-1">
                            <label className="inline-flex cursor-pointer items-center justify-center rounded-full p-2 text-slate-500 transition hover:bg-slate-200 hover:text-emerald-600">
                                <FiImage size={16} />
                                <input
                                    accept="image/*"
                                    className="hidden"
                                    type="file"
                                />
                            </label>

                            <button
                                type="button"
                                className="inline-flex items-center justify-center rounded-full p-2 text-slate-500 transition hover:bg-slate-200 hover:text-amber-500"
                            >
                                <FiSmile size={16} />
                            </button>
                        </div>
                        <button
                            className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-[#1877f2] text-white shadow-sm transition hover:bg-[#166fe5] disabled:cursor-not-allowed disabled:bg-[#9ec5ff] disabled:opacity-100"
                            disabled={isPending}
                        > <FiSend size={16} />
                        </button>
                    </div>
                </form>
            </div>
        </div>)
    );
}
