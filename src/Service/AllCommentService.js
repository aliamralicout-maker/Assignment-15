import axios from "axios";


export async function ApiAllComment(ID) {
    return await axios.request({
        method: 'GET',
        url: `https://route-posts.routemisr.com/posts/${ID}/comments`,
        headers: {
            Authorization: `Bearer ${localStorage.getItem('user_token')}`,
        },
        params: {
            page: 1,
            limit: 10,
            sort: '-createdAt'
        }
    })
}