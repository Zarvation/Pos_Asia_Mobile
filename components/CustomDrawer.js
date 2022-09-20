import React, { useContext } from 'react';
import { StyleSheet,View, Text,TouchableOpacity} from 'react-native';
import { DrawerItemList,DrawerContentScrollView } from '@react-navigation/drawer';
import Ionicons from 'react-native-vector-icons/Ionicons'
import { AuthContext } from './AuthContext';

const CustomDrawer=(props)=>{
    const {logout}=useContext(AuthContext);
    return(
        <View style={{flex:1}}>
            <DrawerContentScrollView {...props}>
                <View>
                <Text style={styles.title}>Toko Mas Asia</Text>
                </View>
                <DrawerItemList {...props}/>
                <View style={{padding:20}}>
                    <TouchableOpacity
                    onPress={()=>{logout()}}
                    >
                        <View style={{flexDirection:'row'}}>
                            <Ionicons  name='log-out-outline' size={20}/>
                            <Text style={{marginLeft:10,fontSize:14}}>Keluar</Text>    
                        </View>
                    </TouchableOpacity>
                </View>
            </DrawerContentScrollView>
        </View>
    )
}

const styles=StyleSheet.create({
    title:{
        alignSelf:'center',
        fontSize:25,
        fontWeight:'bold'
    }
})

export default CustomDrawer