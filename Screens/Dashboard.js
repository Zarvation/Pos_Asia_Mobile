import React,{useState,useEffect} from 'react';
import { StyleSheet, Text, View,ScrollView,ActivityIndicator } from 'react-native';
import client from '../api/client';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {RNNumberFormatCurrency} from '../components/NumberFormat'

function Dashboard ({navigation}){
    const [data, setData] = useState([])
    const [isLoading,setIsLoading]=useState(true)

    const getData = async () => {
        setIsLoading(true)
        try {
        let userToken = await AsyncStorage.getItem('userToken')
        const response = await client.get('/api/api-data-sell',{ 
            headers: {"Authorization" : `Bearer ${userToken}`} 
        })
        setData(response.data);
        } catch (error) {
            console.log(error);
        } finally{
            setIsLoading(false)
        }
    }

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            getData()
          });
          return unsubscribe;
    }, [navigation]);
    
    var sum=0;
    Object.values(data).forEach((x)=>sum+=Number(x.total_penjualan))
    
    var cincin=0
    var kalung=0
    var anting=0
    var gelang=0
    var mainan=0
    var kerabu=0
    Object.values(data).forEach((x) => {
        if (x['Barang.bentuk']=='Cincin'){
            cincin+=1
        }
        else if (x['Barang.bentuk']=='Kalung'){
            kalung+=1
        }
        else if (x['Barang.bentuk']=='Anting-Anting'){
            anting+=1
        }
        else if (x['Barang.bentuk']=='Gelang'){
            gelang+=1
        }
        else if (x['Barang.bentuk']=='Mainan'){
            mainan+=1
        }
        else if (x['Barang.bentuk']=='Kerabu'){
            kerabu+=1
        }
    })

    return(
        <View style={styles.container}>
        {(isLoading) ? 
            <ActivityIndicator size='large' /> :
            <ScrollView>
                <View>
                    <Text style={styles.title}>TRANSAKSI</Text>
                </View>
                <View style={styles.content}>
                    <RNNumberFormatCurrency value={sum} />
                    <Text style={styles.desc}>Total Transaksi Hari Ini</Text>
                </View>
                <View>
                    <Text style={styles.title}>BARANG YANG TERJUAL HARI INI</Text>
                </View>
                <View style={styles.content2}>
                    <Text style={styles.number}>{cincin}</Text>
                    <Text style={styles.desc}>Cincin</Text>
                </View>
                <View style={styles.content2}>
                    <Text style={styles.number}>{kalung}</Text>
                    <Text style={styles.desc}>Kalung</Text>
                </View>
                <View style={styles.content2}>
                    <Text style={styles.number}>{anting}</Text>
                    <Text style={styles.desc}>Anting - Anting</Text>
                </View>
                <View style={styles.content2}>
                    <Text style={styles.number}>{gelang}</Text>
                    <Text style={styles.desc}>Gelang</Text>
                </View>
                <View style={styles.content2}>
                    <Text style={styles.number}>{mainan}</Text>
                    <Text style={styles.desc}>Mainan</Text>
                </View>
                <View style={styles.content2}>
                    <Text style={styles.number}>{kerabu}</Text>
                    <Text style={styles.desc}>Kerabu</Text>
                </View>
            </ScrollView>
            }
        </View>
    )
}

const styles=StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFD700',
        padding: 20
      },
    title:{
        paddingVertical:10,
        fontWeight:'bold'
    },
    content:{
        padding:20,
        borderRadius:5,
        borderWidth:1,
        backgroundColor:'#fff',
    },
    desc:{
        fontSize:12,
        color:'#999'
    },
    number:{
        fontSize:18
    },
    content2:{
        paddingVertical:10,
        paddingHorizontal:20,
        borderRadius:5,
        borderWidth:1,
        backgroundColor:'#fff',
        marginBottom:10
    }
})

export default Dashboard;