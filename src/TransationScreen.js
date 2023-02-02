import { StyleSheet, Text, View,ScrollView,TouchableOpacity,Image,RefreshControl } from 'react-native'
import React,{useState,useEffect,useCallback} from 'react'
import { useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {images} from './assets/imageURL'
import ModalComponent from './Components/ModalComponent';
import Toast from 'react-native-toast-message';
import AppLoader from './Components/AppLoader';
import CardLoader from './Components/CardLoader';


export default function TransationScreen() {
  const [expense,setExpense] = useState([])
  const[desc,setDesc ] = useState('')
  const[amount,setAmount ] = useState("")
  const [text,setText] = useState(null)
  const [modalVisible, setModalVisible] = useState(false);
  const [itemId,setItemId] = useState(null)
  const [loading,setLoading] = useState(false)
  const [refreshing, setRefreshing] = useState(false);

  useFocusEffect(
    React.useCallback(() => {
        setLoading(true)
        setExpense([])
        setTimeout(() => {
          setLoading(false)
          getData()
        }, 1000);
    }, [])
  );

  // useEffect(()=>{
  // getData()
    
  // },[expense])

  const onRefresh = () => {
    setRefreshing(true);
    setLoading(true)
    setTimeout(() => {
      setRefreshing(false);
      getData()
    }, 2000);
  }

  const getData = async () => {
    try {
      const value = JSON.parse( await AsyncStorage.getItem('@expens_Key'))
      if(value !== null) {
        setExpense(value)
        setLoading(false)

      }
      else{
        console.log("No item found");
      }
    } catch(e) {
      console.log("Getting error",e);
    }
  }

  const EditData = async (id,item) => {

    try {
      const value = JSON.parse( await AsyncStorage.getItem('@expens_Key'))
      if(value !== null) {
        value.map((i)=>{
          if(i.id == id){
            setDesc(i.Description)
            setAmount(i.Amount)
            setText(i.Date)
          }
        })
        AsyncStorage.setItem('@expens_Key', JSON.stringify(value))
        getData()        
      }
    } catch(e) {
      console.log("Updating error",e);
    }
  }

  const removeData = async (id) => {
    let mydata;
    try {
      const value = JSON.parse( await AsyncStorage.getItem('@expens_Key'))
      if(value !== null) {
        mydata = value.filter((i)=>{
            if(i.id == id ){
            }
            else{
              return i;
            }
        })
        AsyncStorage.setItem('@expens_Key', JSON.stringify(mydata))
        getData()
        Toast.show({
          type: 'success',
          text1: 'Record deleted successfully !',
          position:'bottom',
          visibilityTime:2000
        });
      console.log("Item Removed Successfully!");

        
      }
    } catch(e) {
      console.log("Removing error",e);

    }
  }

  const updateItem = async () => {

    try {
      const value = JSON.parse( await AsyncStorage.getItem('@expens_Key'))
      if(value !== null) {
        value.map((i)=>{
          if(i.id == itemId){
            i.Description = desc
            i.Amount = amount
            i.Date = text
          }
        })
        AsyncStorage.setItem('@expens_Key', JSON.stringify(value))
      }
    } catch(e) {
      console.log("Updating error",e);
    }
  }

  return (
    <View style={styles.container}>
      {
        loading && <AppLoader/>
      }

        <View>
            <Text>Your recent transations</Text>
        </View>
    
       <View style={{marginVertical:"5%"}}>
 
      {
        modalVisible && <ModalComponent stateChange={() => {
          setTimeout(() => {
          getData()
            
          }, 1000);
          setModalVisible(false)
        }} visibility = {modalVisible} Description={desc} Amount={amount} Date={text} itemId={itemId} Loader={true} />
      }

<ScrollView  refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        } >
          {
            expense.map((item,index)=>{

              return <View key={index} style={[styles.box,styles.boxWithShadow]}>
                <View style={[styles.innerBox,{width:"28%",}]}>
                <Text style={styles.textStyle}>{item.Description}</Text>
                  </View>
                <View style={[styles.innerBox,{width:"20%",}]}>
                <Text style={styles.textStyle} >{item.Amount}</Text>
                  </View>
                <View style={[styles.innerBox,{width:"30%",}]}>
                <Text style={styles.textStyle}>{item.Date}</Text>
                  </View>
                
                <TouchableOpacity style={{width:"8%"}} onPress={()=>{
                    EditData(item.id,item)
                    setItemId(item.id)
                    setModalVisible(true)
                }}  >
        
              <Image source={images.Edit} style={{ width: 22 ,height:22 }} tintColor="#F59E4E" />
              </TouchableOpacity >
                <TouchableOpacity style={{width:"8%"}} onPress={()=>{
                 
                    removeData(item.id)
                }} >
              <Image source={images.Delete} style={{ width: 22 ,height:22 }} tintColor="#F59E4E" />
              </TouchableOpacity>
              </View>
            })
          }
          </ScrollView>
          <Toast position='bottom' />
        </View>
    </View>
  )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        width:"100%",
        backgroundColor:'#ECE439',
      },
      box:{
        width:"95%",
        flexDirection:'row',
        justifyContent:'space-around',
        paddingVertical:"3%",
        marginVertical:"2%",
        alignSelf:'center',
        backgroundColor:'#FFF',
        alignItems:'center',
        borderRadius: 10,
        borderColor:'#FFFF',
        shadowColor: "red",
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
      },
})