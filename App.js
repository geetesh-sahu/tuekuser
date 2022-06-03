import {
  StyleSheet,
  Text,
  View,
  PermissionsAndroid,
  Platform,
} from 'react-native';
import React, {useEffect} from 'react';
import StackNavigation from './src/navigation/StackNavigation';
import {Provider} from 'react-redux';
import {store} from './src/redux/store/store';
import NetInfo from '@react-native-community/netinfo';
import Geolocation from 'react-native-geolocation-service';
import FlashMessage from 'react-native-flash-message';
import {OrderContext, OrderContextProvider} from './src/utils/context';

const App = () => {
  NetInfo.fetch().then(state => {
    console.log('Connection type', state.type);
    console.log('Is connected?', state.isConnected);
  });
  Geolocation.requestAuthorization('always');

  const locationPermission = () =>
    new Promise(async (resolve, reject) => {
      if (Platform.ios === 'ios') {
        try {
          const permissionStatus = await Geolocation.requestAuthorization(
            'whenInUse',
          );
          if (permissionStatus === 'granted') {
            return resolve('granted');
          }
          reject('permission not granted');
        } catch (error) {
          return reject(error);
        }
      }
      return PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      )
        .then(granted => {
          if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            resolve('granted');
          }
          return reject('Location Permission denied');
        })
        .catch(error => {
          console.log('Ask Location permission error: ', error);
          return reject(error);
        });
    });

  useEffect(() => {
    locationPermission();
  }, []);

  return (
    <Provider store={store}>
      <OrderContextProvider>
        <StackNavigation />
        <FlashMessage position="top" />
      </OrderContextProvider>
    </Provider>
  );
};
export default App;





// import { StyleSheet, Text, View,Button } from 'react-native'
// import React,{useState} from 'react'
// import DateTimePicker, {
//   DateTimePickerAndroid,
// } from '@react-native-community/datetimepicker';

// const App = () => {
//   const [date, setDate] = useState(new Date(1598051730000));

//   const onChange = (event, selectedDate) => {
//     const currentDate = selectedDate;
//     setDate(currentDate);
//   };

//   const showMode = (currentMode) => {
//     DateTimePickerAndroid.open({
//       value: date,
//       onChange,
//       mode: currentMode,
//       is24Hour: true
//     })
//   };

//   const showDatepicker = () => {
//     showMode('date');
//   };

//   const showTimepicker = () => {
//     showMode('time');
//   };

//   return (
//     <View>
//     <View>
//       <Button onPress={showDatepicker} title="Show date picker!" />
//     </View>
//     <View>
//       <Button onPress={showTimepicker} title="Show time picker!" />
//     </View>
//     <Text>selected: {date.toLocaleString()}</Text>
//   </View>
//   )
// }

// export default App

// const styles = StyleSheet.create({})