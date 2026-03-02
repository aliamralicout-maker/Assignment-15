import axios from "axios";





export async function ApiChangePAssword(data,token) {

    return await axios.request({
        method: 'PATCH',
        url: `https://route-posts.routemisr.com/users/change-password`,
        headers: {
            Authorization: `Bearer ${token}`
        },
        data,
    })
}