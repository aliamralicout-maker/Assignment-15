
import React, { createContext, useState } from 'react'

export const usersDataContext = createContext()

export default function UsersDataContext({children}) {

    const [userProfileData,setUserProfileData] = useState([]);
    const [countPosts,setCountPosts] = useState(0);

    function savData(val){
        setUserProfileData(val)
    } 


    return (
        <usersDataContext.Provider value={{userProfileData,savData,setCountPosts,countPosts}}>
            {children}
        </usersDataContext.Provider>
    )
}
