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


<<<<<<< HEAD
// import React, {useState, useRef} from 'react';
// import {
//   SafeAreaView,
//   StyleSheet,
//   View,
//   StatusBar,
//   TouchableOpacity,
//   Text,
// } from 'react-native';
// import PhoneInput from 'react-native-phone-number-input';
// import {Colors} from 'react-native/Libraries/NewAppScreen';

// const App = () => {
//   const [value, setValue] = useState('');
//   const [countryCode, setCountryCode] = useState('');
//   const [formattedValue, setFormattedValue] = useState('');
//   const [valid, setValid] = useState(false);
//   const [disabled, setDisabled] = useState(false);
//   const [showMessage, setShowMessage] = useState(false);
//    const phoneInput = useRef<PhoneInput>(null);
//   return (
//     <>
//       <StatusBar barStyle="dark-content" />
//       <View style={styles.container}>
//         <SafeAreaView style={styles.wrapper}>
//           {/* {showMessage && (
//             <View style={styles.message}>
//               <Text>Country Code : {countryCode}</Text>
//               <Text>Value : {value}</Text>
//               <Text>Formatted Value : {formattedValue}</Text>
//               <Text>Valid : {valid ? 'true' : 'false'}</Text>
//             </View>
//           )} */}
//           <PhoneInput
//             // ref={phoneInput}
//             defaultValue={value}
//             defaultCode="IN"
//             layout="first"
//             onChangeText={(text) => {
//               setValue(text);
//             }}
//             onChangeFormattedText={(text) => {
//               setFormattedValue(text);
//               setCountryCode(phoneInput.current?.getCountryCode() || '');
//             }}
//             countryPickerProps={{withAlphaFilter:true}}
//             disabled={disabled}
//             withDarkTheme
//             withShadow
//             autoFocus
//           />
//           <TouchableOpacity
//             style={styles.button}
//             onPress={() => {
//               const checkValid = phoneInput.current?.isValidNumber(value);
//               setShowMessage(true);
//               setValid(checkValid ? checkValid : false);
//               setCountryCode(phoneInput.current?.getCountryCode() || '');
//               let getNumberAfterPossiblyEliminatingZero = phoneInput.current?.getNumberAfterPossiblyEliminatingZero();
//               console.log(getNumberAfterPossiblyEliminatingZero);
//             }}>
//             <Text style={styles.buttonText}>Check</Text>
//           </TouchableOpacity>
//           <TouchableOpacity
//             style={[styles.button, disabled ? {} : styles.redColor]}
//             onPress={() => {
//               setDisabled(!disabled);
//             }}>
//             <Text style={styles.buttonText}>{disabled ? 'Activate' : 'Disable'}</Text>
//           </TouchableOpacity>
//         </SafeAreaView>
//       </View>
//     </>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: Colors.lighter,
//   },
//   wrapper: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   button: {
//     marginTop: 20,
//     height: 50,
//     width: 300,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: '#7CDB8A',
//     shadowColor: 'rgba(0,0,0,0.4)',
//     shadowOffset: {
//       width: 1,
//       height: 5,
//     },
//     shadowOpacity: 0.34,
//     shadowRadius: 6.27,
//     elevation: 10,
//   },
//   buttonText:{
//     color: 'white',
//     fontSize: 14,
//   },
//   redColor: {
//     backgroundColor: '#F57777'
//   },
//   message: {
//     borderWidth: 1,
//     borderRadius: 5,
//     padding: 20,
//     marginBottom: 20,
//     justifyContent: 'center',
//     alignItems: 'flex-start',
//   },
// });

// export default App;
=======

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
>>>>>>> 4227b73f8ecda9d49ca747cfe36603dd4b95d979
