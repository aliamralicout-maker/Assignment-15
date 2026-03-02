import { BiLike } from 'react-icons/bi'
import { CiShare2 } from 'react-icons/ci'
import { FaRegComment, FaShare } from 'react-icons/fa'
import { MdOutlinePublic } from 'react-icons/md'
import CommentCard from '../AddComment/CommentCard'
import { useContext, useEffect, useState } from 'react'
import { ApiDeletePost } from '../../Service/PostsService'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import DeletePostModal from '../../DeletePostModal/DeletePostModal'
import { userProfile } from '../../Context/UserprofileContext'
import DropdownDelete from '../../DropdownDelete/DropdownDelete'
import AddComment from '../AddComment/AddComment'
import AllComment from '../AddComment/AllComment'
import CardUpdatePost from '../CardUpdatePost/CardUpdatePost'
import { Link } from 'react-router-dom'
import { usersDataContext } from '../../Context/UsersDataContext'



export default function PostCard({ post, totalPosts }) {

    const queryClient = useQueryClient();
    const {setCountPosts, savData} = useContext(usersDataContext);



    const user = post.user;
    const { userData } = useContext(userProfile);
    const [allCommentClick, setAllCommentClick] = useState(false);
    const [showCardComment, setShowCardComment] = useState(false);
    const [updatePost, setUpdatePost] = useState(false);


    const [modalOpen, setModalOpen] = useState(false);




    // delete Post
    const { mutate } = useMutation({
        mutationFn: () => ApiDeletePost(post._id),
        onError: (error) => { console.log(error) },
        onSuccess: () => {
            queryClient.invalidateQueries(['posts']);
        },
    })

    const isoDate = post.createdAt;
    const dateObj = new Date(isoDate);


    const formattedDate = dateObj.toLocaleDateString('en-GB')

    useEffect(() => {
        if (post.user) {
            savData(post.user);
        }
    }, [post.user]);

    useEffect(()=>{
        setCountPosts(totalPosts);
    })

    return (
        <>
            <article className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
                <div className="p-4">
                    <div className="flex items-center gap-3">
                        <a className="shrink-0" href="#/profile" >
                            <img
                                alt={user.name}
                                className="h-11 w-11 rounded-full object-cover"
                                src={user.photo}
                            />
                        </a>
                        <div className="min-w-0 flex-1">
                            <Link to={`Profile/${user._id}`}>
                                <a
                                    className="truncate text-sm font-bold text-foreground hover:underline" href="#/profile">
                                    {user.name}
                                </a>
                            </Link>
                            <div className="flex flex-wrap items-center gap-1 text-xs text-muted-foreground">
                                {user.username}
                                <button
                                    type="button"
                                    className="rounded px-0.5 py-0.5 text-xs font-semibold text-slate-500 transition hover:bg-slate-100 hover:text-slate-700 hover:underline"
                                >
                                    {formattedDate}
                                </button>
                                <span className="mx-1">·</span>
                                <span className="relative inline-flex items-center">
                                    <button className="inline-flex items-center gap-1 rounded-md px-1 py-0.5 hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-60">
                                        <span><MdOutlinePublic /></span>
                                        {post.privacy}
                                    </button>
                                </span>
                            </div>
                        </div>
                        {/* Dropdown Delete */}
                        {userData?._id == post.user._id && (<DropdownDelete setUpdatePost={setUpdatePost} setModalOpen={setModalOpen} />)}
                    </div>

                    {/* text post */}
                    {post?.body && <div className="mt-3">
                        <p className="whitespace-pre-wrap text-sm leading-relaxed text-foreground">

                            {!updatePost ? post.body : <CardUpdatePost postId={post.id} val={post.body} setUpdatePost={setUpdatePost} />}

                        </p>
                    </div>}

                    {/* img post */}
                    {post?.image && <img
                        alt={post.image}
                        className="w-full h-100 overflow-hidden pt-3 object-cover"
                        src={post.image}
                    />}
                </div>

                {/* ----------------------------------------------------------------------------- */}
                <div className="px-4 pb-2 pt-3 text-sm text-slate-500">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                        <div className="flex items-center gap-2">
                            <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-[#1877f2] text-white">
                                <BiLike />
                            </span>
                            <button className="font-semibold transition cursor-pointer hover:text-[#1877f2] hover:underline">
                                1 likes
                            </button>
                        </div>

                        <div className="flex flex-wrap items-center gap-2 text-xs sm:gap-3 sm:text-sm">
                            <span className="inline-flex items-center gap-1">
                                <FaShare />
                                0 shares
                            </span>
                            <span>0 comments</span>
                            <button className="rounded-md px-2 py-1 text-xs font-bold text-[#1877f2] hover:bg-[#e7f3ff]">
                                View details
                            </button>
                        </div>
                    </div>
                </div>

                {/* border top */}
                <div className="mx-4 border-t border-slate-200"></div>

                {/* ----------------------------------------------------------------------------- */}
                <div className="grid grid-cols-3 gap-1 p-1">
                    {/* Like Button */}
                    <button className="cursor-pointer flex items-center justify-center gap-1.5 rounded-md p-2 text-xs font-semibold transition-colors disabled:cursor-not-allowed disabled:opacity-50 sm:gap-2 sm:text-sm text-slate-600 hover:bg-slate-100">
                        <BiLike size={'20px'} />
                        <span>Like</span>
                    </button>

                    {/* Comment Button */}
                    <button onClick={() => setShowCardComment(!showCardComment)} className="cursor-pointer flex items-center justify-center gap-1.5 rounded-md p-2 text-xs font-semibold transition-colors disabled:cursor-not-allowed disabled:opacity-50 sm:gap-2 sm:text-sm text-slate-600 hover:bg-slate-100">
                        <FaRegComment size={'20px'} />
                        <span>Comment</span>
                    </button>

                    {/* Share Button */}
                    <button className="cursor-pointer flex items-center justify-center gap-1.5 rounded-md p-2 text-xs font-semibold transition-colors disabled:cursor-not-allowed disabled:opacity-50 sm:gap-2 sm:text-sm text-slate-600 hover:bg-slate-100">
                        <CiShare2 size={'20px'} />
                        <span>Share</span>
                    </button>
                </div>

                {/* comment */}
                {post?.id && showCardComment && <AddComment postId={post.id} />}
                {!allCommentClick ? (
                    <CommentCard
                        comment={post.topComment}
                        setAllCommentClick={setAllCommentClick}
                        commentCount={post.commentsCount}
                    />
                ) : (
                    <AllComment postId={post.id} />
                )}
                {/* {AllComment ? (<AllComment postId={post.id} />) : (firtsComment && <CommentCard setAllCommentClick={setAllCommentClick} comment={firtsComment} />)} */}
                <DeletePostModal open={modalOpen} setModalOpen={setModalOpen} mutate={mutate} />
            </article>
        </>
    )
}

