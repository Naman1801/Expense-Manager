import { StyleSheet, Text, View,TouchableOpacity,Image,ScrollView} from 'react-native'
import React,{useState,useEffect} from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import {images} from '../assets/imageURL'
import { SelectList } from 'react-native-dropdown-select-list'


export default function ActivityScreen({navigation}) {
  const [expense,setExpense] = useState([])
  const [yearInfo, setYearInfo] = useState(2023);

  const data = [
    {key:2023, value:2023},
    {key:2022, value:2022},
    {key:2021, value:2021},
    {key:2020, value:2020},
    // {key:'4', value:'Computers', disabled:true},
   
]
  
  var months = ["January","February","March","April","May","June","July","August","September","October","November","December"]
  useEffect(()=>{
    getData()
  },[expense])

  const getData = async () => {
    try {
      const value = JSON.parse( await AsyncStorage.getItem('@expens_Key'))
      if(value !== null) {
        setExpense(value)
      }
      else{
        console.log("No item found");
      }
    } catch(e) {
      console.log("Getting error",e);
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
      console.log("Item Removed Successfully!");
  
        
      }
    } catch(e) {
      console.log("Removing error",e);

    }
  }

  const updateData = async (id,item) => {
    try {
      const value = JSON.parse( await AsyncStorage.getItem('@expens_Key'))
      if(value !== null) {
        value.map((i)=>{
          if(i.id == id){
            i.name=item
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
      
        <View style={styles.dropDownBox}>
      <SelectList 
        setSelected={(val) => setYearInfo(val)} 
        data={data} 
        save="value"
        searchPlaceholder='Search'
        placeholder='Select Year'
        boxStyles ={{marginVertical:"5%",borderColor:'black',backgroundColor:'white',padding:"1%"}}
        dropdownTextStyles ={{fontSize:18,fontWeight:'bold'}}
        dropdownItemStyles={{width:"92%"}}
        dropdownStyles={{bottom:"5%",borderColor:'black',backgroundColor:'white'}}
        inputStyles = {{width:"50%",fontSize:16,padding:"3%"}}

        defaultOption= {{key:2023,value:2023}}
    />
      </View>




      <ScrollView>
      {
        months.map((item,index)=>{
          return <TouchableOpacity onPress={()=>{
            console.log("yarinfo",yearInfo);
            navigation.navigate('Record',{month:index+1,year:yearInfo})
          }} key={index} >
          <View key={index} style={styles.box}>
            <Text style={styles.textStyle}>Transations of month {item} - {yearInfo}</Text>
          </View>
            </TouchableOpacity>
        })
      }
      </ScrollView>


    </View>
  )
}

const styles = StyleSheet.create({
  dropDownBox:{
    width:"95%",
    alignSelf:'center',
  },
  headingText:{
    fontSize:18,
    fontWeight:'bold',
    textAlign:'center'
  },
  container:{
    flex:1,
    width:"100%",
    // backgroundColor:'#F5F2CE',
    backgroundColor:'#ECE439',
    // backgroundColor:'#000002'
  },
  box:{
    width:"90%",
    backgroundColor:'#FFFF',
    paddingVertical:"6%",
    borderWidth:1,
    marginVertical:"2%",
    alignSelf:'center',
    borderColor:'#FFFF',
    borderRadius:10,
  },
  textStyle:{
    fontSize:20,
    fontWeight:'800',
    textAlign:'center',
    // fontFamily:'Poppins-Italic'
  }
})