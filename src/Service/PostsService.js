import axios from "axios";




// Delete post
export function ApiDeletePost(_id) {

    return axios.request({
        method: 'DELETE',
        url: `https://route-posts.routemisr.com/posts/${_id}`,
        headers: {
            Authorization: `Bearer ${localStorage.getItem('user_token')}`
        }
    })
}


export function myPostsApi(id) {
    return axios.request({
        url: `https://route-posts.routemisr.com/users/${id}/posts`,
        method: 'GET',
        headers: {
            Authorization: `Bearer ${localStorage.getItem('user_token')}`,
        },
        params: {
            sort: '-createdAt',
        }
    })
}

