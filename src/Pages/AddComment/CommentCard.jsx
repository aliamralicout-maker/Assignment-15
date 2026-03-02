

import { useMutation, useQueryClient } from "@tanstack/react-query";
import React, { useContext, useState } from "react";
import { FiMoreHorizontal } from "react-icons/fi";
import { ApiDelteComment } from "../../Service/DeleteCommentService";
import { ApiUpdateComment } from "../../Service/UpdateCommentService";
import { FaPen } from "react-icons/fa6";
import { userProfile } from "../../Context/UserprofileContext";

export default function CommentCard({ commentCount, comment, setAllCommentClick }) {

    const queryClient = useQueryClient();
    const {userData} = useContext(userProfile)

    if (!comment) return null;
    const com = comment?.commentCreator;

    const authorId = comment?.commentCreator._id;
    const userId = userData._id
    const checkId = authorId === userId ? true : false;

    const postId = comment?.post;
    const commentId = comment?._id;

    const [menuOpen, setMenuOpen] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [editContent, setEditContent] = useState(comment.content);

    // Delete mutation
    const deleteMutation = useMutation({
        mutationFn: () => ApiDelteComment(postId, commentId),
        onSuccess: () => queryClient.invalidateQueries(['comments', postId])
    });

    // Update mutation
    const updateMutation = useMutation({
        mutationFn: (newContent) => ApiUpdateComment(postId, commentId, newContent),
        onSuccess: () => {
            queryClient.invalidateQueries(['comments', postId]);
            setIsEditing(false);
        }
    });

    return (
        <div className="mx-4 mb-4 rounded-2xl border border-slate-200 bg-gray-200 p-3">
            <p className="mb-2 text-[11px] font-bold uppercase tracking-wide text-slate-500">
                Top Comment
            </p>

            <div className="flex items-start gap-2 relative">
                <img
                    alt={com.name}
                    className="h-8 w-8 rounded-full object-cover"
                    src={com.photo}
                />

                <div className="min-w-0 flex-1 rounded-2xl bg-white px-3 py-2">
                    <div className="flex items-center justify-between">
                        <p className="truncate text-xs font-bold text-slate-900">{com.name}</p>

                        {/* Dropdown */}
                        <div className="relative">
                            <button
                                onClick={() => setMenuOpen(!menuOpen)}
                                className="rounded-full p-1 text-slate-500 transition hover:bg-slate-100 hover:text-slate-700"
                            >
                                <FiMoreHorizontal size={16} />
                            </button>

                            {menuOpen && (
                                <div className="absolute right-0 z-20 mt-1 w-32 overflow-hidden rounded-lg border border-slate-200 bg-white py-1 shadow-lg">
                                    {/* Edit Button */}
                                    
                                        { checkId &&  <button
                                            onClick={() => {
                                                setIsEditing(true);
                                                setMenuOpen(false);
                                            }}
                                            className="flex w-full items-center gap-2 px-3 py-1.5 text-left text-xs font-semibold text-slate-700 hover:bg-slate-50"
                                        >
                                            <FaPen />
                                            <span>Edit</span>
                                        </button>}

                                    
                                    {/* Delete Button */}
                                    <button
                                        onClick={() => {
                                            deleteMutation.mutate();
                                            // setMenuOpen(false); 
                                        }}
                                        className="flex w-full items-center gap-2 px-3 py-1.5 text-left text-xs font-semibold size-3 ms-5 text-rose-600 hover:bg-rose-50 "
                                    >
                                        {deleteMutation.isPending ? 'Deleting...' : 'Delete'}
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>

                    {!isEditing ? (
                        <p className="mt-0.5 whitespace-pre-wrap text-sm text-slate-700">
                            {comment.content}
                        </p>
                    ) : (
                        <div className="mt-2 flex flex-col gap-2">
                            <input
                                className="w-full rounded-full border border-slate-300 bg-white px-3 py-1.5 text-sm"
                                value={editContent}
                                onChange={(e) => setEditContent(e.target.value)}
                            />
                            <div className="flex gap-2">
                                <button
                                    onClick={() => updateMutation.mutate(editContent)}
                                    className="rounded-full bg-[#1877f2] px-3 py-1.5 text-xs font-bold text-white hover:bg-[#166fe5]"
                                >
                                    {updateMutation.isPending ? "Saving..." : "Save"}
                                </button>
                                <button
                                    onClick={() => { setIsEditing(false); setEditContent(comment.content); }}
                                    className="rounded-full border border-slate-300 bg-white px-3 py-1.5 text-xs font-bold text-slate-700 hover:bg-slate-100"
                                >
                                    Cancel
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {commentCount > 1 && (
                <button
                    onClick={() => setAllCommentClick(true)}
                    className="mt-2 text-xs font-bold text-[#1877f2] hover:underline"
                >
                    View all comments
                </button>
            )}
        </div>
    );
}