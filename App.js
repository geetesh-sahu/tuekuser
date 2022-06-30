import React, {useEffect} from 'react';
import {Alert, SafeAreaView} from 'react-native';
import StackNavigation from './src/navigation/StackNavigation';
import {Provider} from 'react-redux';
import {store} from './src/redux/store/store';
import Geolocation from 'react-native-geolocation-service';
import FlashMessage from 'react-native-flash-message';
import {OrderContextProvider, UserProvider} from './src/utils/context';
import messaging from '@react-native-firebase/messaging';
import * as RootNavigation from './src/navigation/RootNavigation'

const App = () => {
  Geolocation.requestAuthorization('always');

  useEffect(() => {
    requestUserPermission()
    const unsubscribe = messaging().onMessage(async remoteMessage => {
    console.log('remoteMessage: ',JSON.parse( remoteMessage.data.Order).OrderId);
     RootNavigation.navigate('Map')
      Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage));
    });

    return unsubscribe;
  }, []);

  async function requestUserPermission() {
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;
  
    if (enabled) {
      messaging().getToken().then((res)=>
      console.log('res: ', res)
      
      )
      console.log('Authorization status:', authStatus);
    }
  }

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

