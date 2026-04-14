
import axios from 'axios';
import PostCard from './PostCard'
import { api } from '../../API/API'
import Loder from '../Loder/Loder';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import Errors from '../../Errors/Errors';


export default function GetPosts() {
    const queryClient = useQueryClient();

    const { data, error, isError, isLoading } = useQuery({
        queryKey: ['all_posts'],
        queryFn: getAllPosts,
         // refetchOnWindowFocus: false,
        // refetchOnReconnect: false,
        // refetchOnMount: false,
        onSuccess: () => {
            queryClient.invalidateQueries(['all_posts']);
        },
    })



    function getAllPosts() {
        return axios.request({
            url: api.URL_All_Posts,
            method: 'GET',
            headers: {
                Authorization: `Bearer ${localStorage.getItem('user_token')}`,
            },
            params: {
                sort: '-createdAt',
            }
        })
    }


    if (isError) {
        return <Errors text={"Your session has expired, please log in again to continue."} />
    }


    if (isLoading) {
        return <Loder />;
    }


    return (
        <>
            {
                data && data.data.data.posts.map((item) => <PostCard key={item._id} post={item} />)
            }
        </>
    )
}




