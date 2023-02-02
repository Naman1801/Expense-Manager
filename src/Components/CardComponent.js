import { StyleSheet, Text, View,ScrollView,Image } from 'react-native'
import React from 'react'
import {images} from '../assets/imageURL'


export default function CardComponent({title,URL}) {
  return (
    <View style={[styles.innerContainer,styles.boxWithShadow]} >
        <View style={{width:"80%",alignSelf:'center',}}>
        <Text style={{fontSize:23,color:'black',}}>{title}</Text>
          </View>
          <View >
     <Image source={URL} style={styles.imgStyle}  />
     </View>
        </View>
  )
}

const styles = StyleSheet.create({
  imgStyle:{
    width:160,
    height:150,
    right:"30%",
    bottom:"1.8%" 
  },
    scrollView: {
        flex:1,
        width: '100%',
        // margin: "2%",
        alignSelf: 'center',
        padding: "3%",
      },
      contentContainer: {
        // justifyContent: 'center',
        // alignItems: 'center',
        // backgroundColor: 'blue',
        paddingBottom: 50,
      },
      innerContainer:{
        width:"95%",
        backgroundColor:'white',
        marginVertical:'2.5%',
        borderRadius:10,
        flexDirection:'row',
        padding:"5%",
        // marginHorizontal:"5%",
      },
      boxWithShadow: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.8,
        shadowRadius: 2,  
        elevation: 5
    },
})