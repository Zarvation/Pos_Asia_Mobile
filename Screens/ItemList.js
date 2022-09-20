import AsyncStorage from '@react-native-async-storage/async-storage';
import React,{useState,useEffect} from 'react';
import {StyleSheet, View, Text,FlatList,TextInput} from 'react-native';
import client from '../api/client';
import sortjsonarray from 'sort-json-array';

function ItemList ({navigation}) {
    const [data, setData] = useState([])
    const [fullData,setFullData]=useState([])
    const [searchCode,setSearchCode]=useState('')

    const getData = async () => {
        try {
        let userToken = await AsyncStorage.getItem('userToken')
        const response = await client.get('/api/api-data-barang-all',{ 
            headers: {"Authorization" : `Bearer ${userToken}`} 
        })
        let unsortedData=response.data
        let sortedData = sortjsonarray(unsortedData,'kode_barang')
        setData(sortedData);
        setFullData(sortedData)
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            getData()
          });
          return unsubscribe;
    }, [navigation]);

    const searchFilter = (text)=>{
        if (text){
            const newData=fullData.filter((item) => {
                const itemData = item.nama_barang ? 
                                item.nama_barang.toUpperCase()  
                                : ''.toUpperCase()
                const textData = text.toUpperCase()
                return itemData.indexOf(textData) > -1
            })
            setData (newData)
            setSearchCode(text)
        }
        else {
            setData(fullData)
            setSearchCode(text)
        }
    }
    
    const itemempty = ()=>(
        <View style={styles.listitemwhite}>
            <Text>Tidak ada Barang</Text>
        </View>
    )
    
    const itemrender = ( {item} )=>{
        return(
            <View style= {item.kuantitas_rak+item.kuantitas_sisa === 0 ? styles.listitemred : styles.listitemwhite}>
                <Text style={{flex:3,alignSelf:'center'}}>{item.kode_barang}</Text>
                <Text style={{flex:8,alignSelf:'center'}}>{item.nama_barang}</Text>
                <Text style={{flex:2,alignSelf:'center'}}>{item.kuantitas_rak}</Text>
                <Text style={{flex:2,alignSelf:'center'}}>{item.kuantitas_sisa}</Text>
                <Text style={{flex:3,alignSelf:'center'}}>{item.kuantitas_rak+item.kuantitas_sisa}</Text>
            </View>
        )
        }
    
    const headercomponent=()=>(
        <View style={styles.title}>
            <Text style={[styles.itemheader, {flex:3}]}>KODE</Text>
            <Text style={[styles.itemheader, {flex:8}]}>NAMA BARANG</Text>
            <Text style={[styles.itemheader, {flex:2}]}>RAK</Text>
            <Text style={[styles.itemheader, {flex:2}]}>SISA</Text>
            <Text style={[styles.itemheader, {flex:3}]}>TOTAL</Text>
        </View>
    )

    return(
        <View style={styles.container}>
            <View style={styles.title}>
                <Text style={styles.titlefont}>SEARCH</Text>
                    <View style={styles.datebox}>
                        <TextInput style={{fontSize:16,alignSelf:'center'}} 
                        placeholder="Nama Barang"
                        value={searchCode}
                        onChangeText={(text)=>{
                            searchFilter(text)
                        }}
                        />
                </View>
            </View>
            <View style={{marginTop:5,marginBottom:100}}>
                <View>
                    <FlatList
                    data={data}
                    renderItem={itemrender}
                    ListEmptyComponent={itemempty}
                    keyExtractor={({ kode_barang }, index) => kode_barang}
                    ListHeaderComponent={headercomponent}
                    />
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
    datebox:{
        borderWidth:1,
        padding:10,
        backgroundColor:'#fff',
        width:150
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
    listitemwhite:{
        flexDirection:'row',
        backgroundColor:'#fff',
        borderWidth:1,
        paddingVertical:20,
        paddingHorizontal:10,
        margin:10,
        borderRadius:5,
        justifyContent:'space-between'
    },
    listitemred:{
        flexDirection:'row',
        backgroundColor:'#ff7b63',
        borderWidth:1,
        paddingVertical:20,
        paddingHorizontal:10,
        margin:10,
        borderRadius:5,
        justifyContent:'space-between'
    },
    searchbox:{
        borderWidth:1,
        padding:10,
        backgroundColor:'#59F522',
        marginLeft:10
    },
    itemheader:{
        fontSize:14,
        alignSelf:'center',
        fontWeight:'bold'
    }
})

export default ItemList;