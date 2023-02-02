// Track your expenses: Keep track of all your expenses, including small ones
// Review your expenses regularly
// easy to navigate and use, with a user-friendly interface

import { StyleSheet, Text, View,TextInput,TouchableOpacity,Image,SafeAreaView,Keyboard,Modal, Dimensions, ScrollView,KeyboardAvoidingView} from 'react-native'
import React,{useState,useEffect} from 'react'
import {images} from '../assets/imageURL'
import AsyncStorage from '@react-native-async-storage/async-storage';
// import DatePicker from 'react-native-neat-date-picker'
// import DatePicker from 'react-native-modern-datepicker';
import DatePicker from 'react-native-date-picker'
import CardComponent from '../Components/CardComponent';
import ModalComponent from '../Components/ModalComponent';
import Toast from 'react-native-toast-message';
import AppLoader from '../Components/AppLoader';


export default function HomeScreen() {
  useEffect(()=>{
    getData()
  },[expense])
  // const [date,setDate] = useState(new Date())
  // const [mode,setMode] = useState('date')
  // const [show,setShow] = useState(false)
  const [date, setDate] = useState(new Date())
  const [open, setOpen] = useState(false)

  const[desc,setDesc ] = useState('')
  const[amount,setAmount ] = useState(0)
  const [text,setText] = useState(null)
  const [itemId,setItemId] = useState(null)
  const [expense,setExpense] = useState([])
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const[dateVisible,setDateVisible] = useState(false)
  const [month,setMonth] = useState(null)
  const [year,setYear] = useState(null)
  const [loading,setLoading] = useState(false)


  const handleModal = ()=>{
    return <View>
      {
    modalVisible && <ModalComponent visibility = {modalVisible} />
      }
    </View>
  }
  

  const onChange = (selectedDate)=>{
    const currentDate = selectedDate || date;
    setDate(currentDate);
    setMonth(currentDate.getMonth()+1)
    setYear(currentDate.getFullYear())
    let tempDate = new Date(currentDate);
    console.log("tempDate",tempDate);

    let fDate = tempDate.getDate()+'/'+(tempDate.getMonth()+1)+'/'+tempDate.getFullYear()
    console.log("final date",fDate);
    setText(fDate)
    setDateVisible(false)
    setSelectedDate(null)
    // setShow(false)
  }

  
// console.log("expense",expense);
  const handleSubmit = ()=>{
    setModalVisible(false)

     if(itemId != null){
        updateItem()
     }
     else{
      const expense = {
        id:Math.floor((Math.random() * 100) + 1),
        Description:desc,
        Amount:amount,
        Date:text,
        Year:year,
        Month:month
      }
      storeData(expense)
     }
    setDesc(null)
    setAmount(null)
    setText(null)
    setItemId(null)

  }


  const storeData = async (value) => {
    try {
       const data = JSON.parse(await AsyncStorage.getItem('@expens_Key'));
       if(data==null){
       AsyncStorage.setItem('@expens_Key', JSON.stringify([value]))
       }
       else{
       AsyncStorage.setItem('@expens_Key', JSON.stringify([...data, value]))
       }
      //  AsyncStorage.removeItem('@expens_Key')
      console.log("Data saved successfully!")

    } catch (e) {
      console.log(" Storing error",e);
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
    getData()
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
      }
    } catch(e) {
      console.log("Updating error",e);
    }
  }

 
 
  return (
    <View style={styles.container}  >
       {
        loading && <AppLoader/>
      }
     {/* <View style={{position:'absolute',elevation:10,right:0,top:"10%",}}>
     <Image source={images.Mob3} style={{ width:170,height:200 }}  />
     </View> */}

         {/* <View style={{position:'absolute',elevation:10,right:0,bottom:"30%",}}>
     <Image source={images.Girl} style={{ width:170,height:200 }}  />
     </View> */}



      {/* <View style={{position:'absolute',elevation:10,right:0,bottom:"30%",}}>
     <Image source={images.Girl} style={{ width:170,height:200 }}  />
     </View> */}

<ScrollView 
        style={styles.scrollView} 
        contentContainerStyle={styles.contentContainer}
        
      >

        <CardComponent title="Managing expenses           has never been easier" URL ={images.Double} />
        <CardComponent title="No more hassle to manage expenses" URL ={images.Girl}/>
        <CardComponent title="Full control in your hand" URL ={images.Man} />
        <CardComponent title="Review your expenses regularly" URL ={images.Mob2}  />
        <CardComponent title="Easy to navigate and use, with a user-friendly interface" URL ={images.Women}/>
        <CardComponent title="Keep track of all your expenses,including small ones" URL ={images.Mob3} />


        {/* <View style={[styles.innerContainer,styles.boxWithShadow]} >
        <View style={{width:"80%",alignSelf:'center',}}>
        <Text style={{fontSize:24,color:'black',}}>Managing expenses has never been easier</Text>
     
          </View>
          <View style={{right:"20%",top:"3%",width:"20%"}}>
     <Image source={images.Double} style={{ width:160,height:145 }}  />
     </View>
        </View> */}


        {/* <View style={[styles.innerContainer,styles.boxWithShadow]} >
        <View style={{width:"80%",height:"40%",alignSelf:'center'}}>
        <Text style={{fontSize:24,color:'black',}}>No more hassle to manage expenses</Text>
          </View>
          <View style={{right:"25%",bottom:"5%",width:"20%"}}>
     <Image source={images.Girl} style={{ width:170,height:200 }}  />
     </View>
        </View> */}


        
        {/* <View style={[styles.innerContainer,styles.boxWithShadow]} >
        <View style={{width:"80%",alignSelf:'center'}}>
          <Text style={{fontSize:24,color:'black',}}>Full control in your hand</Text> 
          </View>
          <View style={{right:"25%",top:"3%",width:"20%"}}>
     <Image source={images.Mob2} style={{ width:170,height:200 }}  />
     </View>
        </View> */}


        {/* <View style={[styles.innerContainer,styles.boxWithShadow]} >
        <View style={{width:"80%",alignSelf:'center'}}>
          <Text style={{fontSize:24,color:'black',}}>Review your expenses regularly</Text> 
          </View>
          <View style={{right:"60%",top:"3%",width:"20%"}}>
     <Image source={images.Man} style={{ width:170,height:200 }}  />
     </View>
        </View> */}


        {/* <View style={[styles.innerContainer,styles.boxWithShadow]} >
        <View style={{width:"80%",alignSelf:'center'}}>
          <Text style={{fontSize:24,color:'black',}}>
            Easy to navigate and use, with a user-friendly interface</Text> 
          </View>
          <View style={{right:"25%",top:"3%",width:"20%"}}>
     <Image source={images.Women} style={{ width:170,height:200 }}  />
     </View>
        </View> */}

        {/* <View style={[styles.innerContainer,styles.boxWithShadow]} >
        <View style={{width:"80%",alignSelf:'center'}}>
          <Text style={{fontSize:24,color:'black',}}>
            Keep track of all your expenses,including small ones</Text> 
          </View>
          <View style={{right:"22%",top:"3%",width:"20%"}}>
     <Image source={images.Mob3} style={{ width:170,height:200 }}  />
     </View>
        </View> */}

       
     
        
      </ScrollView>


      
      {/* <View style={{padding:"25%",width:"100%",backgroundColor:'white',marginVertical:'2.5%',borderRadius:10,alignSelf:'center'}}>
        <Text style={{fontSize:24,color:'black',}}>Managing expenses has never been easier</Text>
        </View> */}

      {/* <View style={{width:"90%",backgroundColor:'white',height:"36%",marginVertical:'2%',marginHorizontal:"5%",borderRadius:10,}}>
        <View style={{width:"70%",padding:"2.5%",top:"20%"}}>
        <Text style={{fontSize:24,color:'black',}}>Managing expenses has never been easier</Text>
        </View>
      </View> */}










      


  

      {/* <View style={{width:"90%",backgroundColor:'white',height:"36%",marginVertical:'2%',marginHorizontal:"5%",borderRadius:10,}}>
        <View style={{width:"70%",padding:"2.5%",top:"20%"}}>
        <Text style={{fontSize:24,color:'black',}}>No more hassle to manage expenses</Text>
        </View>
      </View> */}


      {/* <View style={{position:'absolute',elevation:10,right:0,bottom:"30%",}}>
     <Image source={images.Girl} style={{ width:170,height:200 }}  />
     </View> */}

      {/* <View style={{width:"90%",backgroundColor:'white',height:"36%",marginVertical:'2%',marginHorizontal:"5%",borderRadius:10,}}>
        <View style={{width:"70%",padding:"2.5%",top:"20%"}}>
        <Text style={{fontSize:24,color:'black',}}>No more hassle to manage expenses</Text>
        </View>
      </View> */}
      
      

        
       

      
      {/* <View style={styles.heading}>
        
      <Text style={styles.headingText}>Managing Finances has never been easier</Text>
      </View> */}

      {/* <View style={styles.subHeading}>
      <Text style={styles.headingText}>Your recent transations</Text>
      </View> */}

      
      {
        modalVisible && <ModalComponent stateChange={() => setModalVisible(false)} visibility = {modalVisible} />
      }
     
      
      <TouchableOpacity onPress={()=>{
        setModalVisible(true)
        
        // handleModal()
        // setModalVisible(false)
      }
      
      } 
      
        style={styles.create}>
        <Image source={images.Create} style={{ width:28,height:28 }}   />
        <Text style={styles.expense}>Add Expenses</Text>
        </TouchableOpacity>


        {/* <View style={{height:"75%",marginVertical:"5%"}}>

      <ScrollView >
      {
        expense.map((item,index)=>{
          return <View key={index} style={styles.box}>
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
              } } >
    
          <Image source={images.Edit} style={{ width: 22 ,height:22 }} tintColor="#F59E4E" />
          </TouchableOpacity >
            <TouchableOpacity style={{width:"8%"}} onPress={()=>removeData(item.id)}>
          <Image source={images.Delete} style={{ width: 22 ,height:22 }} tintColor="#F59E4E" />
          </TouchableOpacity>
          </View>
        })
      }
      </ScrollView> 
        </View> */}
           <Toast position='bottom'/>


      <View>

        <View>
             <DatePicker
        modal
        open={open}
        date={date}
        mode="date"
        onConfirm={(d) => {
          setOpen(false)
          setDate(d)
          onChange(d)
        }}
        onCancel={() => {
          setOpen(false)
        }}
      />
        </View>

      {/* <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalVisible(!modalVisible);
        }}
        
      >
        <TouchableOpacity onPress={()=>{
          setModalVisible(false);
        }} style={styles.modalContainer}>
          <View style={styles.innerModal}>

          <View>
      <Text style={styles.heading}>Write your expnse here!</Text>
      </View>

      <View style={styles.inputContainer}>
        <View style={{width:"90%",alignItems:'flex-start'}}>
        <TextInput value={desc}   placeholder="Description..."  onChangeText={(value)=>setDesc(value)} style={styles.input} />
        </View>
        <View style={{width:"10%",alignItems:'flex-end'}}>  
        <Image source={images.Description} style={{ width:32,height:32 }} tintColor="#ECE439" />
        </View>
      </View>

      <View style={styles.inputContainer}>
        <View style={{width:"80%",alignItems:'flex-start'}}>
        <TextInput value={amount} placeholder="Amount" keyboardType='number-pad' onChangeText={(value)=>{
          setAmount(value) 
          }} style={styles.input} />
        </View>
        <View style={{width:"20%",alignItems:'flex-end'}}>
        <Image source={images.Price} style={{ width: 32 ,height:32 }} tintColor="#ECE439" />
        </View>
      </View>

      <View style={styles.thirdView}>
          <Text style={styles.dateText}>{text}</Text>

      <TouchableOpacity onPress={()=>setOpen(true)}>
          <Image source={images.Date} style={{ width: 35 ,height:35 }} tintColor="#ECE439" />
          </TouchableOpacity>
      </View> 
      
      <TouchableOpacity style={styles.btnContainer}onPress={()=>{
        Keyboard.dismiss()
        handleSubmit()
        }}>
        <Text style={styles.heading}>Submit</Text>
      </TouchableOpacity>

          </View>
        </TouchableOpacity>
        </Modal> */}
      
      </View>
        {/* <TouchableOpacity style={styles.filter}>
        <Image source={images.Filter} style={{ width:35,height:35}} />
        </TouchableOpacity> */} 
      
      {/* <AppLoader/> */}

    </View>
  )
}

