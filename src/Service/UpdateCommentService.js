import axios from "axios";

export async function ApiUpdateComment(postId, commentId, content) {
    const formData = new FormData();
    formData.append('content', content);
    

    return await axios.request({
        method: 'PUT',
        url: `https://route-posts.routemisr.com/posts/${postId}/comments/${commentId}`,
        data: formData,
        headers: {
            Authorization: `Bearer ${localStorage.getItem('user_token')}`,
        },
    });
}