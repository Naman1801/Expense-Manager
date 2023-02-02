import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Lottie from 'lottie-react-native';

const AppLoader = () => {
  return (
    <View style={[StyleSheet.absoluteFillObject,styles.container]}>
     <Lottie source={require('../assets/loader.json')} autoPlay loop />
    </View>
  )
}

export default AppLoader

const styles = StyleSheet.create({
    container:{
        justifyContent:'center',
        alignItems:'center',
        // backgroundColor:"#FFFF",
        zIndex:1
    }

})