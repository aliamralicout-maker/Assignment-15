import { useQuery } from '@tanstack/react-query'
import Loder from '../Loder/Loder'
import { useContext } from 'react'
import PostCard from '../GetAllPosts/PostCard'
import { myPostsApi } from '../../Service/PostsService'
import { useParams } from 'react-router-dom'
import { userProfile } from '../../Context/UserprofileContext'





export default function MyPosts() {

    const { userData } = useContext(userProfile);
    const { id: routeId } = useParams();

    const id = routeId || userData?._id;


    const { data, isLoading } = useQuery({
        queryKey: ['single_posts', id],
        queryFn: () => myPostsApi(id),
        enabled: !!id,
        // refetchOnWindowFocus: false,
        // refetchOnReconnect: false,
        // refetchOnMount: false,
    })



    const myData = data?.data.data?.posts;

    // counter posts
    const totalPosts = myData?.length || 0;


    if (isLoading) {
        return <Loder />;
    }


    if (!myData || myData.length === 0) {
        return <div className="space-y-4">
            <div className="rounded-2xl border border-slate-200 bg-white p-10 text-center text-slate-500 shadow-sm">
                No posts yet. Be the first one to publish.
            </div>
        </div>
    }


    return (
        <>
            {myData && myData.map((item, i) => <PostCard totalPosts={totalPosts} key={item._id} post={item} getId={item._id} />)}
        </>
    )
}
