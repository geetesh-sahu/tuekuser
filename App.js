import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import StackNavigation from './src/navigation/StackNavigation';
import { Provider } from 'react-redux';
import { store } from './src/redux/store/store';
import NetInfo from "@react-native-community/netinfo";
import Geolocation from 'react-native-geolocation-service';

const App = () => {
  NetInfo.fetch().then(state => {
    console.log("Connection type", state.type);
    console.log("Is connected?", state.isConnected);
  });
  Geolocation.requestAuthorization("always")
  return(
  <Provider store = {store}>
  <StackNavigation />
  </Provider>
  )
};

export default App;

const styles = StyleSheet.create({});


