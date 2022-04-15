import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import SplashScreen from '../screens/splashScreen/index';
import WelcomeScreen from '../screens/welcomeScreen';
import LoginScreen from '../screens/loginScreen';
import LoginWithPassword from '../screens/loginScreen/LoginWithPassword';
import OtpScreen from '../screens/otpScreen/index';
import VehicleScreen from '../screens/vehicleScreen';
import VehiclePicture from '../screens/vehiclePicture';
import ProfileScreen from '../screens/profileScreen';
import LicenseScreen from '../screens/licenseScreen';
import MapScreen from '../screens/mapScreen/index'
import OrderScreen from '../screens/mapScreen/orderScreen';

const Stack = createNativeStackNavigator();

const StackNavigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="SplashScreen" component={SplashScreen} />
        <Stack.Screen name="WelcomeScreen" component={WelcomeScreen} />
        <Stack.Screen name="LoginScreen" component={LoginScreen} />
        <Stack.Screen name="LoginWithPassword" component={LoginWithPassword} />
        <Stack.Screen name="OtpScreen" component={OtpScreen} />
        <Stack.Screen name="VehicleScreen" component={VehicleScreen} />
        <Stack.Screen name="VehiclePicture" component={VehiclePicture} />
        <Stack.Screen name="ProfileScreen" component={ProfileScreen} />
        <Stack.Screen name="LicenseScreen" component={LicenseScreen} />
        <Stack.Screen name="MapScreen" component={MapScreen} />
        <Stack.Screen name="OrderScreen" component={OrderScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default StackNavigation;

const styles = StyleSheet.create({});
