import React,{useContext} from 'react';
import { View,ActivityIndicator } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import AuthNav from './AuthNav';
import Login from '../Screens/Login';
import { AuthContext } from '../components/AuthContext';

const AppNav = () => {
    const {isLoading,userToken} = useContext(AuthContext)

    if (isLoading){
        return(
            <View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
                <ActivityIndicator size={'large'} />
            </View>
        )
    }
    return (
        <NavigationContainer>
            {userToken != null ? 
            <AuthNav /> :
            <Login />}
        </NavigationContainer>
    )
  }

export default AppNav