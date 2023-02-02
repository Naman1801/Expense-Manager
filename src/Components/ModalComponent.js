import { StyleSheet, Text, View,Modal,TouchableOpacity,TextInput,Image,Keyboard,KeyboardAvoidingView,Platform} from 'react-native'
import React,{useEffect,useState} from 'react'
import {images} from '../assets/imageURL'
import DatePicker from 'react-native-date-picker'
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-toast-message';
import AppLoader from './AppLoader';



export default function ModalComponent(props,{Loader}) {
  const [modalVisible, setModalVisible] = useState(false);
  const [open, setOpen] = useState(false)
  const [date, setDate] = useState(new Date())
  const [month,setMonth] = useState(null)
  const [year,setYear] = useState(null)
  const[desc,setDesc ] = useState(null)
  const[amount,setAmount ] = useState(null)
  const [text,setText] = useState(null)
  const [itemId,setItemId] = useState(props.itemId)
  // const [loading,setLoading] = useState(false)



  useEffect(()=>{
   
    setDesc(null) 
    setAmount(null)
    setText(null)
   
    updateState()

   },[modalVisible])

  //  console.log("props",desc);
  //  console.log("props1",amount);
  //  console.log("props2",text);
  // console.log("props",props);


  const updateState = ()=>{

    setTimeout(() => {
      setModalVisible(props.visibility)  
      setDesc(props.Description) 
      setAmount(props.Amount)
      setText(props.Date) 
      setItemId(props.itemId)

    }, 500);
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
        // setDateVisible(false)
        // setSelectedDate(null)
        // setShow(false)
      }


  const handleSubmit = ()=>{
        setModalVisible(false)
        props.stateChange(false)
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

          Toast.show({
            type: 'success',
            text1: 'Record created successfully',
            position:'bottom',
            visibilityTime:2000
          });

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
            Toast.show({
              type: 'success',
              text1: 'Record updated successfully',
              position:'bottom'
            });
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
   

    <Modal
    animationType="slide"
    transparent={true}
    visible={props.visibility}
  >
{/* behavior={Platform.OS === "ios" ? "padding" : "height" } */}
    <TouchableOpacity onPress={()=>{
      props.stateChange(false)
      setDesc(null) 
      setAmount(null)
      setText(null)
    }} style={styles.modalContainer}>
       {/* {
        loading && <AppLoader/>
      } */}
      <View style={styles.innerModal}>

      <View style={{width:"60%",height:"8%"}}>
  <Text style={styles.heading}>Write your expnse here!</Text>
  </View>

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


  <View  style={styles.inputContainer}>
    <View   style={{width:"90%",alignItems:'flex-start'}}>
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

    </Modal>

  )
}

const styles = StyleSheet.create({
    btnContainer:{
        backgroundColor:'#ECE439',
        width:"50%",
        marginVertical:"2%",
        padding:"3%",
        alignSelf:'center',
        borderRadius:10
      },
    dateText:{
        fontSize:20,
        fontWeight:'bold',
        color:'red'
      },
    thirdView:{
        width:"80%",
        marginVertical:"2%",
        padding:"1%",
        flexDirection:'row',
        justifyContent:'space-around',
        alignItems:'center',
      },
    modalContainer:{
        flex:1,
        justifyContent: "center",
        alignItems: "center",
      },
      innerModal:{
        width:"90%",
        height:"60%",
        backgroundColor:'#BD9083',
        justifyContent: "center",
        alignItems: "center",
        borderRadius:8,
       
      },
      heading:{
        width:"100%",
        alignItems:'center',
        textAlign:'center',
        color:'#FFFF',
        fontSize:20,
        fontWeight:'bold',
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
            borderColor:'white',
          },
})