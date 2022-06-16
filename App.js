import {Alert, SafeAreaView} from 'react-native';
import React, {useEffect} from 'react';
import StackNavigation from './src/navigation/StackNavigation';
import {Provider} from 'react-redux';
import {store} from './src/redux/store/store';
import NetInfo from '@react-native-community/netinfo';
import Geolocation from 'react-native-geolocation-service';
import FlashMessage from 'react-native-flash-message';
import {OrderContextProvider, UserProvider} from './src/utils/context';
import EncryptedStorage from 'react-native-encrypted-storage';
import messaging from '@react-native-firebase/messaging';

const App = () => {
  Geolocation.requestAuthorization('always');

  useEffect(() => {
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage));
    });

    return unsubscribe;
  }, []);

  return (
    <SafeAreaView style={{flex: 1}}>
      <Provider store={store}>
        <UserProvider>
          <OrderContextProvider>
            <StackNavigation />
            <FlashMessage position="top" />
          </OrderContextProvider>
        </UserProvider>
      </Provider>
    </SafeAreaView>
  );
};
export default App;
