
import axios from 'axios';
import PostCard from './PostCard'
import { api } from '../../API/API'
import Loder from '../Loder/Loder';
import { useQuery, useQueryClient } from '@tanstack/react-query';


export default function GetPosts() {
    const queryClient = useQueryClient();

    const { data, error, isError, isLoading, isFetching } = useQuery({
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
        return <p className="text-red-600 font-mono text-sm text-center">{error.message}</p>
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




