import axios from "axios";



export async function ApiDelteComment(postId,commentId){
    return await axios.request({
        method:'DELETE',
        url:`https://route-posts.routemisr.com/posts/${postId}/comments/${commentId}`,
        headers:{
            Authorization: `Bearer ${localStorage.getItem('user_token')}`,
        }
    })
}