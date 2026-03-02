import { useQuery } from "@tanstack/react-query";

import CommentCard from "../AddComment/CommentCard"; 
import { ApiAllComment } from "../../Service/AllCommentService";
import Loder from "../Loder/Loder";

export default function AllComment({ postId }) {
    const { data, isLoading } = useQuery({
        queryKey: ['All_Comments', postId],
        queryFn: () => ApiAllComment(postId)
    });


    

    if (isLoading) return <Loder/>;

    const comments = data?.data?.data?.comments || [];

    return (
        <div>
            {comments && comments.map(comment => (
                <CommentCard
                    key={comment._id}
                    comment={comment}
                    setAllCommentClick={() => { }} 
                />
            ))}
        </div>
    );
}