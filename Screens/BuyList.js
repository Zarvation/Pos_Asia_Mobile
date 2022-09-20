import React,{useState,useEffect} from 'react';
import {StyleSheet, View, Text,TouchableOpacity,FlatList,ActivityIndicator} from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import BuyDetail from './BuyDetail';
import { RNNumberFormatBuyList } from '../components/NumberFormat';
import AsyncStorage from '@react-native-async-storage/async-storage';
import client from '../api/client';
import moment from 'moment';

function BuyListScreen ({navigation}) {
    const [data, setData] = useState([]);
    const [date,setDate]=useState(null)

    const getData = async () => {
        try {
        let userToken = await AsyncStorage.getItem('userToken')
        const response = await client.get('/api/api-data-buy',{ 
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
            <Text>Belum ada Pembelian</Text>
        </View>
    )

    const headercomponent=()=>(
        <View style={styles.title}>
            <Text style={[styles.itemheader, {flex:1.7}]}>KODE TRANSAKSI</Text>
            <Text style={[styles.itemheader, {flex:1.5,paddingLeft:5}]}>JUMLAH</Text>
            <Text style={[styles.itemheader, {flex:1}]}>ASAL TOKO</Text>
        </View>
    )
    const navigateToDetail = (item) => {
        navigation.navigate('BuyDetailScreen',{item})
    }

        
    const buyrender = ( {item} )=>(
        <TouchableOpacity onPress={()=>{navigateToDetail(item)}}>
            <View style={styles.listitem}>
                <Text style={{flex:1.7,alignSelf:'center'}}>{item.kode_pembelian}</Text>
                <RNNumberFormatBuyList value={item.total_pembelian} />
                <Text style={{flex:1,alignSelf:'center'}}>{item.nama_supplier}</Text>
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
                    <View>
                        <FlatList
                        data={data}
                        renderItem={buyrender}
                        ListEmptyComponent={itemempty}
                        keyExtractor={({ kode_pembelian }, index) => kode_pembelian}
                        ListHeaderComponent={headercomponent}
                        />
                    </View>
                </View> 
            </View>
        )
    }
const BuyStack = createNativeStackNavigator();

function BuyList (){
    return(
            <BuyStack.Navigator>
                <BuyStack.Screen name="buyListScreen" component={BuyListScreen} options={{headerShown:false}}/>
                <BuyStack.Screen name="BuyDetailScreen" component={BuyDetail} options={{title:'List Pembelian',headerStyle:{
                    backgroundColor:'#FFD700'
                }}}/>
            </BuyStack.Navigator>
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
        paddingHorizontal:10,
        paddingVertical:20,
        margin:10,
        borderRadius:5,
        justifyContent:'space-between',
    },
    itemheader:{
        fontSize:15,
        alignSelf:'center',
        fontWeight:'bold'
    }
})

export default BuyList;