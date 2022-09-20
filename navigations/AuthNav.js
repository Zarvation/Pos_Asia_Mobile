import React from 'react';
import { getFocusedRouteNameFromRoute, NavigationContainer } from '@react-navigation/native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import CustomDrawer from '../components/CustomDrawer'
import SellList from '../Screens/SellList';
import BuyList from '../Screens/BuyList';
import ItemList from '../Screens/ItemList';
import Dashboard from '../Screens/Dashboard';
import Ionicons from 'react-native-vector-icons/Ionicons'
import { color } from 'react-native-reanimated';

const AuthNavigator=createDrawerNavigator()

const AuthNav = () => {
    return (
        <AuthNavigator.Navigator 
            drawerContent={props=> <CustomDrawer {...props}/> }
            screenOptions={{drawerStyle:{
                width:'60%',
                },drawerLabelStyle:{
                marginLeft:-20
                },drawerActiveBackgroundColor:'#FFD700',drawerActiveTintColor:'#000',headerStyle:{
                backgroundColor:'#FFD700'
                }
            }}
            useLegacyImplementation='true'  
        >
            <AuthNavigator.Screen name='Dashboard' 
                component={Dashboard} 
                options={{drawerIcon: ()=>(
                    <Ionicons name='analytics-outline' size={20} color={color} />
                )
                }}
            />
          <AuthNavigator.Screen name='SellList' 
            component={SellList} 
            options={({ route }) => ({
                headerShown: ((route) => {
                    const routeName = getFocusedRouteNameFromRoute(route) ?? ""
                    if (routeName === "SellDetailScreen") {
                        return false
                    }
                    return true
                })(route),title: 'List Penjualan',
                drawerIcon: ()=>( 
                <Ionicons name='list-outline' size={20} color={color}/>)
                })}
            />
          <AuthNavigator.Screen name='BuyList' 
            component={BuyList} 
            options={({ route }) => ({
                headerShown: ((route) => {
                    const routeName = getFocusedRouteNameFromRoute(route) ?? ""
                    if (routeName === "BuyDetailScreen") {
                        return false
                    }
                    return true
                })(route),title: 'List Pembelian',
                drawerIcon: ()=>( 
                <Ionicons name='list-outline' size={20} color={color}/>)
                })}
            />
            <AuthNavigator.Screen name='ItemList' 
            component={ItemList} 
            options={{title:'List Barang',
            drawerIcon: ()=>(
                <Ionicons name='list-outline' size={20} color={color} />
                )}}
            />
        </AuthNavigator.Navigator>
    )
}

export default AuthNav;