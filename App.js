import {Alert, SafeAreaView} from 'react-native';
import React, {useEffect} from 'react';
import StackNavigation from './src/navigation/StackNavigation';
import {Provider} from 'react-redux';
import {store} from './src/redux/store/store';
import Geolocation from 'react-native-geolocation-service';
import FlashMessage from 'react-native-flash-message';
import {OrderContextProvider, UserProvider} from './src/utils/context';
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



// import React, {useState} from 'react';
// import {StyleSheet, View, Text, Button, Platform} from 'react-native';

// import DateTimePicker from '@react-native-community/datetimepicker';

// const App = () => {
//   const [isPickerShow, setIsPickerShow] = useState(false);
//   const [date, setDate] = useState(new Date(Date.now()));

//   const showPicker = () => {
//     setIsPickerShow(true);
//   };

//   const onChange = (event, value) => {
//     setDate(value);
//     if (Platform.OS === 'android') {
//       setIsPickerShow(false);
//     }
//   };

//   return (
//     <View style={styles.container}>
//       {/* Display the selected date */}
//       <View style={styles.pickedDateContainer}>
//         <Text style={styles.pickedDate}>{date.toUTCString()}</Text>
//       </View>

//       {/* The button that used to trigger the date picker */}
//       {!isPickerShow && (
//         <View style={styles.btnContainer}>
//           <Button title="Show Picker" color="purple" onPress={showPicker} />
//         </View>
//       )}

//       {/* The date picker */}
//       {isPickerShow && (
//         <DateTimePicker
//           value={date}
//           mode={'date'}
//           display={Platform.OS === 'ios' ? 'calendar' : 'default'}
//           is24Hour={true}
//           onChange={onChange}
//           style={styles.datePicker}
//         />
//       )}
//     </View>
//   );
// };

// // Kindacode.com
// // just add some styles to make our app look more beautiful
// // This is not the focus of this article
// const styles = StyleSheet.create({
//   container: {
//     display: 'flex',

//     alignItems: 'center',
//     flex: 1,
//     justifyContent: 'center',
//     padding: 50,
//   },
//   pickedDateContainer: {
//     padding: 20,
//     backgroundColor: '#eee',
//     borderRadius: 10,
//   },
//   pickedDate: {
//     fontSize: 18,
//     color: 'black',
//   },
//   btnContainer: {
//     padding: 30,
//   },
//   // This only works on iOS
//   datePicker: {
//     width: 320,
//     height: 260,
//     display: 'flex',
//     justifyContent: 'center',
//     alignItems: 'flex-start',
//     backgroundColor:'red'
//   },
// });

// export default App;
