import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Lottie from 'lottie-react-native';
const CardLoader = () => {
  return (
    <View style={[StyleSheet.absoluteFillObject,styles.container]}>
    <Lottie source={require('../assets/card.json')} autoPlay loop />
   </View>
  )
}

export default CardLoader

const styles = StyleSheet.create({
    container:{
        justifyContent:'center',
        alignItems:'center',
        zIndex:1,
        backgroundColor:'rgba(0,0,0,0.3)'
    }
})