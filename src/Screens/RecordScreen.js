import { StyleSheet, Text, View,TouchableOpacity,Image,ScrollView,LogBox} from 'react-native'
import React,{useState,useEffect} from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import {images} from '../assets/imageURL'

export default function RecordScreen(props) {
  
  const [expense,setExpense] = useState([])
  const [itemId,setItemId] = useState(null)
  const[desc,setDesc ] = useState('')
  const[amount,setAmount ] = useState("")
  const [text,setText] = useState(null)
  const [total,setTotal] = useState(null)
  const [average,setAverage] = useState(null)
  const [max,setMax] = useState(null)
  const [min,setMin] = useState(null)

  let monthCount = props.route.params.month;
  let yearCount = props.route.params.year;
  
  useEffect(()=>{
    getData()
  },[expense])

  const handleCalculations =  (name)=>{
    let temp=0;
    let tempMax = Math.max(...expense.map(o => parseInt(o.Amount)));
    let tempMin = Math.min(...expense.map(o => parseInt(o.Amount)));
    let count = expense.length
        expense.map((item)=>{
         temp += parseInt(item.Amount)
        })
        
      switch (name) {
        case 'total': setTotal(temp)
                       break;
        case 'average': {
                        let avg = (temp/count).toFixed(3)
                        console.log("avgggg",avg);
                        ( avg !== NaN ) && setAverage(avg)
                      setAverage(avg)
                        }
                        break;

        case 'max': {

                   ( tempMax != -Infinity) && setMax(tempMax)
                     }
                    break;
        case 'min': {
                    ( tempMin != Infinity) && setMin(tempMin)
        
                    }
                    break;
               
      
                    default:
                      break;
      }
      // if(name === 'average'){
      //   let avg = temp/count
      //   setAverage(avg)
      // }
      // if(name === 'total'){
      //   setTotal(temp)

      // }
        
  }

    const getData = async () => {
        try {
          const value = JSON.parse( await AsyncStorage.getItem('@expens_Key'))
          if(value !== null) {
            let temp = value.filter((item)=>{
              if(item.Month === monthCount && item.Year === yearCount){
                return item
              }
            })
            setExpense(temp)
          }
          else{
            console.log("No item found");
          }
        } catch(e) {
          console.log("Getting error",e);
        }
        // getData()
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
          getData()
            
            
          }
        } catch(e) {
          console.log("Removing error",e);
    
        }
      }


  return (
    <View style={styles.container}>
       
        <View style={styles.create}>
        <TouchableOpacity style={styles.bottomRow} onPress={()=>handleCalculations("total")}>
          {
            total ?  <Text style={styles.bottomText}>{total}</Text> : <Text style={styles.bottomText}>Total</Text>
          }
       
        </TouchableOpacity>

        <TouchableOpacity style={styles.bottomRow} onPress={()=>handleCalculations("max")}>
          {
            max ?  <Text style={styles.bottomText}>{max}</Text> : <Text style={styles.bottomText}>Max</Text>
          }
       
        </TouchableOpacity>

        <TouchableOpacity style={styles.bottomRow} onPress={()=>handleCalculations("min")}>
          {
            min ?  <Text style={styles.bottomText}>{min}</Text> : <Text style={styles.bottomText}>Min</Text>
          }
       
        </TouchableOpacity>

        <TouchableOpacity style={styles.bottomRow} onPress={()=>{
          handleCalculations("average")
        }} >
        {
            average ?  <Text style={styles.bottomText}>{average}</Text> : <Text style={styles.bottomText}>Avg</Text>
          }
        </TouchableOpacity>
        </View>
        
        <View style={styles.subHeading}>
          {
            expense.length !=0 ? <Text style={styles.headingText}>Transations of Month</Text>: <Text style={styles.headingText}>No records found</Text>
          }
      
      </View>
     
        <View style={{height:"86%",marginVertical:"3%"}}>
        
          
          <ScrollView >
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
                
                <TouchableOpacity style={{width:"8%"}}   >
        
              <Image source={images.Edit} style={{ width: 22 ,height:22 }} tintColor="#F59E4E" />
              </TouchableOpacity >
                <TouchableOpacity style={{width:"8%"}} onPress={()=>{removeData(item.id)}} >
              <Image source={images.Delete} style={{ width: 22 ,height:22 }} tintColor="#F59E4E" />
              </TouchableOpacity>
              </View>
            })
          }
          </ScrollView>
        
       
          </View>
      


    </View>
  )
}

const styles = StyleSheet.create({
  bottomText:{
    fontSize:16,
    fontWeight:'800'
  },
  boxWithShadow: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.8,
    shadowRadius: 2,  
    elevation: 5
},
  subHeading:{
    width:"100%",
    alignItems:'flex-start',
  },
    innerBox:{
        alignItems:'center'
      },
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
        shadowColor: "#FFF",
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
      },
      create:{
        position: 'absolute',
        bottom:"1%",
        flexDirection:'row',
        width:"80%",
        padding:"2%",
        elevation:15,
        alignSelf:'center',
        
      },
      bottomRow:{
        backgroundColor:'#5171F9',
        width:"25%",
        padding:"4%",
        borderRadius:10,
        alignItems:'center',
        marginHorizontal:"1%"
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
          fontSize:20,
          fontWeight:'bold',
          color:'#FAFAFA'
          },
})