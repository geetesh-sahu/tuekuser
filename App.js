import React, {useEffect} from 'react';
import StackNavigation from './src/navigation/StackNavigation';
import {Provider} from 'react-redux';
import {store} from './src/redux/store/store';
import Geolocation from 'react-native-geolocation-service';
import FlashMessage from 'react-native-flash-message';
import {
  OrderContextProvider,
  UserProvider,
} from './src/utils/context';
import EncryptedStorage from 'react-native-encrypted-storage';
import messaging from '@react-native-firebase/messaging';

const App = () => {
  useEffect(() => {
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
            const fcm = await EncryptedStorage.setItem(
              'fcm_id',
              JSON.stringify({
                fcm_id: res,
              }),
            );
          } catch (error) {
            console.log('error', error);
          }
        })
        .catch(error => {
          console.log('err', error);
        });
    }
  }

  useEffect(() => {
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage));
    });

    return unsubscribe;
  }, []);

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
