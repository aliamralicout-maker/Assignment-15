import { useState,createContext, useEffect } from 'react'

export const TokenContext = createContext();



export default function TokenContextProvider({children}) {

    const [userToken, setUserToken] = useState(localStorage.getItem('user_token'));

    
    function saveUserToken(token){
        setUserToken(token);
        localStorage.setItem('user_token',token)
    }
    console.log(userToken);
    

    function removeUserToken(){
        setUserToken(null);
        localStorage.removeItem('user_token');
    }
    console.log(userToken);
    
    
    return (
        <TokenContext.Provider value={{userToken,saveUserToken,removeUserToken}} >
            {children}
        </TokenContext.Provider>
    )
}