const styles = StyleSheet.create({
  boxWithShadow: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.8,
    shadowRadius: 2,  
    elevation: 5
},
  innerContainer:{
    width:"100%",
    backgroundColor:'white',
    marginVertical:'2.5%',
    borderRadius:10,
    flexDirection:'row',
    padding:"5%"
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  scrollView: {
    // height: '20%',
    flex:1,
    width: '100%',
    margin: "2%",
    alignSelf: 'center',
    padding: "3%",
    // backgroundColor: 'red',
  },
  contentContainer: {
    // justifyContent: 'center',
    // alignItems: 'center',
    // backgroundColor: 'blue',
    paddingBottom: 50,
  },

  innerModal:{
    width:"90%",
    height:"60%",
    // backgroundColor:'#F59E4E',
    // backgroundColor:'#87C159',
    backgroundColor:'#BD9083',

    // backgroundColor:'#214E40',

    justifyContent: "center",
    alignItems: "center",
    borderRadius:8
  },
  innerBox:{
    alignItems:'center'
  },
  textStyle:{
    fontSize:18,
    fontWeight:'800',
    color:'#5171F9'
  },
  modalContainer:{
    flex:1,
    justifyContent: "center",
    alignItems: "center",
  },
  expense:{
    fontSize:16,
    fontWeight:'800',
    color:'#FFFF'
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
  create:{
    // backgroundColor:'#5171F9',
    backgroundColor:'#F8AE3D',
    // backgroundColor:'#F2F9EE',
    position: 'absolute',
    bottom:"2%",
    right:"6%",
    flexDirection:'row',
    width:"42%",
    padding:"4%",
    borderRadius:10,
    justifyContent:'space-between',
    alignItems:'center',
    elevation:15
  },
  thirdView:{
    width:"80%",
    marginVertical:"2%",
    padding:"1%",
    flexDirection:'row',
    justifyContent:'space-around',
    alignItems:'center',
  },
  dateText:{
    fontSize:20,
    fontWeight:'bold',
    color:'red'
  },
  container:{
    // flex:1,
    width:"100%",
    // backgroundColor:'#F5F2CE',
    backgroundColor:'#ECE439',
    flexGrow:1
  },
  inputContainer:{
    width:"90%",
    marginVertical:"2%",
    padding:"1.5%",
    flexDirection:'row',
    justifyContent:'space-around',
    alignItems:'center',
    borderWidth:1,
    borderColor:'black',
    borderRadius:8,
    backgroundColor:'white',
  },
  input:{
    fontSize:17,
    fontWeight:'bold',
    borderColor:'white'
  },
  btnContainer:{
    // backgroundColor:'#5171F9',
    // backgroundColor:'#F8AE3D',
    // backgroundColor:'#F3C43B',
    backgroundColor:'#ECE439',

    width:"50%",
    marginVertical:"2%",
    padding:"3%",
    alignSelf:'center',
    borderRadius:10
  },
  heading:{
    width:"100%",
    alignItems:'center',
    textAlign:'center',
    color:'#FFFF',
    fontSize:18,
    fontWeight:'bold'
    },
  headingText:{
    fontSize:25,
    // fontWeight:'bold',
    // color:'#FAFAFA',
    color:'black',
    fontFamily:'Poppins-SemiBoldItalic'
    },
    subHeading:{
      width:"100%",
      alignItems:'flex-start',
    }
})