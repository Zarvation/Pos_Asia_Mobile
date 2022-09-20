import React,{useState, useContext} from 'react';
import {View, TextInput, StyleSheet,TouchableOpacity,Text,Alert,Image} from 'react-native';
import { AuthContext } from '../components/AuthContext';

function Login (){
    const [userInfo,setUserInfo]=useState({
      usernamevalue:'',
      passwordvalue:''
    })
    const {usernamevalue,passwordvalue}=userInfo;
    
    const handleOnChangeText = (value,fieldname) =>{
      setUserInfo({...userInfo, [fieldname]:value })
    }
    const {login}= useContext(AuthContext);

    return(
        <View style={styles.container}>
          <View>
            <Text style={styles.loginText}>
              Selamat Datang di Point of Sales Toko Mas Asia
            </Text>
          </View>
          <View style={styles.inputView}>
            <TextInput
              style={styles.TextInput}
              placeholder="Username"
              placeholderTextColor="#999"
              value={usernamevalue}
              onChangeText={value => handleOnChangeText(value,'usernamevalue')}
              />
          </View>
          <View style ={styles.inputView}>
            <TextInput
            style={styles.TextInput}
            placeholder="Password"
            placeholderTextColor="#999"
            secureTextEntry={true}
            value={passwordvalue}
            onChangeText={value => handleOnChangeText(value,'passwordvalue')}
            />
          </View>
          <TouchableOpacity style={styles.loginBtn}
          onPress = {() => 
            {login(userInfo.usernamevalue,userInfo.passwordvalue)
            }}
          >
            <Text style={styles.loginBtnText}>Masuk</Text>
          </TouchableOpacity>
        </View>
     );
};


const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#FFD700',
      alignItems: 'center',
      justifyContent: 'center',
    },
  
    logo :{
      marginBottom:40,
    },
    loginText:{
      marginBottom:50,
      marginHorizontal:40,
      textAlign:'center',
      fontWeight:'bold',
      fontSize:20,
      fontFamily:'Roboto'
    },
    inputView: {
      backgroundColor:"#fff",
      borderRadius:5,
      width:"70%",
      height:45,
      marginBottom:20,
      alignItems:'stretch',
      borderWidth:1,
      borderColor:'#000'
    },
    TextInput:{
      height:50,
      flex:1,
      padding:10,
      marginLeft:5,
    },
    loginBtn:{
      width:'70%',
      borderRadius:5,
      height:45,
      alignItems:'center',
      justifyContent:'center',
      backgroundColor:'#51FB58',
      borderWidth:1,
      borderColor:"000",
    }
  });
  
  export default Login;