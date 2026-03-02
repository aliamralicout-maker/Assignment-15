import axios from "axios";


export async function ApiApdatePost(ID, body) {

    const payLoad = {
        body,
        // image: '',
    }


    return await axios.request({
        method: 'PUT',
        url: `https://route-posts.routemisr.com/posts/${ID}`,
        headers: {
            Authorization: `Bearer ${localStorage.getItem('user_token')}`,
        },
        data: payLoad,
    })
}