import React, { createContext, useContext, useState } from 'react'


export const userProfile = createContext();

export default function UserprofileContextProvider({children}) {

    const [userData,setUserData] = useState(()=>localStorage.getItem('user_data') ? JSON.parse(localStorage.getItem('user_data')) : null);

    function saveUserData(userD){
        setUserData(userD);
        localStorage.setItem('user_data', JSON.stringify(userD));
    }

        function removeUserData(){
        setUserData(null);
        localStorage.removeItem('user_data');
    }

    

    return (
        <userProfile.Provider value={{userData, saveUserData, removeUserData}} >
            {children}
        </userProfile.Provider>
    )
}
