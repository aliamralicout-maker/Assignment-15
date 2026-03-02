// 


import { useMutation, useQueryClient } from "@tanstack/react-query";
import React from "react";
import { useForm } from "react-hook-form";
import { ApiApdatePost } from "../../Service/UpdatePostService";
import Errors from "../../Errors/Errors";


export default function CardUpdatePost({ postId, val, setUpdatePost }) {
    const queryClient = useQueryClient();

    const { register, handleSubmit, reset, formState: { errors, touchedFields, isSubmitting } } = useForm({
        defaultValues: { body: val },
        mode: 'onChange'
    });

    const { mutate, isPending } = useMutation({
        mutationKey: ['Update_Post', postId],
        mutationFn: ({ body }) => ApiApdatePost(postId, body),
        onSuccess: () => {
            queryClient.invalidateQueries(['posts']);
            setUpdatePost(false);
        },
        onError: (err) => console.error(err)
    });

    return (
        <div className="mt-3">
            <form onSubmit={handleSubmit(data => mutate(data))}>
                <textarea
                    maxLength={5000}
                    className="min-h-[110px] w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm outline-none ring-[#1877f2]/20 focus:border-[#1877f2] focus:ring-2"
                    {...register('body', {
                        required: "Post content is required",
                        minLength: { value: 3, message: "At least 3 characters" }
                    })}
                />
                <Errors err={errors.body} touch={touchedFields.body} />

                <div className="mt-2 flex items-center justify-end gap-2">
                    <button
                        type="button"
                        className="rounded-full border border-slate-300 bg-white px-3 py-1.5 text-xs font-bold text-slate-700 hover:bg-slate-100"
                        onClick={()=>setUpdatePost(false)}
                    >
                        Cancel
                    </button>

                    <button
                        type="submit"
                        className="rounded-full bg-[#1877f2] px-3 py-1.5 text-xs font-bold text-white hover:bg-[#166fe5] disabled:opacity-60"
                    >
                        {isPending ? "Saving..." : "Save"}
                    </button>
                </div>
            </form>
        </div>
    );
}