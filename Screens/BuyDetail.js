import React,{useState,useEffect} from 'react';
import {Text,View,StyleSheet} from 'react-native'
import client from '../api/client';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { RNNumberFormatBold } from '../components/NumberFormat';

const BuyDetail = ({route,navigation}) =>{
    const [data, setData] = useState([]);

    const getData = async (input_kode) => {
        try {
            let userToken = await AsyncStorage.getItem('userToken')
            var postData = {
                input_kode
            }
            let axiosConfig = { 
                headers: {"Authorization" : `Bearer ${userToken}`} 
            }
            const response = await client.post('/api/api-data-barang-search',postData,axiosConfig)
            setData(response.data);
            
        } catch (error) {
            console.log(error);
        }
    }
    const item=[route.params.item]
    const kodebarang = item[0].kode_barang
    
    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            getData(kodebarang)
        });
        return unsubscribe;
    }, [navigation]);
    

    return (
        <View style={styles.container}>
            <View style={styles.background}>
                <View style={styles.textview}>
                    <Text>KODE TRANSAKSI</Text>
                    <Text>{item[0].kode_pembelian}</Text>
                </View>
                <View style={styles.textview}>
                    <Text>TANGGAL</Text>
                    <Text>{item[0].tanggal_pembelian}</Text>
                </View>
                <View style={styles.textview}>
                    <Text>DARI</Text>
                    <Text>{item[0].nama_supplier}</Text>
                </View>
                <View style={styles.textview}>
                    <Text>KODE BARANG</Text>
                    <Text>{kodebarang}</Text>
                </View>
                <View style={styles.textview}>
                    <Text style={{alignSelf:'center'}}>NAMA BARANG</Text>
                    <Text style={{flex:1,textAlign:'right',paddingLeft:10}}>{data.nama_barang}</Text>
                </View>
                <View style={styles.textview}>
                    <Text>BAHAN</Text>
                    <Text>{data.bahan}</Text>
                </View>
                <View style={styles.textview}>
                    <Text>KADAR</Text>
                    <Text>{data.kadar}</Text>
                </View>
                <View style={styles.textview}>
                    <Text>BENTUK</Text>
                    <Text>{data.bentuk}</Text>
                </View>
                <View style={styles.textview}>
                    <Text>BERAT</Text>
                    <Text>{item[0].berat}g</Text>
                </View>
                <View style={styles.textview}>
                    <Text>TOTAL</Text>
                    <RNNumberFormatBold value={item[0].total_pembelian} />
                </View>
            </View>
        </View>
    )
}

const styles=StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFD700',
      },
      background:{
          flex: 1,
          borderWidth:1,
          margin:20,
          padding:20,
          backgroundColor:'#fff',
          borderRadius:5
      },
      textview:{
          flexDirection:'row',
          justifyContent:'space-between',
          marginBottom:10
      }
    })

export default BuyDetail;