import client from "../api/client";
import React,{createContext,useEffect,useState} from 'react';
import AsyncStorage from "@react-native-async-storage/async-storage";

export const AuthContext = createContext();

export const AuthProvider = ({children}) => {
    const [isLoading,setIsLoading]=useState(false)
    const [userToken,setUserToken]=useState(null)
    const [userInfo,setUserInfo]=useState(null)

    const login = (input_login,input_password)=>{
        if (input_login.length <= 0) {
            alert('Username tidak boleh kosong.');
          } else if (input_password.length <= 0) {
            alert('Password tidak boleh kosong.');
          } else {
            setIsLoading(true);
            
            client.post('/api/api-get-token',{
                input_login,input_password
            })
            .then(res=>{
                let userInfo=res.data
                setUserInfo(userInfo)
                setUserToken(userInfo.token)
                if (userInfo.token!=null){
                    AsyncStorage.setItem('userToken',userInfo.token)
                }
                else{
                    alert(userInfo.message)
                }
                console.log (userInfo)
            })
            .catch (error => {
                console.log(error)
            })
            setIsLoading(false)
            }
    }

    const logout = ()=>{
        setIsLoading(true)
        setUserToken(null);
        AsyncStorage.removeItem('userToken')
        setIsLoading(false)
    }

    const isLoggedIn = async () =>{
        try {
            setIsLoading(true)
            let userToken = await AsyncStorage.getItem('userToken')
            setUserToken(userToken)
            setIsLoading(false)
        } catch (error) {
            console.log(`isLogged in error ${error}`);
        }
    }

    useEffect(() => {
        isLoggedIn()
    },[])

    return(
        <AuthContext.Provider value={{
            login,
            logout,
            isLoading,
            userToken,
            }}>
            {children}
        </AuthContext.Provider>
    )
}