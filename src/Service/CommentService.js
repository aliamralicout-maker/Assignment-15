import axios from "axios";




// Delete post
export function ApiAddComment(_id, data) {

    return axios.request({
        method: 'POST',
        url: `https://route-posts.routemisr.com/posts/${_id}/comments`,
        headers: {
            Authorization: `Bearer ${localStorage.getItem('user_token')}`
        },
        data,
        params: {
            sort: '-createdAt',
        }

    })
}