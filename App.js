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
import {OrderContext, OrderContextProvider, UserProvider} from './src/utils/context';
import EncryptedStorage from 'react-native-encrypted-storage';
import messaging from '@react-native-firebase/messaging';

const App = () => {
  useEffect(() => {
    locationPermission();
    requestUserPermission();
  }, []);
  Geolocation.requestAuthorization('always');
  async function requestUserPermission() {
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;
    if (enabled) {
      messaging()
        .getToken()
        .then(async res => {
          try {
            console.log('res', res);
            const fcm =  await EncryptedStorage.setItem(
              'fcm_id',
              JSON.stringify({
                fcm_id: res,
              }),
            );
          console.log('fcm',fcm)
          } catch (error) {
            console.log('error', error);
          }
        })
        .catch(error => {
          console.log('err', error);
        });
      console.log('Authorization status:', authStatus);
    }
  }

  useEffect(() => {
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage));
    });

    return unsubscribe;
  }, []);

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
  return (
    <Provider store={store}>
      <UserProvider>
      <OrderContextProvider>
        <StackNavigation />
        <FlashMessage position="top" />
      </OrderContextProvider>
      </UserProvider>
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