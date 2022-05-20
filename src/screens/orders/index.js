import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Ongoing from './ongoing';
import Completed from './completed';
import Cancelled from './cancelled';

const Tab = createMaterialTopTabNavigator();


const Orders = () => {
  return(
    <Tab.Navigator screenOptions={{tabBarPressColor:{color:'red'}}} >
      <Tab.Screen name="Ongoing" component={Ongoing}  options={{tabBarPressColor:{color:'red'}}}  />
      <Tab.Screen name="Completed" component={Completed} />
      <Tab.Screen name="Cancelled" component={Cancelled} />
    </Tab.Navigator>
  )
}

export default Orders

const styles = StyleSheet.create({})