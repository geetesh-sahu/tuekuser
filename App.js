// import {Alert, SafeAreaView} from 'react-native';
// import React, {useEffect} from 'react';
// import StackNavigation from './src/navigation/StackNavigation';
// import {Provider} from 'react-redux';
// import {store} from './src/redux/store/store';
// import Geolocation from 'react-native-geolocation-service';
// import FlashMessage from 'react-native-flash-message';
// import {OrderContextProvider, UserProvider} from './src/utils/context';
// import messaging from '@react-native-firebase/messaging';

// const App = () => {
//   Geolocation.requestAuthorization('always');

//   useEffect(() => {
//     const unsubscribe = messaging().onMessage(async remoteMessage => {
//       Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage));
//     });

//     return unsubscribe;
//   }, []);

//   return (
//     <SafeAreaView style={{flex: 1}}>
//       <Provider store={store}>
//         <UserProvider>
//           <OrderContextProvider>
//             <StackNavigation />
//             <FlashMessage position="top" />
//           </OrderContextProvider>
//         </UserProvider>
//       </Provider>
//     </SafeAreaView>
//   );
// };
// export default App;


import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const App = () => {
  return (
    <View>
      <Text>App</Text>
    </View>
  )
}

export default App

const styles = StyleSheet.create({})