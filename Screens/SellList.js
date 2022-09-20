import React,{useState,useEffect} from 'react';
import {StyleSheet, View, Text,TouchableOpacity,FlatList,ActivityIndicator} from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SellDetail from './SellDetail';
import client from '../api/client';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {RNNumberFormat} from '../components/NumberFormat'
import moment from 'moment';


function SellListScreen ({navigation}) {
    const [data, setData] = useState([]);
    const [date,setDate]=useState(null)

    const getData = async () => {
        try {
        let userToken = await AsyncStorage.getItem('userToken')
        const response = await client.get('/api/api-data-sell',{ 
            headers: {"Authorization" : `Bearer ${userToken}`} 
        })
        setData(response.data);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            let date = moment(new Date()).format('DD/MM/YYYY')
            setDate(date);
            getData()
          });
          return unsubscribe;
    }, [navigation]);

    const itemempty = ()=>(
        <View style={styles.listitem}>
            <Text>Belum ada Penjualan</Text>
        </View>
    )

    const navigateToDetail = (item) => {
        navigation.navigate('SellDetailScreen',{item})
    }
    const sellrender = ( {item} )=>(
        <TouchableOpacity onPress={()=>{navigateToDetail(item)}}>
            <View style={styles.listitem}>
                <Text>{item.kode_penjualan}</Text>
                <RNNumberFormat value={item.total_penjualan}/>
            </View>
        </TouchableOpacity>
    )
    return(
        <View style={styles.container}>
            <View style={styles.title}>
                <Text style={styles.titlefont}>TANGGAL</Text>
                <View style={styles.datebox}>
                    <Text style={{fontSize:18}}>{date}</Text>
                </View>
            </View>
            <View style={{marginTop:5}}>
                <View style={styles.title}>
                    <Text style={styles.titlefont}>KODE TRANSAKSI</Text>
                    <Text style={styles.titlefont}>JUMLAH</Text>
                </View>
                <View>
                <FlatList
                data={data}
                keyExtractor={({ kode_penjualan }, index) => kode_penjualan}
                renderItem={sellrender}
                ListEmptyComponent={itemempty} 
                />
                </View>
            </View>
        </View>
    )
}
const SellStack = createNativeStackNavigator();

function SellList (){
    return(
            <SellStack.Navigator>
                <SellStack.Screen name="sellListScreen" component={SellListScreen} options={{headerShown:false}}/>
                <SellStack.Screen name="SellDetailScreen" component={SellDetail} options={{title:'List Penjualan',headerStyle:{
                    backgroundColor:'#FFD700'
                }}}/>
            </SellStack.Navigator>
    )
}


const styles=StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFD700',
      },
    datebox:{
        borderWidth:1,
        padding:10,
        backgroundColor:'#fff'
    },
    title:{
        flexDirection:'row',
        justifyContent:'space-between',
        margin:20
    },
    titlefont:{
        fontSize:20,
        fontWeight:'bold',
        alignSelf:'center'
    },
    listitem:{
        flexDirection:'row',
        backgroundColor:'#fff',
        borderWidth:1,
        padding:20,
        margin:10,
        borderRadius:5,
        justifyContent:'space-between'
    }
})

export default SellList;