import axios from "axios";



export async function ApiProfilePhoto(file) {

    const data = new FormData();
    data.append('photo', file);

    return await axios.request({
        method: 'PUT',
        url: `https://route-posts.routemisr.com/users/upload-photo`,
        headers: {
            Authorization: `Bearer ${localStorage.getItem('user_token')}`,
        },
        data,
    })
}