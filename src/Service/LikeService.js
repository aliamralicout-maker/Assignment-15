import axios from "axios";


export async function likePost(_id) {
    try {
        const res = await axios.request({
            method: 'PUT',
            url: `https://route-posts.routemisr.com/posts/${_id}/like`,
            headers: {
                Authorization: `Bearer ${localStorage.getItem('user_token')}`,
            },
        })

        return res.data;

    } catch (error) {
        console.log(error);

    }
}