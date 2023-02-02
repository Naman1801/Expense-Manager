import { StyleSheet, Text, View,Image,LogBox} from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './src/Screens/HomeScreen'
import ActivityScreen from './src/Screens/ActivityScreen'
import {images} from './src/assets/imageURL'
import RecordScreen from './src/Screens/RecordScreen';
import TransationScreen from './src/TransationScreen';
import AppLoader from './src/Components/AppLoader';


export default function App() {
  const Tab = createBottomTabNavigator();
  const Stack = createNativeStackNavigator();

  function MyTab() {
    return (
      <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name === 'Home') {
            // iconName = focused
            //   ? images.Home
            //   : images.Home;
            return <Image source={images.Home} style={{ width: 25 ,height:25 }} tintColor="#214E40" />;
          } else if (route.name === 'Activity') {
            // iconName = focused ? images.Activity : Activity;
            return <Image source={images.Activity} style={{ width: 25 ,height:25 }} tintColor="#214E40" />;
          } 
          else if (route.name === 'Transation') {
            // iconName = focused ? images.Activity : Activity;
            return (<View>
              <Image source={images.Transation} style={{ width: 25 ,height:25 }} tintColor="#214E40" />
            </View>
            )
          } 

          // You can return any component that you like here!
          // return <Image source={iconName} style={{ width: 25 ,height:25 }} />;
        },
        // tabBarActiveTintColor: '#FFFFF',
        // tabBarInactiveTintColor: '#FFFFF',
        tabBarActiveBackgroundColor:'#FFFF',
        tabBarInactiveBackgroundColor:"#FFFF",
        headerShown: false,
        
        
      })}
      >
      <Tab.Screen name="Home" component={HomeScreen}  />
      <Tab.Screen name="Activity" component={ActivityScreen} />
      <Tab.Screen name="Transation" component={TransationScreen} />
    </Tab.Navigator>
    );
  }
  return (
    <NavigationContainer>
          <Stack.Navigator  >
        <Stack.Screen
          name="MyTab"
          component={MyTab}
          options={{ headerShown: false }}
        />
        <Stack.Screen name="Record" component={RecordScreen}  options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

const styles = StyleSheet.create({})
// options={{tabBarIcon: ({ focused }) => {
//   return (
//     <View>
//       <Image
//         source={require("./src/assets/home.png")}
//         resizeMode="contain"
//         style={{ width: 25 }}
//       />
//     </View>
//   );
// },}}